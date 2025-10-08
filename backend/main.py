from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
import os
import io
import base64
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import re
from wordcloud import WordCloud
from matplotlib import font_manager as fm
from sqlalchemy import text
from typing import Optional
import json

app = FastAPI(title="Analysis API")
# 挂载 BI 路由（快捷分析重构）
try:
    from backend.bi_router import router as bi_router
    app.include_router(bi_router)
except Exception as e:
    print(f"Warn: BI router not loaded: {e}")

def describe_df(df: pd.DataFrame) -> dict:
    # 为了最大兼容性，统一不传 datetime_is_numeric 参数
    d = df.describe(include='all')
    return d.fillna("").to_dict()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"]
    ,
    allow_headers=["*"]
)


def read_df(uploaded: UploadFile) -> pd.DataFrame:
    """Robustly read CSV/XLSX to DataFrame, with encoding fallbacks for CSV."""
    content = uploaded.file.read()
    uploaded.file.seek(0)
    name = (uploaded.filename or "").lower()
    if name.endswith(".csv"):
        last_err = None
        for enc in ("utf-8", "utf-8-sig", "gbk", "gb2312", "latin1"):
            try:
                return pd.read_csv(io.BytesIO(content), encoding=enc)
            except Exception as e:  # try next encoding
                last_err = e
                continue
        raise RuntimeError(f"CSV 读取失败: {last_err}")
    elif name.endswith(".xlsx"):
        return pd.read_excel(io.BytesIO(content))
    else:
        raise RuntimeError("仅支持 .csv 或 .xlsx 文件")


@app.post("/columns")
async def get_columns(file: UploadFile = File(...)):
    try:
        df = read_df(file)
        cols = list(map(str, df.columns.tolist()))
        numeric_cols = [c for c in cols if pd.api.types.is_numeric_dtype(df[c])]
        # 更宽松的文本列候选：非数值且非日期时间
        text_candidates = [
            c for c in cols
            if not pd.api.types.is_numeric_dtype(df[c])
            and not pd.api.types.is_datetime64_any_dtype(df[c])
        ]
        head = (
            df.head(20)
              .replace({np.nan: None})
              .to_dict(orient="records")
        )
        describe = describe_df(df)
        return {
            "columns": cols,
            "numericColumns": numeric_cols,
            "stringColumns": text_candidates,  # 兼容前端老字段名
            "textCandidates": text_candidates,
            "preview": head,
            "describe": describe
        }
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


def fig_to_base64_png(fig) -> str:
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    return "data:image/png;base64," + base64.b64encode(buf.read()).decode("utf-8")


