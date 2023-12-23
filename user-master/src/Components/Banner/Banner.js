import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();
  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Cars</option>
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Tablets">Tablets</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Cars")} >Cars</span>
            <span onClick={()=>setCategory("Cameras & Lenses")} style={{padding : "40px", height: "100px"}}>Cameras & Lenses</span>
            <span onClick={()=>setCategory("Computers & Laptops")} style={{padding : "40px", height: "100px"}}>Computers & Laptops</span>
            <span onClick={()=>setCategory("Mobile Phones")} style={{padding : "40px", height: "100px"}}>Mobile Phones</span>
            <span onClick={()=>setCategory("Motorcycles")} style={{padding : "40px", height: "100px"}}>Motorcycles</span>
            <span onClick={()=>setCategory("Tablets")} style={{padding : "40px", height: "100px"}}>Tablets</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/bannerShop.png" alt="" />
        </div>
      </div>
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;
