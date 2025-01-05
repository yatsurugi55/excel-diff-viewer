import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import Diff from './diff'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <Diff />
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
