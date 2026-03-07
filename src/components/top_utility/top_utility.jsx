import { FiPhone, FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

function TopUtilityBar() {
  return (
    <div className="w-full bg-black text-white text-sm py-2 px-6 flex gap-4 items-center">

      <div className="flex items-center gap-2">
        <FiPhone className="text-white-400 " />
        <span>+91 98765 43210</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-blue-500 transition">
          <FiFacebook className="text-white-400 " />
        </a>
        <a href="#" className="hover:text-pink-500 transition">
          <FiInstagram /> </a>
        <a href="#" className="hover:text-pink-500 transition">
          <FiLinkedin /> </a>
        <a href="#" className="hover:text-pink-500 transition">
          <FiYoutube /> </a>
      </div>
    </div>
  );
}

export default TopUtilityBar;