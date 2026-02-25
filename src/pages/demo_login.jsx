import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopUtilityBar from "../components/top_utility/top_utility";
import Navbar from "../components/navbar/Navbar";
import Slider from "../components/SliderView";
import NewArrivals from "./arrival/NewArrivals";
import BestSellers from "./bestSellers/BestSeller";
import PhilosphyIntro from "../components/philosphy_intro/PhilosphyIntro";

function DemoLogin() {
 return (
  <>
    <TopUtilityBar />
    <Navbar/>
    <Slider/>
    <NewArrivals/>
    <BestSellers/>
    <PhilosphyIntro/>
  </>
);
}

export default DemoLogin;


