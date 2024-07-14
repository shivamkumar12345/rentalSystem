import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confPassword,setConfPassword] = useState('');
    const [role,setRole] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
      e.preventDefault(); // to stop page refresh

      if(name =='' || email =='' || password ==''){
          console.log("all field are required");
      }else if(password !== confPassword){
          console.log("confirm password should match password field");
      }
       try{
          const res =  await fetch(`http://localhost:8080/user/register`,
            {
              headers: {
                "Content-Type": "application/json",
              },            
              method:'POST',
              body:JSON.stringify({name,email,password, role})
            }
          );
          console.log(res.status);
          // if(res.status == 'ok'){
              navigate('/signin')
          
       }catch(err){
        console.log(err);
       }
     
    }
    const handleUserRole = (e)=>{
      if(e.target.checked){
         setRole('seller');
      }else{
        setRole('buyer')
      }
    }

  return (
 
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">
        {/* full Name */}
        <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
            <input value={name} onChange={(e)=>setName(e.target.value)} id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>

        {/* email */}
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input  value={email} onChange={(e)=>setEmail(e.target.value)}  id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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
          <input  value={password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      {/* confirm password */}
      <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        </div>
        <div className="mt-2">
          <input  value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} id="conf-password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>


        {/* seller checkbox */}
        <div className="flex items-center justify-between w-full gap-6">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Seller</label>
            <div className="w-full">
                <input  value={role} onChange={handleUserRole} name="role" type="checkbox"  className="py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> Yes
            </div>
        </div>
        
        {/* sign up button */}
      <div>
        <button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>
    <div className="text-sm">
        <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">Already have Account?</Link>
    </div>
  </div>
</div>

  )
}

export default SignUp