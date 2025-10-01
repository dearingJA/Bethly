import React from 'react';

function ItemRow({ item }) {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.img_url && (
            <img
              src={item.img_url}
              alt="Item image"
              style={{ width: "150px", display: "block", marginBottom: "5px" }}
            />
          )}
        </a>
      </td>
      <td className='px-4 py-2'>{item.id}</td>
      <td className='px-4 py-2'>{item.name}</td>
      <td className='px-4 py-2'>{item.price}</td>
    </tr>
  );
}

export default ItemRow;