def find_chinese_font() -> str | None:
    # 环境变量优先
    env_font = os.environ.get("CHINESE_FONT")
    if env_font and os.path.exists(env_font):
        return env_font
    candidates = [
        # Windows 常见字体
        r"C:\\Windows\\Fonts\\msyh.ttc",
        r"C:\\Windows\\Fonts\\msyh.ttf",
        r"C:\\Windows\\Fonts\\simhei.ttf",
        r"C:\\Windows\\Fonts\\simsun.ttc",
        # macOS
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Medium.ttc",
        # Linux
        "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc",
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.otf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None

# 全局设置 Matplotlib 中文字体，避免中文显示为方块或缺失
_FONT_PATH = find_chinese_font()
if _FONT_PATH:
    try:
        fm.fontManager.addfont(_FONT_PATH)
        _font_name = fm.FontProperties(fname=_FONT_PATH).get_name()
        plt.rcParams['font.family'] = _font_name
        plt.rcParams['font.sans-serif'] = [_font_name]
        plt.rcParams['axes.unicode_minus'] = False
    except Exception:
        # 安全兜底：即使字体注册失败也不影响接口可用
        pass


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    pivot_index: str = Form(None),
    pivot_columns: str = Form(None),
    pivot_values: str = Form(None),
    num_col: str = Form(None),
    text_col: str = Form(None),
    split_delim: str = Form(None),
    stopwords: str = Form(None),
    min_token_len: int | None = Form(None),
    top_n: int | None = Form(None),
    hist_col: str = Form(None),
    time_col: str = Form(None),
    # 二维图表新增参数
    x_col: str = Form(None),
    y_cols: str = Form(None),  # JSON 数组字符串或逗号分隔
    series_col: str = Form(None),
    chart_type: str = Form(None)  # line | bar | barh | pie
):
    try:
        df = read_df(file)

        result = {}

        # data preview
        result["preview"] = (
            df.head(50)
              .replace({np.nan: None})
              .to_dict(orient="records")
        )
        result["describe"] = describe_df(df)

        # 自动洞察：
        insights = {}
        # 缺失值统计
        miss = df.isna().sum().to_dict()
        insights["missing"] = miss
        # 数值列基本统计（max/min/mean/median/std）
        numeric_cols = [c for c in df.columns if pd.api.types.is_numeric_dtype(df[c])]
        num_stats = {}
        for c in numeric_cols:
            s = df[c]
            num_stats[str(c)] = {
                "count": int(s.count()),
                "min": None if pd.isna(s.min()) else float(s.min()),
                "max": None if pd.isna(s.max()) else float(s.max()),
                "mean": None if pd.isna(s.mean()) else float(s.mean()),
                "median": None if pd.isna(s.median()) else float(s.median()),
                "std": None if pd.isna(s.std()) else float(s.std()),
            }
        insights["numericStats"] = num_stats
        # 分类列占比 Top10
        cat_cols = [c for c in df.columns if pd.api.types.is_string_dtype(df[c]) or df[c].dtype == 'object']
        cats = {}
        for c in cat_cols:
            vc = df[c].astype(str).value_counts(normalize=True).head(10)
            cats[str(c)] = [[str(k), float(v)] for k, v in vc.items()]
        insights["categoryRatios"] = cats
        result["insights"] = insights

        # pivot table
        if pivot_index and pivot_columns and pivot_values and pivot_index in df.columns and pivot_columns in df.columns and pivot_values in df.columns:
            try:
                pivot = pd.pivot_table(df, index=pivot_index, columns=pivot_columns, values=pivot_values, aggfunc='mean')
                result["pivot"] = {
                    "index": list(map(str, pivot.index.tolist())),
                    "columns": list(map(str, pivot.columns.tolist())),
                    "data": pivot.fillna("").astype(str).values.tolist()
                }
            except Exception as e:
                result["pivotError"] = str(e)

        # boxplot
        if num_col and num_col in df.columns and pd.api.types.is_numeric_dtype(df[num_col]):
            fig, ax = plt.subplots(figsize=(6, 4))
            sns.boxplot(x=df[num_col], ax=ax)
            ax.set_title(f"箱线图 - {num_col}")
            result["boxplotPng"] = fig_to_base64_png(fig)

        # 分布直方图（第一个数值列）
        if numeric_cols:
            first_num = hist_col if (hist_col in df.columns) else numeric_cols[0]
            fig3, ax3 = plt.subplots(figsize=(6,4))
            sns.histplot(df[first_num].dropna(), bins=30, ax=ax3)
            ax3.set_title(f"分布直方图 - {first_num}")
            result["histPng"] = fig_to_base64_png(fig3)

        # 简单时间序列折线图（寻找第一个 datetime 列）
        datetime_cols = [c for c in df.columns if pd.api.types.is_datetime64_any_dtype(df[c])]
        if (time_col in df.columns and pd.api.types.is_datetime64_any_dtype(df[time_col])) or datetime_cols:
            use_time = time_col if (time_col in df.columns) else datetime_cols[0]
            use_num = num_col if (num_col in df.columns and pd.api.types.is_numeric_dtype(df[num_col])) else (numeric_cols[0] if numeric_cols else None)
            ts_cols = [c for c in [use_time, use_num] if c is not None]
            ts = df[ts_cols].dropna()
            if not ts.empty:
                ts = ts.sort_values(by=use_time)
                fig4, ax4 = plt.subplots(figsize=(7,4))
                ax4.plot(ts[use_time], ts[use_num], marker='o', linewidth=1)
                ax4.set_title(f"折线图 - {use_time} vs {use_num}")
                result["linePng"] = fig_to_base64_png(fig4)

        # 生成二维图（line/bar/barh/pie）
        try:
            if chart_type in ("line", "bar", "barh") and x_col and y_cols:
                # 解析 y_cols
                import json
                try:
                    y_list = json.loads(y_cols)
                except Exception:
                    y_list = [c.strip() for c in str(y_cols).split(',') if c.strip()]
                y_list = [c for c in y_list if c in df.columns]
                if y_list:
                    plot_df = df[[x_col] + y_list + ([series_col] if series_col and series_col in df.columns else [])].copy()
                    # x 轴尽量解析为 datetime 或保持原样
                    if plot_df[x_col].dtype == 'object':
                        try:
                            plot_df[x_col] = pd.to_datetime(plot_df[x_col])
                        except Exception:
                            pass
                    # 如果没有传入 series_col，则将多个 y 列融为长表，variable 作为系列
                    if not series_col or series_col not in plot_df.columns:
                        long_df = plot_df.melt(id_vars=[x_col], value_vars=y_list, var_name='系列', value_name='值')
                        hue = '系列'
                    else:
                        # 使用单一 y（第一列），series 作为 hue
                        long_df = plot_df.rename(columns={y_list[0]: '值'})
                        long_df['系列'] = long_df[series_col].astype(str)
                        long_df = long_df[[x_col, '系列', '值']]
                        hue = '系列'
                    # 作图
                    fig5, ax5 = plt.subplots(figsize=(8, 5))
                    if chart_type == 'line':
                        sns.lineplot(data=long_df, x=x_col, y='值', hue=hue, marker='o', ax=ax5)
                    elif chart_type == 'bar':
                        sns.barplot(data=long_df, x=x_col, y='值', hue=hue, ax=ax5)
                    elif chart_type == 'barh':
                        sns.barplot(data=long_df, y=x_col, x='值', hue=hue, orient='h', ax=ax5)
                    ax5.set_title(f"{('折线图' if chart_type=='line' else '柱状图' if chart_type=='bar' else '条形图')} - X:{x_col}")
                    ax5.legend(title=hue)
                    result['chart2dPng'] = fig_to_base64_png(fig5)

            elif chart_type == 'pie' and x_col:
                # 饼图：分类列 + 可选数值列（汇总），缺省按计数
                values = None
                if y_cols:
                    try:
                        import json
                        y_list = json.loads(y_cols)
                    except Exception:
                        y_list = [c.strip() for c in str(y_cols).split(',') if c.strip()]
                    values = y_list[0] if y_list and y_list[0] in df.columns else None
                if values and pd.api.types.is_numeric_dtype(df[values]):
                    data = df.groupby(x_col)[values].sum().sort_values(ascending=False).head(12)
                else:
                    data = df[x_col].astype(str).value_counts().head(12)
                fig6, ax6 = plt.subplots(figsize=(7, 7))
                ax6.pie(data.values, labels=data.index, autopct='%1.1f%%', startangle=90, textprops={'fontsize': 9})
                ax6.axis('equal')
                ax6.set_title(f"饼图 - {x_col}")
                result['piePng'] = fig_to_base64_png(fig6)
        except Exception as e:
            result['chartError'] = str(e)

        # wordcloud
        if text_col and text_col in df.columns:
            # 尝试分隔常见分隔符，拆分后再合并生成词云
            series = df[text_col].astype(str).fillna("")
            tokens = []
            for s in series:
                # 使用前端自定义分隔符（正则）或默认规则
                pattern = split_delim if (split_delim and split_delim.strip()) else r"[,，;；\s\|]+"
                parts = [p.strip() for p in re.split(pattern, s) if p.strip()]
                tokens.extend(parts if parts else [s])
            # 过滤停用词与最小长度
            sw = set()
            if stopwords:
                for item in re.split(r"[,\n\r\t;\s]+", stopwords):
                    if item.strip():
                        sw.add(item.strip().lower())
            filtered_tokens = []
            for t in tokens:
                low = t.lower()
                if sw and low in sw:
                    continue
                if min_token_len and len(t) < int(min_token_len):
                    continue
                filtered_tokens.append(t)

            text_data = " ".join(filtered_tokens)
            if text_data.strip():
                font_path = find_chinese_font()
                wc = WordCloud(
                    width=900,
                    height=450,
                    background_color="white",
                    font_path=font_path
                ).generate(text_data)
                fig2, ax2 = plt.subplots(figsize=(8, 4))
                ax2.imshow(wc, interpolation='bilinear')
                ax2.axis('off')
                result["wordcloudPng"] = fig_to_base64_png(fig2)

            # 关键词计数（频率）
            if filtered_tokens:
                vc = pd.Series(filtered_tokens).value_counts()
                total = int(vc.sum()) if int(vc.sum()) != 0 else 1
                counts = []
                for k, v in vc.items():
                    counts.append({
                        "token": str(k),
                        "count": int(v),
                        "ratio": float(v) / float(total)
                    })
                # 仅返回前 N 项，避免过大
                limit = top_n if (top_n and int(top_n) > 0) else 200
                result["keywordCounts"] = counts[: int(limit)]

        return result
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


