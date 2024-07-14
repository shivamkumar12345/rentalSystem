import React, { useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {userInfo} from  '../services/dataStore'

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
      event.preventDefault();
      if( email =='' || password ==''){
        console.log("all field are required");
      }

     try{
        const res =  await fetch(`http://localhost:8080/user/signin`,
          {
            headers: {
              "Content-Type": "application/json",
            },            
            method:'POST',
            body:JSON.stringify({email,password})
          }
        );
        const data =  await res.json();
        
        userInfo.email = email;
        userInfo.token = data.token;
        navigate('/');

      }catch(err){
        console.log(err);
      }

     
    }

    const changeHandler = (e)=>{
      setEmail(e.target.value);
    }

  return (
 
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">SignIn to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">

        {/* email */}
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input onChange={changeHandler} value={email} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>

        {/* password */}
        <div>
            <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
        </div>
        <div className="mt-2">
          <input onChange={(e)=>{setPassword(e.target.value)}} value={password} id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
     

        
        {/* sign in button */}
      <div>
        <button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
      </div>
      <div className="text-sm">
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Create An Account</Link>
      </div>
    </form>
  </div>
</div>

  )
}

export default SignIn