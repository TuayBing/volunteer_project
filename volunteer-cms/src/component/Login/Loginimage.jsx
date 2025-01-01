import React from 'react';

const Loginimage = () => {
  return (
    <div className="hidden lg:flex w-[40%] bg-emerald-500 justify-center items-center">
      <img
        src="/login.svg"
        alt="ภาพประกอบการเข้าสู่ระบบ"
        className="max-w-full h-auto p-4"
      />
    </div>
  );
};

export default Loginimage;