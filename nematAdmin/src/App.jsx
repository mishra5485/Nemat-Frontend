
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
import EditSub_Category from './Component/sidebar/EditSub_Category'
import DiscountSlabe from './Component/sidebar/slabs/DiscountSlabe'
import Edit_DiscountSlabe from './Component/sidebar/slabs/Edit_DiscountSlabe'
import QuantityScheme from './Component/sidebar/slabs/QuantityScheme'
import Edit_QuantityScheme from './Component/sidebar/slabs/Edit_QuantityScheme'
import PromoHeader from './Component/sidebar/website/PromoHeader'

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

                    {/* Category with Category Edit after Creation  */}
                    <Route path='category' element={<Category />}/>
                      <Route path='category/edit/:_id' element={<EditCategory />} />
                    
                   {/* Sub_Category with Category Edit after Creation  */}
                  <Route path='sub_category' element={<Sub_Category/>}/>
                    <Route path='sub_category/sub_edit/:_id' element={<EditSub_Category/>}/>

                  <Route path='product' element={<Product/>}/>
                  <Route path='product_review' element={<Review/>}/>
                  
                  <Route path='discountSlabe' element={<DiscountSlabe/>}/>
                    <Route path='discountSlabe/Slabs_edit/:_id' element={<Edit_DiscountSlabe/>}/>

                  <Route path='quantityscheme' element={<QuantityScheme/>}/>
                    <Route path='quantityscheme/scheme_edit/:_id' element={<Edit_QuantityScheme/>}/>

                  <Route path='website/promoHeader' element={<PromoHeader/>}/>
           </Route>
           
      </Routes>  
    </>
  )
}

export default App
