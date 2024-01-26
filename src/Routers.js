import React from "react";
import { BrowserRouter, Routes,Route  } from "react-router-dom";
import App from "./App";
import MyForm from "./components/AddUser";
import UserDetail from "./components/Userdetail";
import LoginPage from "./components/login";
function ApiRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
             <Route path="/adduser" element={<MyForm/>}/> 
             <Route path="/users/:id" element={<UserDetail />} />
             <Route path="/login" element={<LoginPage/>} />
        </Routes>
        
        </BrowserRouter>
    );
}
export default ApiRouter;