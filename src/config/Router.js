import React from "react"
import {Routes, Route } from "react-router-dom"
import ApplicationForm from "../components/ApplicationForm";
import ApplicationViewer from "../components/ApplicationViewer";
import Home from "../components/Home"
import LookupForm from "../components/LookupApp";
import PageNotFound from "../components/PageNotFound";


const Router = () => (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/apps" element={<ApplicationForm/>}/>
      <Route path="/apps/:id" element={<ApplicationViewer/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  
)

export default Router; 
