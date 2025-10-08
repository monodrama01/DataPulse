# 交互式数据分析工具（后端 FastAPI + 前端 React）

## 后端

目录：`backend/`

1) 安装依赖
```bash
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -r backend/requirements.txt -i https://pypi.org/simple
```

2) 启动服务
```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

- 接口
  - POST `/columns`：上传文件，返回列信息/预览/describe
  - POST `/analyze`：上传文件 + 可选参数，返回预览、透视表、箱线图和词云的 base64 图片

## 前端

- 页面：`/tool` 使用 `components/AnalysisTool.tsx`
- 环境变量（可选）
```
NEXT_PUBLIC_ANALYSIS_API=http://127.0.0.1:8000
```

## 移除 Streamlit
- 删除 `streamlit/` 目录（已不再使用）
- 删除 `components/StreamlitEmbed.tsx`（已删除）


