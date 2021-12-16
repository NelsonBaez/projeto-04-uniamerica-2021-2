import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function Purchase(){
  let params = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [purchase, setPurchase] = useState({});

  const [error, setError] = useState();
  const [suppliers, setSuppliers] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target

    setPurchase({ ...purchase, [name]: value })
  };

  function purchaseProduct(id){
    api.post(`products/${id}/purchase`, purchase)
      .then( (response) => setProduct(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }
  
  useEffect(() => {
    api.get('/suppliers')
      .then( (response) => setSuppliers(response.data))
      .catch((err) => {
        console.error(err);
      })
    api.get(`products/${parseInt(params.productId)}`)
      .then( (response) => {
        setProduct(response.data)
        setPurchase({price : response.data.defaultPrice})
      })
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
          <label>Quantia: </label>
          <input className="p-2 rounded" type="number" name="quantity" onChange={handleInputChange}/>
        </div>
        <div className="m-3 flex-1">
          <label>Preço : </label>
          <input className="p-2 rounded w-52" type="text" name="price" value={purchase.price} onChange={handleInputChange}/>
        </div>
        <div className="m-3 flex-1">
          <label>Fornecedor : </label>
          <select className="p-2 rounded w-52" name="supplier" onChange={handleInputChange}>
            <option hidden value=''>Selecione o Fornecedor</option>
            {suppliers.map((supplier) =>{
              return <option value={supplier.id}>{supplier.name}</option>
            })}
          </select>
        </div>
        
        <div>
          <button
            className="p-2 bg-blue-100 rounded m-1"
            onClick={() => {
              purchaseProduct(`${product.id}`);
              navigate(`/products/${product.id}`);
            }}
          >
            Comprar
          </button>
        </div>
      </form>
    </div>
  )
};