import React, { useState } from 'react'
import './additem.css'
import { userInfo } from '../services/dataStore';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const[productName,setProductName] = useState('');
    const  [productPrice, setProductPrice ] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDesc, setProductDesc] = useState(''); 
    const navigate = useNavigate();

    const addProduct = async(e)=>{
        e.preventDefault();
        if(productName == '' || productPrice == '' || productImage =='' || productDesc ==''){
            console.log("all fields are required");
            return;
        }
        try{
            const res = await fetch(`http://localhost:8080/add-product`,{
                headers:{
                    'Content-Type':'application/json',
                    "Authorization": "Token " + userInfo.token
                },
                method:'POST',
                body:JSON.stringify({productName,productPrice, productImage, productDesc})
                
            })
            console.log(res);
            navigate('/');

        }catch(err){
            console.log({'msg':err});
        }
    }
    
  return (
    <div className='absolute mx-auto left-1/3 top-1/4 w-4/12 min-w-80 rounded-lg bg-white shadow-lg p-4'>
        <h2 className='text-center font-serif mb-4 font-bold'>Add Your Product </h2>
        <form>
            <div>
                <label htmlFor="productName" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                <div class="mt-2">
                <input value={productName} onChange={(e)=>setProductName(e.target.value)}  id="productName" name="productName" type="text" autocomplete="email" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div>
                <label htmlFor="productPrice" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                <div class="mt-2">
                <input  value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}  id="productPrice" name="productPrice" type="number" autocomplete="email" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div>
                <label htmlFor="productImage" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                <div class="mt-2">
                <input  value={productImage} onChange={(e)=>setProductImage(e.target.value)}  id="productImage" name="productImage" type="text" autocomplete="email" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div>
                <label htmlFor="productDesc" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div class="mt-2">
                <textarea  value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} id="productDesc" name="productDesc" required className={"block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} >
                </textarea>
                </div>
            </div>

            <button onClick={addProduct} className="rounded-lg mt-4 py-4 bg-blue-500 text-white font-semibold" style={{width:'100%' }}>
                Add to Rent
            </button>
        </form>
    </div>
  )
}

export default AddItem