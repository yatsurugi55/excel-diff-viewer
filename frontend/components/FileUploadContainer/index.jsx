import React, { useState } from 'react';
import FileUpload from '../FileUpload';

const FileUploadContainer = ({ onUploadComplete }) => {
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCompare = async () => {
    if (!sourceFile || !targetFile) return;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('source_file', sourceFile);
      formData.append('target_file', targetFile);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log('Upload successful:', result);
        onUploadComplete(result.data);
      } else {
        alert('アップロードに失敗しました');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('アップロードエラーが発生しました');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <FileUpload
        label="比較元ファイル"
        onFileSelect={(file) => setSourceFile(file)}
      />
      <FileUpload
        label="比較先ファイル"
        onFileSelect={(file) => setTargetFile(file)}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={handleCompare}
          disabled={!sourceFile || !targetFile || isUploading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isUploading ? '比較中...' : '比較'}
        </button>
      </div>
    </div>
  );
};

export default FileUploadContainer;
