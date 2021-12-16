import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import api from '../api/api';

export default function Suppliers(){
  const [suppliers, setSupplier] = useState([]);
  const history = useParams();
  
  useEffect(() =>{
    api.get('/suppliers')
      .then( (response) => setSupplier(response.data))
      .catch((err) => {
        console.error(err);
      })
  }, [history])

  return (
    <main>
      <h2 className="font-bold my-5 text-3xl">Fornecedores</h2>
      <div className="flex flex-row flex-wrap container text-center mx-auto shadow-md">
        <div className="p-5 border-r-2 text-xl bg-green-200"> 
          <div >
            <NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-0`}
              to={`/suppliers/new`}>
              Novo Fornecedor
            </NavLink>
          </div>

          {suppliers.map((supplier) => {
            return <div ><NavLink 
              className={({ isActive }) => isActive ? "text-red-400" : "text-blue-400"}
              data-testid={`link-${supplier.id}`}
              to={`/suppliers/${supplier.id}`}>
              {supplier.name}
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