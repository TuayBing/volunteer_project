import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, initCart, clearCart } from '../../store/cartSlice';
import axios from '../../utils/axios';

const CartDropdown = () => {
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const cartItems = useSelector(state => state.cart.items);
 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem('user'));

 useEffect(() => {
   dispatch(initCart());
 }, [dispatch]);

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };

 const handleRemove = (id) => {
   dispatch(removeFromCart(id));
 };

 const handleSaveActivities = async () => {
  try {
    const activitiesToSave = cartItems.map(item => ({
      user_id: user.id,
      name: item.name,
      description: item.description,
      hours: item.hours,
      image_url: item.image_url,
      location: item.location
    }));

    const response = await axios.post('/activities/register', {
      activities: activitiesToSave,
      userid: user.id
    });

    if (response.data.success) {
      dispatch(clearCart());
      setIsDropdownOpen(false);
    }
  } catch (error) {
    console.error('Error saving activities:', error.response?.data || error.message);
  }
};

 const totalHours = cartItems.reduce((sum, item) => sum + item.hours, 0);

 if (!user) return null;

 return (
   <div className="relative">
     <button
       onClick={toggleDropdown}
       className="p-1 lg:p-2 rounded-full hover:bg-gray-100 relative"
     >
       <span className="text-lg lg:text-xl">🛒</span>
       {cartItems.length > 0 && (
         <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 lg:h-5 w-4 lg:w-5 flex items-center justify-center">
           {cartItems.length}
         </span>
       )}
     </button>

     {isDropdownOpen && (
       <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
         <div className="p-4">
           <div className="flex justify-between items-center">
             <h3 className="text-base font-semibold text-gray-700">กิจกรรมที่เลือก</h3>
             <span className="text-sm text-gray-500">รวม {totalHours} ชั่วโมง</span>
           </div>
           
           <hr className="my-3 border-gray-200" />
           
           <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
             {cartItems.length > 0 ? (
               cartItems.map((item) => (
                 <div
                   key={item.id}
                   className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100"
                 >
                   <div className="flex items-center space-x-2">
                     <img
                       src={item.image_url || '/api/placeholder/400/320'}
                       alt={item.name}
                       className="h-10 w-10 object-cover rounded-md"
                     />
                     <div>
                       <p className="text-sm font-medium text-gray-800">{item.name}</p>
                       <p className="text-xs text-gray-500">{item.hours} ชั่วโมง</p>
                     </div>
                   </div>
                   <button
                     onClick={() => handleRemove(item.id)}
                     className="text-red-500 hover:text-red-600 text-sm p-1"
                   >
                     🗑️
                   </button>
                 </div>
               ))
             ) : (
               <div className="text-center py-4 text-gray-500">
                 ยังไม่มีกิจกรรมที่เลือก
               </div>
             )}
           </div>
         </div>

         {cartItems.length > 0 && (
           <div className="p-4 border-t border-gray-100">
             <div className="mb-3 text-sm text-gray-600">
               กิจกรรมทั้งหมด {cartItems.length} กิจกรรม
             </div>
             <button
               onClick={handleSaveActivities}
               className="w-full bg-green-500 text-white text-center block py-2 rounded-lg hover:bg-green-600"
             >
               บันทึกกิจกรรม
             </button>
           </div>
         )}
       </div>
     )}
   </div>
 );
};

export default CartDropdown;