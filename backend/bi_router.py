from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import Optional

from .bi_service import (
    svc_upload,
    svc_clean,
    svc_meta,
    svc_board,
    svc_explore_query,
    get_task,
)

router = APIRouter(prefix="/bi", tags=["bi"])


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    data = await file.read()
    return svc_upload(data, file.filename)


@router.post("/clean")
async def clean(uid: str = Form(...), file: Optional[UploadFile] = None):
    data = await file.read() if file else None
    fname = file.filename if file else None
    task_id = svc_clean(uid, data, fname)
    return {"taskId": task_id}


@router.get("/status/{task_id}")
async def status(task_id: str):
    return get_task(task_id)


@router.get("/meta/{uid}")
async def meta(uid: str, v: str):
    try:
        return svc_meta(uid, v)
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


@router.get("/board/{uid}")
async def board(uid: str, v: str):
    try:
        return svc_board(uid, v)
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


@router.post("/explore/query")
async def explore_query(body: dict):
    task_id = svc_explore_query(body)
    return {"taskId": task_id}


