from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from parser import extract_text_from_pdf, structure_with_llama

app = FastAPI()

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)
    structured = structure_with_llama(text)
    return JSONResponse(content=structured)
