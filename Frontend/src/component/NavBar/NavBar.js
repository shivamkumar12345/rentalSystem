import React, { useState, useEffect } from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Dropdown from '../DropDown/Dropdown';
import { userInfo } from '../services/dataStore';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '300px!important',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavBar = ({setFilterProduct}) => {
  const[show,setShow] = useState(false);
  const [isLogin , setLogin] = useState(false);
  const [searchedValue,setSearchedValue] = useState('');

  useEffect(()=>{
    if(userInfo.email){
      console.log(userInfo, 'in navbar');
      setLogin(true);
  }
  },[]);

 const searchItem = async()=>{
    try{
        const res = await fetch(`http://localhost:8080/search-product?query=${searchedValue}`);
        const {data} = await res.json();
        console.log(data);
        setFilterProduct(data);

    }catch(err){
      console.log(err);
    }
 }

  return (

    <nav className={"bg-blue flex flex-row justify-between py-4"} style={{'width':'100%'}}>
        <span>Rental System</span>
        <Search>
            
            <IconButton size="large" aria-label="search" color="inherit">
                <SearchIcon onClick={searchItem} />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setSearchedValue(e.target.value)}
              value={searchedValue}
            />
            
          </Search>
        <li>
        <Link to='#'>Home</Link>
        <Link to='/'>Product</Link>

        {!isLogin && <Link to='/signin'>SignIn</Link> }
        
        { isLogin && 
            <div className='profileImage cursor-pointer' onClick={()=>setShow(!show)}>
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                R
            </Avatar>
            {show ? <Dropdown/>:''}
          </div> }
        </li>

    </nav>
  )
}

export default NavBar