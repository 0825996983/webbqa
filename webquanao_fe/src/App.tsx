
import "./App.css";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Banner from "./component/Banner";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ListProduct from "./product/ListProduct";
import { useState } from "react";
import ProductDetails from "./product/ProductDetails";
import UserRegistration from "./component/user/UserRegistration";
import ActivateAccount from "./component/user/ActivateAccount";
import Login from "./component/user/Login";
import Blog from "./component/le/Blog";
import ProductForm from "./component/admin/ProductForm";
import { ShoppingContextProvider } from "./component/contexts/ShoppingContext";
import Checkout from "./component/le/Checkout";
import Aboutus from "./component/le/Aboutus";
import Contact from "./component/le/Contact";


function App() {
  const [searchKeyWords, setSearchKeywords] = useState('');

  return (

    <ShoppingContextProvider>
      <BrowserRouter>
      <div >
        <NavBar searchKeywords={searchKeyWords} setSearchKeyWords={setSearchKeywords} />
       
        <Routes>
          {/* Route chính không có tham số id */}
          <Route path="/" element={<Banner />} />
          <Route path="/product" element={<ListProduct searchKeyWords={searchKeyWords} id={0} />} />
          {/* Route có tham số id */}
          <Route path="/:id" element={<ProductWithParams searchKeyWords={searchKeyWords} />} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/product/:id" element={<ProductDetails  />} />
          <Route path="/register" element={<UserRegistration  />} />
          <Route path="/activate/:mail/:activationCode" element={<ActivateAccount  />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/admin/productform" element={<ProductForm />} />
          <Route path="/checkout" element={<Checkout/>} />

          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/contact" element={<Contact/>} />

          
        </Routes>
        </div>
        <Footer />
     
    </BrowserRouter>
    </ShoppingContextProvider>
    
  );
}

// Component để xử lý route có tham số id
function ProductWithParams({ searchKeyWords }: { searchKeyWords: string }) {


  const { id } = useParams<{ id: string }>(); // Lấy id từ URL 
  let idNumber = 0;

  try {
    idNumber = parseInt(id || '', 10); // Chuyển đổi id thành số nguyên
  } catch (error) {
    console.error('Error parsing id:', error);
    idNumber = 0;
  }

  if (Number.isNaN(idNumber)) idNumber = 0;

  return <ListProduct searchKeyWords={searchKeyWords} id={idNumber} />;







}

export default App;
