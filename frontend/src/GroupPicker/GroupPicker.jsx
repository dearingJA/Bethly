import './GroupPicker.css'
import { useState } from "react";

export default function GroupPicker({ value, onChange, groups, setGroups }) {
  const [newGroup, setNewGroup] = useState("");

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      setGroups([...groups, newGroup]);
      onChange(newGroup);
      setNewGroup("");
    }
  };

  const handleSelectChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="group-picker">
      <select
        value={value}
        onChange={handleSelectChange}
        className="form-input group-select"
      >
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <div className="group-add">
        <input
          type="text"
          placeholder="New group name"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className="form-input"
        />
        <button
          type="button" 
          onClick={handleAddGroup} 
          className="btn"
        >
          Add Group
        </button>
      </div>
    </div>
  );
}
