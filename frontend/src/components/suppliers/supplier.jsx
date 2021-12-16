import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';


export default function Supplier(){
  let params = useParams();
  let navigate = useNavigate();

  const [supplier, setSupplier] = useState({});
  const [error, setError] = useState();

  function deleteSupplier(id){
    api.delete(`suppliers/${id}`)
      .then( (response) => setSupplier(response))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }

  const handleInputChange = event => {
    const { name, value } = event.target

    setSupplier({ ...supplier, [name]: value })
};

  function updateSupplier(id) {
    api.put(`suppliers/${id}`, supplier)
      .then( (response) => setSupplier(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  useEffect(() => {
    api.get(`suppliers/${parseInt(params.supplierId)}`)
      .then( (response) => setSupplier(response.data))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }, [params.supplierId]);

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Fornecedor: { supplier.name ?? error}</h2>
      <form action="" >
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={supplier.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-blue-100 rounded m-1"
            onClick={() => {
              updateSupplier(supplier.id);
              navigate('/suppliers');
            }}
          >
            Atualizar
          </button>
          <button
            className="p-2 bg-red-100 rounded m-1"
            onClick={() => {
              deleteSupplier(supplier.id);
              navigate('/suppliers');
            }}
          >
            Deletar
          </button>
        </div>
      </form>
    </div>
  )
};