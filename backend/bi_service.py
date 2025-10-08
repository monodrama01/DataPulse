"""
BI Service for Quick Analyze (Board/Explore) with task polling.

Endpoints (wired by router in bi_router.py):
- POST /upload -> {uid}
- POST /clean?uid=.. -> {taskId}
- GET  /status/{taskId} -> {status, result?}
- GET  /meta/{uid}?v=.. -> {columns:[{name,type,sample}]}
- GET  /board/{uid}?v=.. -> {kpis,charts}
- POST /explore/query -> {taskId}

Implementation notes:
- Store temporary dataframes in an in-memory registry keyed by uid/version
- Long tasks (>200ms) return taskId and complete in background thread
"""

from __future__ import annotations

import io
import threading
import time
import uuid
from typing import Dict, Any, List, Optional

import pandas as pd

# ---------------- In-memory stores (MVP) ----------------

_UID_TO_VERSIONS: Dict[str, Dict[str, pd.DataFrame]] = {}
_TASKS: Dict[str, Dict[str, Any]] = {}


def _new_task() -> str:
    task_id = str(uuid.uuid4())
    _TASKS[task_id] = {"status": "pending", "result": None, "error": None}
    return task_id


def get_task(task_id: str) -> Dict[str, Any]:
    return _TASKS.get(task_id, {"status": "not_found"})


def _put_result(task_id: str, result: Any = None, error: Optional[str] = None):
    if task_id in _TASKS:
        if error:
            _TASKS[task_id].update({"status": "error", "error": error})
        else:
            _TASKS[task_id].update({"status": "done", "result": result})


# ---------------- Utilities ----------------

def _infer_dtype(series: pd.Series) -> str:
    """Infer simplified dtype: number/date/category/text."""
    if pd.api.types.is_numeric_dtype(series):
        return "number"
    if pd.api.types.is_datetime64_any_dtype(series):
        return "date"
    # category if unique <= 50 (heuristic)
    try:
        nunique = series.nunique(dropna=True)
        if nunique <= 50:
            return "category"
    except Exception:
        pass
    return "text"


def _columns_meta(df: pd.DataFrame, sample_n: int = 5) -> List[Dict[str, Any]]:
    cols = []
    for col in df.columns:
        s = df[col]
        dtype = _infer_dtype(s.head(1000))
        sample = s.dropna().astype(str).head(sample_n).tolist()
        cols.append({"name": str(col), "type": dtype, "sample": sample})
    return cols


def _auto_kpis(df: pd.DataFrame) -> List[Dict[str, Any]]:
    kpis: List[Dict[str, Any]] = []
    for col in df.columns:
        if _infer_dtype(df[col]) == "number":
            val = float(df[col].sum(skipna=True))
            kpis.append({"name": str(col), "value": val, "aggregate": "sum"})
    return kpis[:4]


def _auto_charts(df: pd.DataFrame) -> List[Dict[str, Any]]:
    charts: List[Dict[str, Any]] = []
    # date line
    date_cols = [c for c in df.columns if _infer_dtype(df[c]) == "date"]
    cat_cols = [c for c in df.columns if _infer_dtype(df[c]) == "category"]
    num_cols = [c for c in df.columns if _infer_dtype(df[c]) == "number"]

    if date_cols and num_cols:
        x = date_cols[0]
        y = num_cols[0]
        g = df.groupby(pd.Grouper(key=x, freq="D"))[y].sum(min_count=1).reset_index()
        charts.append({
            "type": "line",
            "title": f"{y} by {x}",
            "xAxis": g[x].astype(str).tolist(),
            "series": [{"name": y, "data": g[y].fillna(0).tolist()}],
            "alt": "date-line"
        })

    if cat_cols and num_cols:
        x = cat_cols[0]
        y = num_cols[0]
        g = df.groupby(x)[y].sum(min_count=1).reset_index().sort_values(y, ascending=False).head(12)
        charts.append({
            "type": "barh" if len(g) > 12 else "pie",
            "title": f"Top {x}",
            "xAxis": g[x].astype(str).tolist(),
            "series": [{"name": y, "data": g[y].fillna(0).tolist()}],
            "alt": "category-summary"
        })

    if not charts and num_cols:
        y = num_cols[0]
        charts.append({
            "type": "bar",
            "title": f"Distribution of {y}",
            "xAxis": list(range(min(20, len(df)))),
            "series": [{"name": y, "data": df[y].fillna(0).head(20).tolist()}],
            "alt": "numeric-bar"
        })

    return charts


