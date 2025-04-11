// /app/page.js
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/sidebar";

// const Map = dynamic(() => import("../components/map/Map"), { ssr: false });
const Map = dynamic(() => import("../components/googlemaps/map"), { ssr: false });


const addressOptions = [
  { value: {lat:35.1414401,lng:-80.9211991,address:"The Edison Arrowood"}, label: "The Edison Arrowood" },
  // { value: {lat:44.976,lng:-93.2719,address:"701 NICOLLET MALL, MINNEAPOLIS, MN 55402"}, label: "701 NICOLLET MALL, MINNEAPOLIS, MN 55402" },
  // { value: {lat:41.4378,lng:-81.6852,address:"456 Park Ave"}, label: "456 Park Ave" },
];
 
export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [categories,setCategories]=useState([]);
  const [selectedAddress, setSelectedAddress] = useState(addressOptions[0]);
  const fetchCategories=async () => {
    const response = await fetch("/data/categories.json");
    
    const data = await response.json();
    setActiveFilters(data)
    setCategories(data)
  }
useEffect(()=>{
  fetchCategories()
},[])
  return (
    <div className="flex h-screen">
      <Sidebar filters={activeFilters} setFilters={setActiveFilters} category={categories} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
      <Map filters={activeFilters} categories={categories} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
    </div>
  );
}