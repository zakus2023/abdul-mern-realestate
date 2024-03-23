import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profiles from './Pages/Profiles'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'
import Listing from './Pages/Listing'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/listing/:listingId' element={<Listing/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profiles' element={<Profiles/>}/>
      <Route path='/createlisting' element={<CreateListing/>}/>
      <Route path='/updatelisting/:listingId' element={<UpdateListing/>}/>
      </Route>
    </Routes>
     
    </BrowserRouter>
  )
}
