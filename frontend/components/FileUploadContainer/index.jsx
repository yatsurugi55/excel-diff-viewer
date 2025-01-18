import React, { useState } from 'react';
import FileUpload from '../FileUpload';

const FileUploadContainer = () => {
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);

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
    </div>
  );
};

export default FileUploadContainer;
