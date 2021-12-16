import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import api from '../api/api';

export default function Products(){
  const [products, setProducts] = useState([]);
  const history = useParams();
  
  useEffect(() =>{
    api.get('/products')
      .then( (response) => setProducts(response.data))
      .catch((err) => {
        console.error(err);
      })
  }, [history])

  return (
    <main>
      <h2 className="font-bold my-5 text-3xl">Produtos</h2>
      <div className="flex flex-row flex-wrap container text-center mx-auto shadow-md">
        <div className="p-5 border-r-2 text-xl bg-green-200"> 
          <div >
            <NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-0`}
              to={`/products/new`}>
              Novo Produto
            </NavLink>
          </div>

          {products.map((product) => {
            return <div ><NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-${product.id}`}
              to={`/products/${product.id}`}>
              {product.name}
            </NavLink></div>
          })}

        </div>
        <div className="flex-1 p-5 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
}