import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function NewProduct(){
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [error, setError] = useState();

  const handleInputChange = event => {
    const { name, value } = event.target

    setProduct({ ...product, [name]: value })
  };

  function createProduct(data) {
    api.post('products', data)
      .then( (response) => setProduct(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Novo Product { error}</h2>
      <form action="">
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={product.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-green-100 rounded m-1"
            id="cadastrar"
            onClick={() => {
              createProduct(product);
              navigate('/products');
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
};