import React from 'react';
import ItemRow from './ItemRow';

function ItemTable({ items }) {
  return (
    <table className='w-full border border-gray-200'>
      <thead className='bg-gray-100'>
        <tr>
          <th className='px-4 py-2'>Picture</th>
          <th className='px-4 py-2'>ID</th>
          <th className='px-4 py-2'>Name</th>
          <th className='px-4 py-2'>Price</th>
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
