import React from 'react';

const SideMenu = ({ activeTab, setActiveTab }) => {
  const buttonClasses = (tabName) => `
    w-full py-2 px-4 text-left border rounded-lg transition-all
    ${activeTab === tabName 
      ? 'text-[#3BB77E] bg-[#3BB77E]/10 border-[#3BB77E]' 
      : 'border-gray-200 hover:border-[#3BB77E] hover:text-[#3BB77E] hover:bg-[#3BB77E]/5'
    }
  `;

  return (
    <div className="w-[250px] p-6 h-full">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium text-3xl mb-3">
          T
        </div>
        <h3 className="text-lg font-medium">ชื่อผู้ใช้</h3>
        <p className="text-sm text-gray-500">นักศึกษา</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={buttonClasses('profile')}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={buttonClasses('activity')}
        >
          บันทึกกิจกรรม
        </button>
        <button
          onClick={() => setActiveTab('certificate')}
          className={buttonClasses('certificate')}
        >
          แฟ้มเก็บเอกสาร
        </button>
      </div>
    </div>
  );
};

export default SideMenu;