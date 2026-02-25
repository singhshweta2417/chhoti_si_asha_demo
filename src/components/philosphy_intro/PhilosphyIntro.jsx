import { useState } from "react";

function PhilosphyIntro() {
    const imageFree = "https://chhotisiasha.org/cdn/shop/files/Our_Philosophy_3.jpg?v=1683773690&width=940";
  return (
    <div className="max-w-auto flex  items-center justify-center px-8 gap-4 py-12 bg-[#F5F5F5]">
      
      <div className=" gap-6">
        <img
          src={imageFree}
          alt="Our Philosophy"
          className="h-180 max-w-3xl rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="text-center items-center justify-center">
        <h className=" text-xl font-medium text-gray-800">
          Our Philosophy
        </h>
        <p className="text-justify font-light text-gray-800 max-w-3xl mx-auto">
          Our mission at Chhoti Si Asha is to create indigenous handicrafts-based livelihoods for women artisans. Each handmade item is a unique masterpiece, crafted with love and care using traditional techniques. From colorful bags to home decoration accessories, our products are a testament to the skill and creativity of our artisans. We strive to be a socially responsible business that not only creates beautiful products but also makes a positive impact on the lives of our artisans and the communities in which we operate.
        </p>
      </div>
    </div>
  );
}

export default PhilosphyIntro;