import NewArrivals from "./arrival/NewArrivals";
import BestSellers from "./bestSellers/BestSeller";
import PhilosphyIntro from "../components/philosphy_intro/PhilosphyIntro";
import OurHandicrafts from "../components/handicrafts/OurHandicratfts";
import TalesEmpowerment from "./empowerment/TalesEmpower";
import SubscribeSection from "./updates/updates";
import Slider from "../components/SliderView";

function DemoLogin() {
  return (
    <>
      <Slider />
      <NewArrivals />
      <BestSellers />
      <PhilosphyIntro />
      <OurHandicrafts />
      <TalesEmpowerment />
      <SubscribeSection />
    </>
  );
}

export default DemoLogin;
