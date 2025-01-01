import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const UserForm = () => {
 const [formData, setFormData] = useState({
   firstName: '',
   lastName: '',
   gender: '',
   email: '',
   faculty: '',
   major: ''
 });
 const [faculties, setFaculties] = useState([]);
 const [majors, setMajors] = useState([]);
 const [isEditing, setIsEditing] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);

 const fetchInitialData = async () => {
   try {
     setIsLoading(true);
     setError(null);

     const facultiesResponse = await api.get('/users/faculties');
     setFaculties(facultiesResponse.data.faculties || []);

     const response = await api.get('/users/profile');
     if (response.data && response.data.user) {
       setFormData({
         firstName: response.data.user.firstName || '',
         lastName: response.data.user.lastName || '',
         gender: response.data.user.gender || '',
         email: response.data.user.email || '',
         faculty: response.data.user.faculty || '',
         major: response.data.user.major || ''
       });
     }

     if (response.data?.user?.faculty) {
       const majorsResponse = await api.get(`/users/faculties/${response.data.user.faculty}/majors`);
       setMajors(majorsResponse.data.majors || []);
     }
   } catch (error) {
     console.error('Error fetching data:', error);
     setError('ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
   } finally {
     setIsLoading(false);
   }
 };

 useEffect(() => {
   fetchInitialData();
 }, []);

 const handleFacultyChange = async (e) => {
   if (!isEditing) return;

   const facultyId = e.target.value;
   setFormData(prev => ({ ...prev, faculty: facultyId, major: '' }));

   if (facultyId) {
     try {
       const response = await api.get(`/users/faculties/${facultyId}/majors`);
       setMajors(response.data.majors);
     } catch (error) {
       console.error('Error fetching majors:', error);
       setError('ไม่สามารถดึงข้อมูลสาขาได้ กรุณาลองใหม่อีกครั้ง');
     }
   } else {
     setMajors([]);
   }
 };

 const handleChange = (e) => {
   if (!isEditing) return;
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setError(null);
    const response = await api.put('/users/profile', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      faculty: formData.faculty,
      major: formData.major
    });

    if (response.data.success) {
      setIsEditing(false);
      // ดึงข้อมูลใหม่หลังอัพเดท
      await fetchInitialData();
    } else {
      setError(response.data.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
  }
};

 const handleCancel = () => {
   setIsEditing(false);
   setError(null);
   fetchInitialData();
 };

 const inputClasses = `w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none 
   ${isEditing 
     ? 'focus:border-[#3BB77E] bg-white' 
     : 'bg-gray-50 cursor-not-allowed'
   }`;

 if (isLoading) {
   return (
     <div className="flex-1 p-8 h-[600px] flex items-center justify-center">
       <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3BB77E] mx-auto mb-4"></div>
         <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
       </div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="flex-1 p-8 h-[600px] flex items-center justify-center">
       <div className="text-center">
         <p className="text-red-600 mb-4">{error}</p>
         <button 
           onClick={() => {
             setError(null);
             fetchInitialData();
           }}
           className="px-4 py-2 bg-[#3BB77E] text-white rounded-lg hover:bg-[#2EA66D]"
         >
           ลองใหม่
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="flex-1 p-8 h-[600px]">
     <h2 className="text-2xl font-bold mb-8">ข้อมูลผู้ใช้</h2>
     <form onSubmit={handleSubmit}>
       <div className="flex flex-col gap-8">
         <div className="grid grid-cols-2 gap-x-8 gap-y-6">
           <div>
             <label className="block text-sm mb-2">ชื่อ</label>
             <input
               type="text"
               name="firstName"
               value={formData.firstName}
               onChange={handleChange}
               className={inputClasses}
               disabled={!isEditing}
             />
           </div>
           
           <div>
             <label className="block text-sm mb-2">นามสกุล</label>
             <input
               type="text"
               name="lastName"
               value={formData.lastName}
               onChange={handleChange}
               className={inputClasses}
               disabled={!isEditing}
             />
           </div>

           <div>
             <label className="block text-sm mb-2">เพศ</label>
             <select
               name="gender"
               value={formData.gender}
               onChange={handleChange}
               className={inputClasses}
               disabled={!isEditing}
             >
               <option value="">ระบุเพศ</option>
               <option value="male">ชาย</option>
               <option value="female">หญิง</option>
             </select>
           </div>

           <div>
             <label className="block text-sm mb-2">อีเมล์</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className={inputClasses}
               disabled={!isEditing}
             />
           </div>

           <div>
             <label className="block text-sm mb-2">คณะ</label>
             <select
               name="faculty"
               value={formData.faculty}
               onChange={handleFacultyChange}
               className={inputClasses}
               disabled={!isEditing}
             >
               <option value="">เลือกคณะ</option>
               {faculties.map(faculty => (
                 <option key={faculty.id} value={faculty.id}>
                   {faculty.name}
                 </option>
               ))}
             </select>
           </div>

           <div>
             <label className="block text-sm mb-2">สาขา</label>
             <select
               name="major"
               value={formData.major}
               onChange={handleChange}
               className={inputClasses}
               disabled={!isEditing || !formData.faculty}
             >
               <option value="">เลือกสาขา</option>
               {majors.map(major => (
                 <option key={major.id} value={major.id}>
                   {major.name}
                 </option>
               ))}
             </select>
           </div>
         </div>

         {error && (
           <div className="text-red-600 text-center text-sm">
             {error}
           </div>
         )}

         <div className="flex justify-center space-x-4">
           {!isEditing ? (
             <button
               type="button"
               onClick={() => setIsEditing(true)}
               className="px-8 py-2.5 bg-[#3BB77E] text-white rounded-lg hover:bg-[#2EA66D] min-w-[120px]"
             >
               แก้ไข
             </button>
           ) : (
             <>
               <button
                 type="button"
                 onClick={handleCancel}
                 className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 min-w-[120px]"
               >
                 ยกเลิก
               </button>
               <button
                 type="submit"
                 className="px-8 py-2.5 bg-[#3BB77E] text-white rounded-lg hover:bg-[#2EA66D] min-w-[120px]"
               >
                 บันทึก
               </button>
             </>
           )}
         </div>
       </div>
     </form>
   </div>
 );
};

export default UserForm;