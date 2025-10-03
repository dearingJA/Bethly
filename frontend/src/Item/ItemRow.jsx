import React from 'react';
import './ItemRow.css'

function ItemRow({ item, onDelete }) {

    const handleItemDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/items/${item.id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error (`HTTP error: ${res.status}`);
      onDelete(item.id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <tr className='item-row'>
      <td>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.img_url && (
            <img
              src={item.img_url}
              alt="Item image"
              className='item-image'
            />
          )}
        </a>
      </td>
      <td className='cell'>{item.id}</td>
      <td className='cell'>{item.name}</td>
      <td className='cell'>{item.price}</td>
      <td className='cell'>
        <button
          type='button'
          onClick={handleItemDelete}
          className='delete-btn'
        >
          Delete Item
        </button>
      </td>
    </tr>
  );
}

export default ItemRow;
