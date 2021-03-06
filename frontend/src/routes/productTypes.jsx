import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import api from '../api/api';

export default function ProductTypes(){
  const [productTypes, setProductTypes] = useState([]);
  const history = useParams();
  
  useEffect(() =>{
    api.get('/productTypes')
      .then( (response) => setProductTypes(response.data))
      .catch((err) => {
        console.error(err);
      })
  }, [history])

  return (
    <main>
      <h2 className="font-bold my-5 text-3xl">Tipos de Produtos</h2>
      <div className="flex flex-row flex-wrap container text-center mx-auto shadow-md">
        <div className="p-5 border-r-2 text-xl bg-green-200"> 
          <div >
            <NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-0`}
              to={`/productTypes/new`}>
              Novo Tipo Produto
            </NavLink>
          </div>

          {productTypes.map((productType) => {
            return <div ><NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-${productType.id}`}
              to={`/productTypes/${productType.id}`}>
              {productType.name}
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