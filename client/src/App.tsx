import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage("API Error"));
  }, []);

  return (
    <div>
      <h1>PersonaForge AI</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
