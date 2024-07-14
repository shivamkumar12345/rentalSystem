import React,{useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import Products from './component/Products/Products';
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import Error from './component/Error';
import ProfilePage from './component/ProfilePage/ProfilePage';
import AddItem from './component/AddItem/AddItem';
import EditProfile from './component/EditProfile/EditProfile';


function App() {
  const [filterProduct,setFilterProduct] = useState([]);
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route exact path='/signup' element={<SignUp/>}/>
          
          <Route exact path='/signin' element={<SignIn/>}/>
          
          <Route exact path='/' element={<>
            <NavBar setFilterProduct={setFilterProduct}/>
            <Products filterProduct={filterProduct}/>
          </>}/>

          <Route exact path='/profile' element={<>
            <NavBar setFilterProduct={setFilterProduct}/>
            <ProfilePage />
          </>}/>

          <Route exact path='/add-item' element={ <AddItem/>}/>
          <Route exact path='/edit-profile' element={ <EditProfile/>}/>
          
          <Route exact path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
     
  );
}

export default App;
