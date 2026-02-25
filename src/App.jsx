import { Routes, Route } from "react-router-dom";
import DemoLogin from "./pages/demo_login";
import NextScreen from "./pages/next_demo_screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoLogin />} />
      <Route path="/next-demo-screen" element={<NextScreen />} />
    </Routes>
  );
}

export default App;