import React, { useState } from 'react';
import Banner from './Banner';
import SideMenu from './SideMenu';
import UserForm from './UserForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const ActivityLog = () => {
    return (
      <div className="flex-1 p-8 h-[500px]">
        <h2 className="text-2xl font-bold mb-8">บันทึกกิจกรรม</h2>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="h-[480px]"></div>
          </div>
        </div>
      </div>
    );
  };

  const Documents = () => {
    return (
      <div className="flex-1 p-8 h-[500px]">
        <h2 className="text-2xl font-bold mb-8">แฟ้มเก็บเอกสาร</h2>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="h-[480px]"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Banner />
      <div className="relative -mt-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-[280px] bg-white shadow-lg rounded-2xl h-[500px]">
              <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="w-[850px] bg-white shadow-lg rounded-2xl h-[500px]">
              {activeTab === 'profile' && <UserForm />}
              {activeTab === 'activity' && <ActivityLog />}
              {activeTab === 'certificate' && <Documents />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;