import React, { useState } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const FileUpload = ({ 
  label,           // "比較元"や"比較先"などのラベル
  onFileSelect,    // ファイル選択時のコールバック
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  //const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // ファイルサイズチェック
      if (file.size > MAX_FILE_SIZE) {
        alert('ファイルサイズは10MB以下にしてください');
        event.target.value = '';  // input をリセット
        setSelectedFile(null);
        onFileSelect(null);
        return;
      }

      if (file.name.match(/\.(xlsx|xls)$/)) {
        setSelectedFile(file);
        onFileSelect(file);
        //uploadFile(file);
      } else {
        setSelectedFile(null);
        alert('Excelファイル(.xlsx, .xls)を選択してください');
      }
    }
  };

/* 
  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });
           
        const result = await response.json();
           
        if (result.status === 'success') {
            onFileSelect({ 
                originalName: result.original_filename,
                savedName: result.filename 
            });
        } else {
            alert('アップロードに失敗しました');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('アップロードエラーが発生しました');
    } finally {
        setUploading(false);
    }
  };
*/

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.xls"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />

        {selectedFile && (
          <div className="mt-2 text-sm text-gray-500">
            選択されたファイル: {selectedFile.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
