import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const LoginForm = () => {
 const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
   username: '',
   password: ''
 });
 const [error, setError] = useState('');

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');

   try {
     const response = await axios.post('http://localhost:5000/api/users/login', formData);

     if (response.data.success) {
       // เก็บ token ไว้ใน localStorage
       localStorage.setItem('token', response.data.token);
       // เก็บข้อมูล user ไว้ใน localStorage
       localStorage.setItem('user', JSON.stringify(response.data.user));

       // ตรวจสอบ role และ redirect
       if (response.data.user.role === 'admin') {
         navigate('/admin');
       } else {
         navigate('/');
       }
     }
   } catch (error) {
     setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
   }
 };

 return (
   <div className="w-full lg:w-[60%] flex items-center justify-center bg-white p-4 sm:p-6 md:p-8">
     <div className="w-full max-w-md space-y-4 sm:space-y-6">
       <h1 className="text-center text-xl sm:text-2xl font-bold text-black">เข้าสู่ระบบ</h1>
       
       {error && (
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
           {error}
         </div>
       )}

       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm text-black">ชื่อผู้ใช้</label>
           <input
             type="text"
             name="username"
             value={formData.username}
             onChange={handleChange}
             className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
             placeholder="ป้อนชื่อผู้ใช้"
             required
           />
         </div>

         <div>
           <label className="block text-sm text-black">รหัสผ่าน</label>
           <div className="relative">
             <input
               type={showPassword ? "text" : "password"}
               name="password"
               value={formData.password}
               onChange={handleChange}
               className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
               placeholder="ป้อนรหัสผ่าน"
               required
             />
             <button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
             >
               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
             </button>
           </div>
           <div className="mt-1 text-right">
             <Link to="/forgot" className="text-sm text-emerald-500 hover:text-emerald-600">
               ลืมรหัสผ่าน?
             </Link>
           </div>
         </div>

         <button
           type="submit"
           className="mt-4 w-full rounded-md bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition duration-200"
         >
           เข้าสู่ระบบ
         </button>

         <div className="mt-4 text-center text-sm">
           ยังไม่ได้ลงทะเบียน?{' '}
           <Link to="/register" className="text-emerald-500 hover:text-emerald-600">
             สร้างบัญชี
           </Link>
         </div>
       </form>
     </div>
   </div>
 );
};

export default LoginForm;