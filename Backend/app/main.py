from fastapi import FastAPI, File, HTTPException, UploadFile

app = FastAPI(title="Invoice Checker API")


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/upload")
async def upload_invoice(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")
    content = await file.read()
    return {"filename": file.filename, "size_bytes": len(content)}