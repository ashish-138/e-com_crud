import React,{useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'


const UpdateProduct=()=>{
    const [name,setName]= useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory]= useState('');
    const [company, setCompany]= useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // console.warn(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }


    const updateProduct= async ()=>{
        console.warn(name,price,category,company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body: JSON.stringify({name,price, category, company}),
            headers:{
                'content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.warn(result)
        navigate("/");
    }

    return(
        <div className='product'>
            <h1>Update Products</h1>
            <input type="text" className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Product Name'/>
            <input type="number" className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Price"/>
            <input type="text" className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Category"/>
            <input type="text" className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Company Name"/>
            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;