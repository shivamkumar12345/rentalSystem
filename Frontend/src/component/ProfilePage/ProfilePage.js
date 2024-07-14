import React, { useEffect, useState } from 'react'
import './profilepage.css'
import { Link } from 'react-router-dom'
import { userInfo } from '../services/dataStore';



const ProfilePage = () => {

  const [userProduct,setUserProduct] =useState([]);
  const [userProfile,setUserProfile]= useState({}); 
  const [userRentItem,setRentItem] = useState([]);
  
  useEffect(()=>{
      const fetchProducts =async()=>{
          const res = await fetch('http://localhost:8080/user-product',{
            headers:{
                'Content-Type':'application/json',
                "Authorization": "Token " + userInfo.token
            },
            method:'GET',
            
          });
          const data = await res.json();
          setUserProduct(data);
      }
      fetchProducts();
  },[]);

  useEffect(()=>{
    const fetchProfileInfo =async()=>{
        const res = await fetch('http://localhost:8080/user-profile',{
          headers:{
              'Content-Type':'application/json',
              "Authorization": "Token " + userInfo.token
          },
          method:'GET',
          
        });
        const data = await res.json();
        console.log(data);
        setUserProfile(data);
    }
    fetchProfileInfo();
},[]);

useEffect(()=>{
  const fetchRentItemInfo =async()=>{
      const res = await fetch('http://localhost:8080/user-rent',{
        headers:{
            'Content-Type':'application/json',
            "Authorization": "Token " + userInfo.token
        },
        method:'GET',
        
      });
      const data = await res.json();
      console.log(data);
      setRentItem(data);
  }
  fetchRentItemInfo();
},[]);

  return (
    <>
      <div class="bg-white text-gray-600 min-h-screen p-10">
        <div class="flex">
          <img class="mr-6" src={userProfile.profile} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwv178TD2B0QpRzs8RzWoGKiSZzS4HqvW12A&s"/>
          <div class="flex flex-col justify-center">
            {/* content  */}
            <h4 class="mt-0 mb-2 capitalize text-gray-900 font-bold tracking-widest text-2xl">{userProfile.name}</h4>
            <h1 class="mt-0 mb-2 text-gray-950 text-4xl">{userProfile.address}</h1>
            <p class="text-gray-600 text-sm">{userInfo.email}</p>
            <p class="text-gray-600 text-sm">Created at 1-July 2024</p>
          </div>
        </div>
    
        {/* action buttons */}
        <div class="mt-6 flex justify-between">
          <div class="flex">
            <Link to='/edit-profile'>
              <button class="mr-2 bg-blue-500 text-white-700 block py-2 px-8 rounded-full">Edit</button>
            </Link>
            
          </div>
          <div class="text-gray-600 text-sm tracking-widest text-right">
            <h5 class="mb-1">Products</h5>
            <p>{userProduct.length}</p>
          </div>
        </div>
    
        {/* product list    */}
        <div class="mt-10">
          {/* product list header  */}
          <div class="flex text-gray-600">
            <div class="p-2 w-8 flex-shrink-0"></div>
            <div class="p-2 w-8 flex-shrink-0"></div>
            <div class="p-2 w-full">Product Name</div>
            <div class="p-2 w-full">Price</div>
            <div class="p-2 w-full">image</div>
            <div class="p-2 w-full">Category</div>
            <div class="p-2 w-12 flex-shrink-0 text-right">status</div>
          </div>
          {
            userProduct?.map((item,idx)=>{
              return <>
               <div class="flex border-b border-gray-800 hover:bg-blue-500">
                  <div class="p-3 w-8 flex-shrink-0">{idx}</div>
                  <div class="p-3 w-8 flex-shrink-0">❤️</div>
                  <div class="p-3 w-full">{item.productName}</div>
                  <div class="p-3 w-full">{item.pricePerDay}</div>
                  <div class="p-3 w-full">{item.image.toString().substr(0,30) + '...'}</div>
                  <div class="p-3 w-full">car</div>
                  <div class="p-3 w-12 flex-shrink-0 text-right">available</div>
               </div>
              </>;
            })
          }
      
         
          
        </div>


        {/* action buttons */}
        <div class="mt-6 flex justify-flex-end">
          <div class="text-gray-600 text-sm tracking-widest text-right">
            <h5 class="mb-1">Rent</h5>
            <p>{userRentItem.length}</p>
          </div>
        </div>
    
        {/* rent list    */}
        <div class="mt-10">
          {/* rent list header  */}
          <div class="flex text-gray-600">
            <div class="p-2 w-8 flex-shrink-0"></div>
            <div class="p-2 w-8 flex-shrink-0"></div>
            <div class="p-2 w-full">Product Name</div>
            <div class="p-2 w-full">Price</div>
            <div class="p-2 w-12 flex-shrink-0 text-right">expire At</div>
          </div>
          {
            userRentItem?.map((item,idx)=>{
              return <>
               <div class="flex border-b border-gray-800 hover:bg-blue-500">
                  <div class="p-3 w-8 flex-shrink-0">{idx}</div>
                  <div class="p-3 w-8 flex-shrink-0">❤️</div>
                  <div class="p-3 w-full">{item.productName}</div>
                  <div class="p-3 w-full">{item.totalPrice}</div>
                 <div class="p-3 w-12 flex-shrink-0 text-right">
                  {item.expireDate.substr(0,10) }</div>
               </div>
              </>;
            })
          }
      
         
          
        </div>
     </div>
    </>
  )
}

export default ProfilePage