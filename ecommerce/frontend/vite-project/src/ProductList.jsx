import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'


const ProductList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)
        console.log(result)
    }
    const deleteProduct = async (id) => {
        // console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {

            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "Delete"
        })
        result = await result.json()
        if (result) {
            alert("record is deleted")
            getProducts();
        }

    }
    const updateProduct = (id) => {

        navigate(`/update/${id}`)
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }
    }
    return (
        <div className="productlist">
            <h1>product list</h1>
            <div className="searchproduct">
                <input type="text" placeholder='search product here ...' onChange={searchHandle} />
            </div>
            <ul className='listcontainer'>
                <li className='listname' >S.no </li>
                <li className='listname' >Name</li>
                <li className='listname' >Price </li>
                <li className='listname' >Category</li>
                <li className='listname' >Company</li>
                <li className='listname' >Operation</li>
            </ul>
            {
                products.length ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li className='listname' >{index + 1} </li>
                        <li className='listname' >{item.name}</li>
                        <li className='listname' >Rs {item.price} </li>
                        <li className='listname' >{item.category}</li>
                        <li className='listname' >{item.company}</li>
                        <li className='listname' ><button onClick={() => deleteProduct(item._id)}>Delete</button> | <button onClick={() => updateProduct(item._id)}>Update</button></li>

                    </ul>
                ) :
                    <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList