import { Button } from 'antd'
import './App.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import { Outlet } from 'react-router'
import { ProductsProvider } from './contexts/product-context'


function App() {

  return (
    <>
      <ProductsProvider>
        <Navbar />
        <div style={{
          display: "flex",
          height: 'calc(100vh - 64px)',
        }}>
          <Sidebar />
          <Outlet />
        </div>
      </ProductsProvider>
    </>
  )
}

export default App
