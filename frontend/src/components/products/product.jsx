import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';


export default function Product(){
  let params = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [error, setError] = useState();

  function deleteProduct(id){
    api.delete(`products/${id}`)
      .then( (response) => setProduct(response))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }

  const handleInputChange = event => {
    const { name, value } = event.target

    setProduct({ ...product, [name]: value })
};

  function updateProduct(id) {
    api.put(`products/${id}`, product)
      .then( (response) => setProduct(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }

  useEffect(() => {
    api.get(`products/${parseInt(params.productId)}`)
      .then( (response) => setProduct(response.data))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      })
  }, [params.productId]);

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Produto: { product.name ?? error}</h2>
      <form action="" >
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded" type="text" name="name" value={product.name} onChange={handleInputChange}/>
        </div>
        <div>
          <button
            className="p-2 bg-blue-100 rounded m-1"
            onClick={() => {
              updateProduct(product.id);
              navigate('/products');
            }}
          >
            Atualizar
          </button>
          <button
            className="p-2 bg-red-100 rounded m-1"
            onClick={() => {
              deleteProduct(product.id);
              navigate('/products');
            }}
          >
            Deletar
          </button>
        </div>
      </form>
    </div>
  )
};