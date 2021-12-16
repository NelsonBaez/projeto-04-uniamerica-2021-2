import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function NewSupplier(){
  let navigate = useNavigate();

  const [supplier, setSupplier] = useState({});
  const [error, setError] = useState();

  const handleInputChange = event => {
    const { name, value } = event.target

    setSupplier({ ...supplier, [name]: value })
  };

  function createSupplier(data) {
    api.post('suppliers', data)
      .then( (response) => setSupplier(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Novo Fornecedor { error}</h2>
      <form action="">
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={supplier.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-green-100 rounded m-1"
            id="cadastrar"
            onClick={() => {
              createSupplier(supplier);
              navigate('/suppliers');
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
};