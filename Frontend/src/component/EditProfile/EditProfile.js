import React, { useState } from 'react'
import { userInfo } from '../services/dataStore';
import {useNavigate} from 'react-router-dom'

const EditProfile = () => {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState();
    const [profile,setProfile] = useState('');
    const [address,setAddress] = useState();
    const navigate = useNavigate();

    const editProfile = async(e)=>{
            e.preventDefault();
            if(name == '' || mobile=='' || profile =='' || address == ''){
                console.log("all fields are required");
                return;
            }
            try{
                const res = await fetch(`http://localhost:8080/edit-profile`,{
                    headers:{
                        'Content-Type':'application/json',
                        "Authorization": "Token " + userInfo.token
                    },
                    method:'PATCH',
                    body:JSON.stringify({name,profile,mobile,address})
                    
                })
                console.log(res);
                navigate('/profile');
    
            }catch(err){
                console.log({'msg':err});
            }

    }

      return (
        <div className='absolute mx-auto left-1/3 top-1/4 w-4/12 min-w-80 rounded-lg bg-white shadow-lg p-4'>
            <h2 className='text-center font-serif mb-4 font-bold'>Edit Your Profile </h2>
            <form>
                <div>
                    <label htmlFor="userName" class="block text-sm font-medium leading-6 text-gray-900">Enter Name</label>
                    <div class="mt-2">
                    <input value={name} onChange={(e)=>setName(e.target.value)} id="userName" name="userName" type="text" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="mobile" class="block text-sm font-medium leading-6 text-gray-900">Mobile No.</label>
                    <div class="mt-2">
                    <input value={mobile} onChange={(e)=>setMobile(e.target.value)} id="mobile" name="mobile" type="number" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="userImage" class="block text-sm font-medium leading-6 text-gray-900">Your Image</label>
                    <div class="mt-2">
                    <input value={profile} onChange={(e)=>setProfile(e.target.value)}  id="userImage" name="userImage" type="text" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
    
                <div>
                    <label htmlFor="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div class="mt-2">
                        <textarea value={address} onChange={(e)=>setAddress(e.target.value)} id="address" name="address" required className={"block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} >
                        </textarea>
                    </div>
                </div>
    
                <button onClick={editProfile} className="rounded-lg mt-4 py-4 bg-blue-500 text-white font-semibold" style={{width:'100%' }}>
                    Edit
                </button>
            </form>
        </div>
      )
    }


export default EditProfile