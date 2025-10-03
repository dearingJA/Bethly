import React from 'react';
import ItemRow from './ItemRow';
import './ItemTable.css'

function ItemTable({ groupName, items, onItemDelete }) {

  return (
    <div>
      <h3>{groupName}</h3>
      <table className='item-table'>
        <thead className='item-thead'>
          <tr>
            <th className='item-th'>Picture</th>
            <th className='item-th'>ID</th>
            <th className='item-th'>Name</th>
            <th className='item-th'>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow key={item.id} item={item} onDelete={onItemDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
