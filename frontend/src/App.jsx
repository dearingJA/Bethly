import './App.css'
import { useState, useEffect } from "react";

import ItemTable from "./Item/ItemTable";
import GroupPicker from './GroupPicker/GroupPicker';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");

  const [itemList, setItemList] = useState([]);
  const [itemName, setItemName] = useState("");

  const [groups, setGroups] = useState(["default"]);
  const [group, setGroup] = useState("default");


  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:8000/items/");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setItemList(data)

      const uniqueGroups = Array.from(
        new Set(["default", ...data.map((item) => item.group)])
      );
      setGroups(uniqueGroups);
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
  
  const groupByGroup = (items, key) => {
    return items.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrice("");

    // don't submit on empty attributes
    if (!itemName.trim() || !url.trim()) {
      setError("Please enter both item name and valid URL for the item.");
      return;
    }

    setLoading(true);

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
  <div className='app-container'>
    <h1>Item Price Checker</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name for Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className='form-input'
      />
      <input
        type="text"
        placeholder="Paste product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className='form-input'
      />
      <GroupPicker 
          value={group} 
          onChange={setGroup} 
          groups={groups} 
          setGroups={setGroups} />
      <button type="submit" className='form-button'>
        Get Price
      </button>
    </form>

    {loading && <p>Loading...</p>}
    {error && <p className='error-text'>{error}</p>}
    {price && <p>Price: <strong>${price}</strong></p>}

    <h2>Item List</h2>

    {Object.entries(groupByGroup(itemList, "group")).map(([groupName, items]) => (
      <div key={groupName} className="group-section">
        <h3>{groupName}</h3>
        <ItemTable items={items} />
      </div>
    ))}

  </div>

  );
}
  
export default App;
