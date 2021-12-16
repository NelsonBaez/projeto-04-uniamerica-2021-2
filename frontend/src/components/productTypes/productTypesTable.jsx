import React from 'react';

export default function ProductTypesTable({cols, data}){
  console.log(cols);
  return (
    <table>
      <thead>
        <tr>
          {cols.map((col) => {
            return <th> {col.name}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return <tr>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td></td>
          </tr>
        })}
      </tbody>
    </table>
  );
}