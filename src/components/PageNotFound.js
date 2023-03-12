import React from "react"
import { Link } from "react-router-dom";
import "../index.css";
const PageNotFound = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  )
}

export default PageNotFound;
