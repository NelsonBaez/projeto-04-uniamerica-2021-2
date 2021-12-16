import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';


export default function ProductType(){
  let params = useParams();
  let navigate = useNavigate();

  const [productType, setProductType] = useState({});
  const [error, setError] = useState();

  function deleteProductType(id){
    api.delete(`productTypes/${id}`)
      .then( (response) => setProductType(response))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }

  const handleInputChange = event => {
    const { name, value } = event.target

    setProductType({ ...productType, [name]: value })
};

  function updateProductType(id) {
    api.put(`productTypes/${id}`, productType)
      .then( (response) => setProductType(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  useEffect(() => {
    api.get(`productTypes/${parseInt(params.productTypeId)}`)
      .then( (response) => setProductType(response.data))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }, [params.productTypeId]);

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Tipo de Produto: { productType.name ?? error}</h2>
      <form action="" >
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={productType.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-blue-100 rounded m-1"
            onClick={() => {
              updateProductType(productType.id);
              navigate('/productTypes');
            }}
          >
            Atualizar
          </button>
          <button
            className="p-2 bg-red-100 rounded m-1"
            onClick={() => {
              deleteProductType(productType.id);
              navigate('/productTypes');
            }}
          >
            Deletar
          </button>
        </div>
      </form>
    </div>
  )
};