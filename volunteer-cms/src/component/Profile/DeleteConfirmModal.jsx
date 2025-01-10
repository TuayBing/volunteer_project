import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
       {/* Close button */}
       <button 
         onClick={onClose}
         className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
       >
         <X className="w-5 h-5 text-gray-500" />
       </button>

       <div className="text-center">
         {/* Warning Icon */}
         <div className="mb-4 flex justify-center">
           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
             <AlertTriangle className="w-6 h-6 text-red-600" />
           </div>
         </div>

         {/* Content */}
         <h3 className="text-lg font-medium text-gray-900 mb-2">
           {title || 'ยืนยันการลบ'}
         </h3>
         <p className="text-sm text-gray-500 mb-6">
           {description || 'คุณต้องการลบกิจกรรมนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้'}
         </p>

         {/* Buttons */}
         <div className="flex flex-col sm:flex-row justify-center gap-3">
           <button
             onClick={onConfirm}
             className="inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
           >
             ยืนยันการลบ
           </button>
           <button
             onClick={onClose}
             className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39DB4A] transition-colors"
           >
             ยกเลิก
           </button>
         </div>
       </div>
     </div>

     {/* Backdrop */}
     <div 
       className="absolute inset-0 bg-black bg-opacity-25"
       onClick={onClose}
     />
   </div>
 );
};

export default DeleteConfirmModal;