import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function Order(){
  let params = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});

  const [error, setError] = useState();

  const handleInputChange = event => {
    const { name, value } = event.target

    setOrder({ ...order, [name]: value })
  };

  function orderProduct(id){
    api.post(`products/${id}/order`, order)
      .then( (response) => setProduct(response))
      .catch((err) => {
        setError(err.response.data.message);
        alert(err.response.data.title);
        console.error(err);
      })
  }
  
  useEffect(() => {
    api.get(`products/${parseInt(params.productId)}`)
      .then( (response) => {
        setProduct(response.data)
        setOrder({price : response.data.defaultPrice})
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
          <input className="p-2 rounded w-52" type="text" name="price" value={order.price} onChange={handleInputChange}/>
        </div>
        
        <div>
          <button
            className="p-2 bg-blue-100 rounded m-1"
            onClick={() => {
              orderProduct(`${product.id}`);
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