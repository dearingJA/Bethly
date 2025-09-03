import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeUrl = (input) => {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return "https://" + input;
    }
    return input;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrice("");

    const normalizedUrl = normalizeUrl(url)

    try {
      const res = await fetch("http://localhost:8000/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPrice(data.price);
      }
    } catch (err) {
      setError("Failed to fetch price. Check your URL or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Item Price Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Get Price
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {price && <p>Price: <strong>${price}</strong></p>}
    </div>
  );
}

export default App;