# ---------------- Services ----------------

def svc_upload(file_bytes: bytes, filename: str) -> Dict[str, str]:
    """Parse small sample for preview and register uid."""
    uid = str(uuid.uuid4())
    # lightweight parse for preview
    df = _read_any(file_bytes, filename)
    _UID_TO_VERSIONS.setdefault(uid, {})
    # store as temp version "preview"
    _UID_TO_VERSIONS[uid]["preview"] = df.head(2000)
    return {"uid": uid}


def _read_any(data: bytes, filename: str) -> pd.DataFrame:
    if filename.lower().endswith((".csv", ".txt")):
        return pd.read_csv(io.BytesIO(data))
    if filename.lower().endswith((".xlsx", ".xls")):
        return pd.read_excel(io.BytesIO(data))
    raise ValueError("Unsupported file type")


def svc_clean(uid: str, file_bytes: Optional[bytes], filename: Optional[str]) -> str:
    """Kick off full clean; returns taskId."""
    task_id = _new_task()

    def _job():
        try:
            time.sleep(0.25)  # simulate time for MVP
            if file_bytes is not None and filename is not None:
                df = _read_any(file_bytes, filename)
            else:
                df = _UID_TO_VERSIONS.get(uid, {}).get("preview")
            if df is None:
                raise ValueError("No preview found, please re-upload")
            # simple clean: try parse dates
            for c in df.columns:
                if df[c].dtype == object:
                    try:
                        df[c] = pd.to_datetime(df[c])
                    except Exception:
                        pass
            version = time.strftime("%Y%m%d%H%M%S")
            _UID_TO_VERSIONS[uid][version] = df
            _put_result(task_id, {"version": version})
        except Exception as e:
            _put_result(task_id, error=str(e))

    threading.Thread(target=_job, daemon=True).start()
    return task_id


def svc_meta(uid: str, version: str) -> Dict[str, Any]:
    df = _UID_TO_VERSIONS.get(uid, {}).get(version)
    if df is None:
        raise ValueError("Invalid uid/version")
    return {"columns": _columns_meta(df)}


def svc_board(uid: str, version: str) -> Dict[str, Any]:
    df = _UID_TO_VERSIONS.get(uid, {}).get(version)
    if df is None:
        raise ValueError("Invalid uid/version")
    return {"kpis": _auto_kpis(df), "charts": _auto_charts(df)}


def svc_explore_query(body: Dict[str, Any]) -> str:
    """Run explore query in background; returns taskId."""
    uid = body.get("uid")
    version = body.get("version")
    dims: List[str] = body.get("dims", [])
    measures: List[Dict[str, str]] = body.get("measures", [])
    filters: Dict[str, Any] = body.get("filters", {})
    chart_type: Optional[str] = body.get("chartType")

    task_id = _new_task()

    def _job():
        try:
            df = _UID_TO_VERSIONS.get(uid, {}).get(version)
            if df is None:
                raise ValueError("Invalid uid/version")
            q = df.copy()
            # apply filters (== only MVP)
            for k, v in (filters or {}).items():
                if k in q.columns:
                    q = q[q[k].astype(str) == str(v)]
            # aggregation
            agg_spec = {}
            for m in measures:
                col = m.get("col")
                fn = (m.get("aggregate") or "sum").lower()
                if col and col in q.columns:
                    agg_spec[col] = fn
            if dims and agg_spec:
                g = q.groupby(dims).agg(agg_spec).reset_index()
            elif agg_spec:
                g = q.agg(agg_spec).to_frame().T
            else:
                g = q.head(100)
            # auto chart
            result = {
                "table": g.head(200).to_dict(orient="records"),
                "columns": list(g.columns.astype(str)),
            }
            _put_result(task_id, result)
        except Exception as e:
            _put_result(task_id, error=str(e))

    threading.Thread(target=_job, daemon=True).start()
    return task_id


