import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemList, setItemList] = useState([]);

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
        body: JSON.stringify({ url: normalizedUrl, name: itemName}),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPrice(data.price);

        // create and update list
        setItemList(prev => {
          const new_list = [...prev, { name: itemName, price: data.price, image: data.img_url, url: data.url }];
          console.log(new_list);
          return new_list
        }); 
      }

      // let listItem = `Item: ${itemName}, Item Price: ${data.price}, Item Site: ${data.site}, Item Url: ${data.url}, Image URL: ${data.image_url}`

      // Reset Name and Url values
      setItemName("");
      setUrl("");

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
        <button type="submit" style={{ padding: "10px 20px" }}>
          Get Price
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {price && <p>Price: <strong>${price}</strong></p>}
      <h2>Item List</h2>
      <ul>
        {itemList.map((item, index) => (
          <li key={index} style= {{ marginBottom: "20px" }}>
            <p>{item.name}, {item.price}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt="Item image"
                style= {{ width: "150px", display: "block", marginBottom: "5px" }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


