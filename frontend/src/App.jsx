import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemList, setItemList] = useState([]);
  const [group, setGroup] = useState("");


  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:8000/items/");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setItemList(data)
    } catch (err) {
      console.log(err);
      setError("Failed to load items.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
      const res = await fetch("http://localhost:8000/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          user: "username",
          name: itemName,
          group: group,
          url: normalizedUrl
        }),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const newItem = await res.json();

      setItemList((prev) => [...prev, newItem]);

      setItemName("");
      setUrl("");
      setGroup("");
      setPrice(newItem.price);

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
        placeholder="Name for Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "5px" }}
      />
      <input
        type="text"
        placeholder="Paste product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Group Name (by default set as default)"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "5px" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>
        Get Price
      </button>
    </form>

    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    {price && <p>Price: <strong>${price}</strong></p>}

    <h2>Item List</h2>
    <ul>
      {itemList.map((item) => (
        <li key={item.id} style={{ marginBottom: "20px" }}>
          <p>{item.name}, {item.price}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.img_url && (
              <img
                src={item.img_url}
                alt="Item image"
                style={{ width: "150px", display: "block", marginBottom: "5px" }}
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
  );
}

  
export default App;


