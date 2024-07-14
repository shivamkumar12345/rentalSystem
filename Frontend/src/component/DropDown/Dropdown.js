import React from 'react'
import { Link } from 'react-router-dom'
const Dropdown = () => {
  return (
    <div class="relative">

      <div className='absolute mt-4 right-1/4 rounded-xl bg-white z-10 shadow-lg' >
          <div className='py-2 px-4 w-100 text-center text-gray-600 border-b-2'>
              <Link to='/profile'>
                  Profile
              </Link>
          </div>

          <div className='py-2 px-4 w-100 text-center text-gray-600 border-b-2'>
              <Link to='/add-item'>
                  AddItem
              </Link>
          </div>

          <div className='py-2 px-4 w-100 text-center text-red-400'>
              <Link to='/signin'>
                  Logout
              </Link>
          </div>
      </div>
    
    </div>

  )
}

export default Dropdown