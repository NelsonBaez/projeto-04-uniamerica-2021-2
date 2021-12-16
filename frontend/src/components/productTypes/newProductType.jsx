import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function NewProductType(){
  let navigate = useNavigate();

  const [productType, setProductType] = useState({});
  const [error, setError] = useState();

  const handleInputChange = event => {
    const { name, value } = event.target

    setProductType({ ...productType, [name]: value })
  };

  function createProductType(data) {
    api.post('productTypes', data)
      .then( (response) => setProductType(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Novo Tipo Produto { error}</h2>
      <form action="">
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={productType.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-green-100 rounded m-1"
            id="cadastrar"
            onClick={() => {
              createProductType(productType);
              navigate('/productTypes');
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
};