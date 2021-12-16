import React from 'react';

export default function Table({cols, data}){
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
          return <tr> </tr>
        })}
      </tbody>
    </table>
  );
}