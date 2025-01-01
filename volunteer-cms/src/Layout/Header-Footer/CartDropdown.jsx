import React, { useState } from "react";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const cartItems = [
    { id: 1, name: "ชื่อกิจกรรม 1", time: "3 ชม." },
    { id: 2, name: "ชื่อกิจกรรม 2", time: "2 ชม." },
    { id: 3, name: "ชื่อกิจกรรม 3", time: "1 ชม." },
  ]; 

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button
        onClick={toggleDropdown}
        className="p-1 lg:p-2 rounded-full hover:bg-gray-100 relative"
      >
        <span className="text-lg lg:text-xl">🛒</span>
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 lg:h-5 w-4 lg:w-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-700">กิจกรรม</h3>
            <hr className="my-3 border-gray-200 " /> 
            <div className="mt-4 space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-blue-100 rounded-md"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-600 text-sm">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <Link
              to="/"
              className="w-full bg-green-500 text-white text-center block py-2 rounded-lg hover:bg-green-600"
            >
              บันทึก
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
