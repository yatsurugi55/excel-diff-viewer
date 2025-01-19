from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
      "http://localhost:5173",
      "http://frontend:5173",
      "http://52.197.182.175:5173"
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

@app.post("/upload")
async def upload_files(
    source_file: UploadFile = File(...),
    target_file: UploadFile = File(...)
):
    try:
        print(f"Received files: source={source_file.filename}, target={target_file.filename}")  # ファイル名を確認
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        source_extension = os.path.splitext(source_file.filename)[1]
        source_filename = f"source_{timestamp}{source_extension}"
        
        file_path = os.path.join("static", source_filename)
        print(f"Saving source file to: {file_path}")  # 保存パスを確認
        with open(file_path, "wb") as buffer:
            content = await source_file.read()
            buffer.write(content)
       
        target_extension = os.path.splitext(target_file.filename)[1]
        target_filename = f"target_{timestamp}{target_extension}"
        
        file_path = os.path.join("static", target_filename)
        with open(file_path, "wb") as buffer:
            content = await target_file.read()
            buffer.write(content)
 
        return {
            "source": source_filename,
            "target": target_filename,
            "status": "success"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

