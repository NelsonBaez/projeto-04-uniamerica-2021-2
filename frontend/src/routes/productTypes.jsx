import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../api/api';
import Table from '../components/table';

export default function ProductTypes(){
  const [productTypes, setProductTypes] = useState([]);
  const history = useParams();

  let cols = [
    {name: 'Nome',},
    {name: ' ',}
  ]

  useEffect(() =>{
    api.get('/productTypes')
      .then( (response) => setProductTypes(response.data))
      .catch((err) => {
        console.error(err);
      })
  }, [history])

  return (
    <main>
      <h2 className="font-bold my-5 text-3xl">Tipos de Produtos</h2>
      <Table cols={cols} data={productTypes} />
    </main>
  );
}