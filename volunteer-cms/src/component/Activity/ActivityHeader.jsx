import React from "react";
import { FaSearch } from "react-icons/fa"; 

function ActivityHeader() {
  return (
    <div className="w-full px-4 py-6 mt-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold ">กิจกรรมจิตอาสา</h1>
        <div className="relative mt-2 md:mt-0 w-full md:w-1/4">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Activity Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="w-full h-32 bg-gray-100 border border-dashed border-gray-300 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              ชื่อกิจกรรม
            </h3>
            <p className="text-sm text-[#4A4A4A] mb-4">
              รายละเอียดกิจกรรม
            </p>
            <button className="w-full py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600">
              ดูรายละเอียด
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          1
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          3
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          ...
        </button>
      </div>
    </div>
  );
}

export default ActivityHeader;
