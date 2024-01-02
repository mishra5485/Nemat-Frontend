
import './App.css'
import Admin_login from './Component/Admin_login'
import { Route, Routes } from 'react-router-dom'
import Error from './Component/Error'
import Dashboard from './Component/Dashboard'
import { PrivateRoute } from './Component/auth/PrivateRoute'
import Check from './Component/Check'
import Category from './Component/sidebar/Category'
import Sub_Category from "./Component/sidebar/Sub_Category"
import Product from './Component/sidebar/Product'
import Review from "./Component/sidebar/Review"
import EditCategory from './Component/sidebar/EditCategory'

function App() {


  return (
    <>
      <Routes>
          <Route  path='/' element={<Admin_login/>}/>
           <Route path="*" element={<Error />} />  

         
            <Route path='/dashboard' element={<Dashboard/>}> 
                <Route  path='check' element={
                  
                      <Check/>
                    } 
                  />  
                   
                    <Route path='category' element={<Category />}/>


                      <Route path='category/edit/:_id' element={<EditCategory />} />
                    
                  <Route path='sub_category' element={<Sub_Category/>}/>
                  <Route path='product' element={<Product/>}/>
                  <Route path='product_review' element={<Review/>}/>
           </Route>
           
      </Routes>  
    </>
  )
}

export default App
