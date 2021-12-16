import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from '../../api/api';


export default function Product(){
  let params = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [productTypes, setProductTypes] = useState([]);
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
    api.get('/productTypes')
      .then( (response) => setProductTypes(response.data))
      .catch((err) => {
        console.error(err);
      })
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
        <div className="m-3 flex-1">
          <label>Preço : </label>
          <input className="p-2 rounded w-52" type="text" name="defaultPrice" value={product.defaultPrice} onChange={handleInputChange}/>
        </div>
        <div className="m-3 flex-1">
          <label>Tipo : </label>
          <select className="p-2 rounded w-52" value={product?.productType?.id} name="productType" onChange={handleInputChange}>
            {productTypes.map((productType) =>{
              return <option value={productType.id}>{productType.name}</option>
            })}
          </select>
        </div>
        <div className="m-3 flex-1">
          <label>Estoque: </label>
          <input className="p-2 rounded w-10 " type="text" name="currentStock" value={product.currentStock} disabled/>
          <NavLink
            className="p-2 bg-green-400 rounded m-1"
            to={`/products/${product.id}/purchase`}>+</NavLink>
          <NavLink
            className="p-2 bg-yellow-400 rounded m-1"
            to={`/products/${product.id}/order`}>-</NavLink>
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