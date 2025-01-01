import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotForm = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full lg:w-[60%] flex items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <h1 className="text-center text-xl sm:text-2xl font-bold text-black">ค้นหาบัญชีของคุณ</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-black">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="กรอกอีเมลของคุณ"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition duration-200"
          >
            รีเซ็ตรหัสผ่าน
          </button>

          <div className="mt-4 text-center text-sm">
            <Link to="/login" className="text-emerald-500 hover:text-emerald-600">
              กลับไปยังหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;
