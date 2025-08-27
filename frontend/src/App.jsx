// frontend/src/App.js
import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/price")
      .then((res) => res.json())
      .then((data) => setPrice(data.price))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Amazon Price:</h1>
      <p>{price ? `$${price}` : "Loading..."}</p>
      <p>test</p>
    </div>
  );
}

export default App;

