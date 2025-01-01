import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full flex items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-xl sm:text-2xl font-bold text-black">
          สนใจติดต่อ
        </h1>
        <p className="text-center text-sm text-gray-600">
          เราอยู่ที่นี่เพื่อคุณ! เราสามารถช่วยได้อย่างไร?
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-black">ชื่อ</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="กรอกชื่อของคุณ"
              />
            </div>

            <div>
              <label className="block text-sm text-black">อีเมล</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="กรอกอีเมล"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-black">ข้อความ</label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="กรอกข้อความของคุณ"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition duration-200"
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
