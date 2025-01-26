import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import Diff from './diff'
import FileUploadContainer from './components/FileUploadContainer'

function App() {
  const [data, setData] = useState(null);
  const [diffData, setDiffData] = useState(null);

  const handleUploadComplete = (data) => {
    setDiffData(data);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <FileUploadContainer onUploadComplete={handleUploadComplete} />
      {diffData && <Diff sourceContent={diffData.source.content} targetContent={diffData.target.content} />}
    </div>
  );

  {/* 
  return <h1>Hello React + Vite</h1>
  */}
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
