import React from 'react';
import { Link } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-fadeIn">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            กรุณาเข้าสู่ระบบ
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            คุณจำเป็นต้องเข้าสู่ระบบก่อนเข้าใช้งานส่วนนี้
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex justify-center items-center px-4 py-2 bg-[#39DB4A] text-white text-sm font-medium rounded-full hover:bg-[#33c442] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39DB4A]"
            >
              เข้าสู่ระบบ
            </Link>
            <button
              onClick={onClose}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39DB4A]"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;