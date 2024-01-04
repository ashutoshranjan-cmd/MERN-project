import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const navigate = useNavigate()
    const auth = localStorage.getItem('user')
    const [error, setError] = useState(false)

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {

                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        navigate('/')
        console.log(name, price, category, company, userId)
    }



    return (
        <div className="addproduct">
            <h1>Add Product</h1>
            <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Enter product name' />
            {error && !name && <span>Enter valid name</span>}

            <input type="text" onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter product price' />
            {error && !price && <span>Enter valid price</span>}

            <input type="text" onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter product category' />
            {error && !category && <span>Enter valid category</span>}

            <input type="text" onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter product company' />
            {error && !company && <span>Enter valid company name</span>}

            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default Addproduct