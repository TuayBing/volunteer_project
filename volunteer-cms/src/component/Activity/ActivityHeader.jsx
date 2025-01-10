import React, { useState, useEffect } from "react";
import { Search, Clock } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import axios from '../../utils/axios';
import AuthModal from '../../Layout/Modal/AuthModal';

function ActivityHeader() {
 const [activities, setActivities] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [showAuthModal, setShowAuthModal] = useState(false);
 const [selectedActivity, setSelectedActivity] = useState(null);
 const dispatch = useDispatch();

 useEffect(() => {
   fetchActivities();
 }, []);

 const fetchActivities = async () => {
   try {
     const response = await axios.get('/activities');
     setActivities(response.data);
     setLoading(false);
   } catch (error) {
     setError(error.response?.data?.message || 'Failed to fetch activities');
     setLoading(false);
   }
 };

 const handleActivityClick = (activity) => {
   const user = JSON.parse(localStorage.getItem('user'));
   if (!user) {
     setSelectedActivity(activity);
     setShowAuthModal(true);
   } else {
     dispatch(addToCart(activity));
   }
 };

 return (
   <>
     <div className="w-full px-4 py-6 mt-4 relative">
       <div className="flex flex-wrap items-center justify-between mb-6">
         <h1 className="text-2xl font-bold">กิจกรรมจิตอาสา</h1>
         <div className="relative mt-2 md:mt-0 md:w-64">
           <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
           <input
             type="text"
             placeholder="ค้นหา..."
             className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
           />
         </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {activities.map((activity) => (
           <div
             key={activity.id}
             className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
           >
             <img
               src={activity.image_url || '/api/placeholder/400/320'}                    
               alt={activity.name}
               className="w-full h-32 object-cover rounded-lg mb-4"
             />
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-lg font-semibold text-gray-700">
                 {activity.name}
               </h3>
               <div className="flex items-center text-gray-600">
                 <Clock className="h-4 w-4 mr-1" />
                 <span className="text-sm">{activity.hours} ชั่วโมง</span>
               </div>
             </div>
             <p className="text-sm text-[#4A4A4A] mb-4">
               {activity.description}
             </p>
             <button 
               onClick={() => handleActivityClick(activity)}
               className="w-full py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
             >
               บันทึกกิจกรรม
             </button>
           </div>
         ))}
       </div>

       <div className="flex justify-center mt-6 space-x-2">
         <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">1</button>
         <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">2</button>
         <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">3</button>
         <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">...</button>
       </div>
     </div>

     <AuthModal 
       isOpen={showAuthModal} 
       onClose={() => setShowAuthModal(false)}
       activity={selectedActivity}
     />
   </>
 );
}

export default ActivityHeader;