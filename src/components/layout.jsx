import { Outlet } from "react-router-dom";
import TopUtilityBar from "./top_utility/top_utility";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/footer_choti";

function Layout() {
  return (
    <>
      <TopUtilityBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;