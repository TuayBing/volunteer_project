import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { MoreVertical, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

const ActivityCard = ({ 
  id,
  title, 
  description, 
  hours, 
  date, 
  status, 
  location, 
  image_url,
  onUpdateStatus,
  onDeleteActivity
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'สำเร็จ':
        return 'text-green-500';
      case 'กำลังดำเนินการ':
        return 'text-blue-500';
      case 'ยกเลิก':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getBorderColor = (status) => {
    switch(status) {
      case 'สำเร็จ':
        return 'border-l-green-500';
      case 'กำลังดำเนินการ':
        return 'border-l-blue-500';
      case 'ยกเลิก':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const handleOptionClick = async (action) => {
    if (action === 'delete') {
      setShowDeleteModal(true);
    } else {
      let newStatus;
      if (action === 'complete') {
        newStatus = 'สำเร็จ';
      } else if (action === 'cancel') {
        newStatus = 'ยกเลิก';
      }
    
      if (newStatus) {
        onUpdateStatus(id, newStatus);
      }
    }
    setShowDropdown(false);
  };

  const handleConfirmDelete = () => {
    onDeleteActivity(id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm border-l-4 ${getBorderColor(status)} p-3 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{description}</p>
          </div>
          <div className="flex items-start gap-3 ml-6 flex-shrink-0">
            {image_url && (
              <div className="w-20 h-20">
                <img
                  src={image_url}
                  alt={title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <div className="relative">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                  <div className="py-1">
                    {status !== 'สำเร็จ' && (
                      <button
                        onClick={() => handleOptionClick('complete')}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        ทำกิจกรรมสำเร็จ
                      </button>
                    )}
                    {status !== 'ยกเลิก' && status !== 'สำเร็จ' && (
                      <button
                        onClick={() => handleOptionClick('cancel')}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        ยกเลิกกิจกรรม
                      </button>
                    )}
                    <button
                      onClick={() => handleOptionClick('delete')}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full border-t"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      ลบกิจกรรม
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span>{hours} ชั่วโมง</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">วันที่ลงทะเบียน: {date}</span>
            <span className={getStatusColor(status)}>สถานะ: {status}</span>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="ยืนยันการลบกิจกรรม"
        description="คุณต้องการลบกิจกรรมนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้"
      />
    </>
  );
};
const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    cancelled: 0,
    totalHours: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      const response = await axios.get(`/activities/user/${user.id}`);
      const userActivities = response.data;

      setActivities(userActivities);

      const newStats = userActivities.reduce((acc, activity) => {
        acc.total++;
        acc.totalHours += activity.hours;
        
        switch(activity.status) {
          case 'สำเร็จ':
            acc.completed++;
            break;
          case 'กำลังดำเนินการ':
            acc.inProgress++;
            break;
          case 'ยกเลิก':
            acc.cancelled++;
            break;
          default:
            break;
        }
        return acc;
      }, {
        total: 0,
        completed: 0,
        inProgress: 0,
        cancelled: 0,
        totalHours: 0
      });

      setStats(newStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('ไม่สามารถโหลดข้อมูลกิจกรรมได้');
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (activityId, newStatus) => {
    try {
      const response = await axios.put(`/activities/${activityId}/status`, {
        status: newStatus
      });
  
      if (response.data.success) {
        setActivities(prevActivities => 
          prevActivities.map(activity => 
            activity.id === activityId 
              ? { ...activity, status: newStatus }
              : activity
          )
        );
        fetchActivities();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await axios.delete(`/activities/${activityId}`);
      
      if (response.data.success) {
        // ลบกิจกรรมออกจาก state ทันที
        setActivities(prevActivities => 
          prevActivities.filter(activity => activity.id !== activityId)
        );
        // รีโหลดข้อมูลสถิติ
        fetchActivities();
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-[500px] overflow-hidden">
      <div className="h-full p-4">
        <h2 className="text-xl font-bold mb-4">บันทึกกิจกรรม</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-[calc(100%-40px)]">
          {/* Left side - Activity list */}
          <div className="bg-white rounded-lg border border-gray-100 p-2">
            <div className="h-[420px] overflow-y-auto px-2">
              {activities.map(activity => (
                <ActivityCard 
                  key={activity.id}
                  id={activity.id}
                  title={activity.name}
                  description={activity.description}
                  hours={activity.hours}
                  location={activity.location}
                  image_url={activity.image_url}
                  date={new Date(activity.registered_at).toLocaleDateString('th-TH')}
                  status={activity.status}
                  onUpdateStatus={handleUpdateStatus}
                  onDeleteActivity={handleDeleteActivity}
                />
              ))}
              {activities.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  ยังไม่มีกิจกรรมที่บันทึก
                </div>
              )}
            </div>
          </div>

                  {/* Right side - Stats */}
          <div className="space-y-3 overflow-y-auto h-[420px]">
            {/* Dashboard */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h3 className="text-base font-medium mb-3">Dashboard</h3>
              <div className="grid grid-cols-3 gap-3">
                {/* ทำกิจกรรมสำเร็จ */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100"></div>
                    {calculatePercentage(stats.completed, stats.total) > 0 && (
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-green-500"
                        style={{
                          clipPath: calculatePercentage(stats.completed, stats.total) === 100 
                            ? 'none' 
                            : `polygon(50% 50%, 50% 0%, ${calculatePercentage(stats.completed, stats.total) * 3.6}% 0%)`,
                          transform: 'rotate(-90deg)'
                        }}
                      ></div>
                    )}
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      {calculatePercentage(stats.completed, stats.total)}%
                    </span>
                  </div>
                  <p className="text-xs mt-1">ทำกิจกรรมสำเร็จ</p>
                </div>

                {/* รอดำเนินการ */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100"></div>
                    {calculatePercentage(stats.inProgress, stats.total) > 0 && (
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500"
                        style={{
                          clipPath: calculatePercentage(stats.inProgress, stats.total) === 100 
                            ? 'none' 
                            : `polygon(50% 50%, 50% 0%, ${calculatePercentage(stats.inProgress, stats.total) * 3.6}% 0%)`,
                          transform: 'rotate(-90deg)'
                        }}
                      ></div>
                    )}
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      {calculatePercentage(stats.inProgress, stats.total)}%
                    </span>
                  </div>
                  <p className="text-xs mt-1">รอดำเนินการ</p>
                </div>

                {/* ยกเลิกกิจกรรม */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100"></div>
                    {calculatePercentage(stats.cancelled, stats.total) > 0 && (
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-red-500"
                        style={{
                          clipPath: calculatePercentage(stats.cancelled, stats.total) === 100 
                            ? 'none' 
                            : `polygon(50% 50%, 50% 0%, ${calculatePercentage(stats.cancelled, stats.total) * 3.6}% 0%)`,
                          transform: 'rotate(-90deg)'
                        }}
                      ></div>
                    )}
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      {calculatePercentage(stats.cancelled, stats.total)}%
                    </span>
                  </div>
                  <p className="text-xs mt-1">ยกเลิกกิจกรรม</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h3 className="text-base font-medium mb-3">สถานะ</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนกิจกรรมที่ทั้งหมด</span>
                  <span className="font-medium">{stats.total} กิจกรรม</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนกิจกรรมที่สำเร็จ</span>
                  <span className="font-medium">{stats.completed} กิจกรรม</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนกิจกรรมที่กำลังดำเนินการ</span>
                  <span className="font-medium">{stats.inProgress} กิจกรรม</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนกิจกรรมที่ถูกยกเลิก</span>
                  <span className="font-medium">{stats.cancelled} กิจกรรม</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนชั่วโมง</span>
                  <span className="font-medium">{stats.totalHours} ชั่วโมง</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;