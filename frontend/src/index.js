import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './routes/home';
import ProductTypes from './routes/productTypes';
import NewProductType from './components/productTypes/newProductType';
import ProductType from './components/productTypes/ProductType';
import Suppliers from './routes/suppliers';
import NewSupplier from './components/suppliers/newSupplier';
import Supplier from './components/suppliers/supplier';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="productTypes" element={<ProductTypes />} >
          <Route path="new" element={<NewProductType />} />
          <Route path=":productTypeId" element={<ProductType />} />
        </Route>
        <Route path="suppliers" element={<Suppliers />} >
          <Route path="new" element={<NewSupplier />} />
          <Route path=":supplierId" element={<Supplier />} />
        </Route>
        <Route
          path="*"
          element={
            <main >
              <p>404 Not Found</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
