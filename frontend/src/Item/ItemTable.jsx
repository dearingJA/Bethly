import React from 'react';
import ItemRow from './ItemRow';
import './ItemTable.css'

function ItemTable({ items }) {
  return (
    <table className='item-table'>
      <thead className='item-thead'>
        <tr>
          <th className='item-th'>Picture</th>
          <th className='item-th'>ID</th>
          <th className='item-th'>Group</th>
          <th className='item-th'>Name</th>
          <th className='item-th'>Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

export default ItemTable;
