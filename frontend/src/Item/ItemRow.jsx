import React from 'react';
import './ItemRow.css'

function ItemRow({ item }) {
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
      <td className='cell'>{item.group}</td>
      <td className='cell'>{item.name}</td>
      <td className='cell'>{item.price}</td>
    </tr>
  );
}

export default ItemRow;
