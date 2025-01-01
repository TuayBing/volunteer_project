import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    province: '',
    district: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">ข้อมูลผู้ใช้</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* ชื่อ */}
          <div>
            <label className="block text-sm mb-1">ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* นามสกุล */}
          <div>
            <label className="block text-sm mb-1">นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* เพศ */}
          <div>
            <label className="block text-sm mb-1">เพศ</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">เลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>

          {/* อีเมล */}
          <div>
            <label className="block text-sm mb-1">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* จังหวัด */}
          <div>
            <label className="block text-sm mb-1">จังหวัด</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">เลือกจังหวัด</option>
              {/* เพิ่มรายการจังหวัด */}
            </select>
          </div>

          {/* อำเภอ */}
          <div>
            <label className="block text-sm mb-1">อำเภอ</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">เลือกอำเภอ</option>
              {/* เพิ่มรายการอำเภอ */}
            </select>
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-[#3BB77E] text-white rounded-lg hover:bg-[#2EA66D]"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;