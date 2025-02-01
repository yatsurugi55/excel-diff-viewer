from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from datetime import datetime
from markitdown import MarkItDown

class ConvertedFile:
    def __init__(self, original_filename: str, markdown_path: str):
        self.original_filename = original_filename
        self.markdown_path = markdown_path  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
      "http://localhost:5050",
      "http://52.197.182.175:5173",
      "http://52.197.182.175:80"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

# staticディレクトリが存在しない場合は作成
if not os.path.exists("static"):
    os.makedirs("static")

@app.get("/")
def read_root():
    return {"Hello": "World"}

async def save_file(file: UploadFile, prefix: str, timestamp: str) -> ConvertedFile:
    print ("2/1 edit")
    extension = os.path.splitext(file.filename)[1]
    filename = f"{prefix}_{timestamp}{extension}"
    filepath = os.path.join("static", filename)

    content = await file.read()
    with open(filepath, "wb") as buffer:
        buffer.write(content)

    md_path = os.path.join("static", f"{prefix}_{timestamp}.md")
    try:
        md = MarkItDown()
        md_content = md.convert(filepath)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md_content.text_content)
    except Exception as e:
       raise HTTPException(status_code=422, detail=f"Markdown failed: {str(e)}") 
    return ConvertedFile(filename, md_path)

@app.post("/upload")
async def upload_files(
    source_file: UploadFile = File(...),
    target_file: UploadFile = File(...)
):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    try:
        source_result = await save_file(source_file, "source", timestamp)
        target_result = await save_file(target_file, "target", timestamp)

        with open(source_result.markdown_path, "r", encoding="utf-8") as f:
            source_md_content = f.read()
        with open(target_result.markdown_path, "r", encoding="utf-8") as f:
            target_md_content = f.read()

        return {
            "status": "success",
            "data": {
                "source": {
                    "original": source_result.original_filename,
                    "content": source_md_content
                },
                "target": {
                    "original": target_result.original_filename,
                    "content": target_md_content
                }
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
