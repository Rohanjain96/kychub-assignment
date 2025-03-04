import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProductList from './pages/product-list.jsx'
import CompareProductTable from './pages/compare-products.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<ProductList />} />
          <Route path='/compare-products' element={<CompareProductTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
