import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './App.css'

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])
    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCompany(result.company)
        setCategory(result.category)

    }

    const updateProduct = async () => {
        // console.log(name,price,category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        navigate('/')

    }

    return (
        <div className="updateproduct">
            <h1>Update Product</h1>
            <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} placeholder='Enter product name' />

            <input type="text" onChange={(e) => { setPrice(e.target.value) }} value={price} placeholder='Enter product price' />

            <input type="text" onChange={(e) => { setCategory(e.target.value) }} value={category} placeholder='Enter product category' />

            <input type="text" onChange={(e) => { setCompany(e.target.value) }} value={company} placeholder='Enter product company' />

            <button onClick={updateProduct}>Update Data</button>
        </div>
    )
}

export default UpdateProduct;