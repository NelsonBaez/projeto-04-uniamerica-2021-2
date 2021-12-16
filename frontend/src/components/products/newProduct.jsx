import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function NewProduct(){
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [productTypes, setProductTypes] = useState([]);
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
  useEffect(() => {
    api.get('/productTypes')
      .then( (response) => setProductTypes(response.data))
      .catch((err) => {
        console.error(err);
      })
  }, [])
  

  return (
    <div className="flex flex-col flex-wrap ">
      <h2>Novo Produto { error}</h2>
      <form action="">
        <div className="m-3 flex-1">
          <label>Nome: </label>
          <input className="p-2 rounded w-52" type="text" name="name" value={product.name} onChange={handleInputChange}/>
        </div>
        <div className="m-3 flex-1">
          <label>Preço : </label>
          <input className="p-2 rounded w-52" type="text" name="defaultPrice" value={product.defaultPrice} onChange={handleInputChange}/>
        </div>
        <div className="m-3 flex-1">
          <label>Tipo : </label>
          <select className="p-2 rounded w-52"  name="productType" onChange={handleInputChange}>
            <option hidden value=''>Selecione o Tipo de Produto</option>
            {productTypes.map((productType) =>{
              return <option value={productType.id}>{productType.name}</option>
            })}
          </select>
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