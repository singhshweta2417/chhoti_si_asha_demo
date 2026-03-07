import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import DemoLogin from "./pages/demo_login";
import AboutUs from "./pages/about/about_us";
import OurPeople from "./pages/ourPeople";
import BagsScreen from "./pages/bags/bagsScreen";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DemoLogin />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/our_people" element={<OurPeople />} />
        <Route path="/bags" element={<BagsScreen />} />
      </Route>
    </Routes>
  );
}

export default App;