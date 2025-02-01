import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import Diff from './diff'
import FileUploadContainer from './components/FileUploadContainer'
import Header from './components/Header';

function App() {
  const [diffData, setDiffData] = useState(null);

  const handleUploadComplete = (data) => {
    setDiffData(data);
  };

  return (
    <div>
      <Header />
      <FileUploadContainer onUploadComplete={handleUploadComplete} />
      {diffData && (
        <Diff
          sourceContent={diffData.source.content}
          targetContent={diffData.target.content}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
