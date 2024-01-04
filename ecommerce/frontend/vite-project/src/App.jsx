import { useState } from 'react'
import Nav from "./Nav"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './Footer'
import Signup from './Signup'
import PrivateComponent from './PrivateComponent'
import Login from './Login'
import './App.css'
import Addproduct from './Addproduct'
import ProductList from './ProductList'
import UpdateProduct from './UpdateProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<Addproduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>Logout Component</h1>}/>
        <Route path="/profile" element={<h1>Profile Component</h1>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path = "/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
     </div>
    </>
  )
}

export default App
