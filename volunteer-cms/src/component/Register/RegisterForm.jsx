import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import SuccessRegisterModal from './SuccessRegister';

const RegisterForm = () => {
 const navigate = useNavigate();
 const [showSuccessModal, setShowSuccessModal] = useState(false);
 const [formData, setFormData] = useState({
   username: '',
   email: '',
   password: '',
   confirmPassword: '',
   firstName: '',
   lastName: '',
   phoneNumber: ''
 });

 const [validations, setValidations] = useState({
   username: { isValid: false, message: '' },
   email: { isValid: false, message: '' },
   password: {
     length: false,
     hasLetter: false
   },
   confirmPassword: { isValid: false, message: '' },
   phoneNumber: { isValid: false, message: '' }
 });

 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 // Password validation rules
 const validatePassword = (password) => {
   return {
     length: password.length >= 8,
     hasLetter: /[a-zA-Z]/.test(password)
   };
 };

 // Email validation
 const validateEmail = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
 };

 // Phone validation
 const validatePhone = (phone) => {
   const phoneRegex = /^[0-9]{10}$/;
   return phoneRegex.test(phone);
 };

 // Username validation
 const validateUsername = (username) => {
   return username.length >= 3;
 };

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));

   // Real-time validation
   switch(name) {
     case 'username':
       setValidations(prev => ({
         ...prev,
         username: {
           isValid: validateUsername(value),
           message: validateUsername(value) ? '' : 'ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร'
         }
       }));
       break;

     case 'password':
       setValidations(prev => ({
         ...prev,
         password: validatePassword(value)
       }));
       // Update confirm password validation
       if (formData.confirmPassword) {
         setValidations(prev => ({
           ...prev,
           confirmPassword: {
             isValid: value === formData.confirmPassword,
             message: value === formData.confirmPassword ? '' : 'รหัสผ่านไม่ตรงกัน'
           }
         }));
       }
       break;

     case 'confirmPassword':
       setValidations(prev => ({
         ...prev,
         confirmPassword: {
           isValid: value === formData.password,
           message: value === formData.password ? '' : 'รหัสผ่านไม่ตรงกัน'
         }
       }));
       break;

     case 'email':
       setValidations(prev => ({
         ...prev,
         email: {
           isValid: validateEmail(value),
           message: validateEmail(value) ? '' : 'รูปแบบอีเมลไม่ถูกต้อง'
         }
       }));
       break;

     case 'phoneNumber':
       if (value) {
         setValidations(prev => ({
           ...prev,
           phoneNumber: {
             isValid: validatePhone(value),
             message: validatePhone(value) ? '' : 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก'
           }
         }));
       } else {
         setValidations(prev => ({
           ...prev,
           phoneNumber: { isValid: true, message: '' }
         }));
       }
       break;
   }
 };

 const ValidationItem = ({ isValid, text }) => (
   <div className="flex items-center gap-2 text-sm">
     {isValid ? 
       <CheckCircle className="w-4 h-4 text-green-500" /> : 
       <XCircle className="w-4 h-4 text-red-500" />}
     <span className={isValid ? 'text-green-500' : 'text-red-500'}>{text}</span>
   </div>
 );

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Validate all required fields
   if (!formData.username || !formData.email || !formData.password || 
       !formData.confirmPassword || !formData.firstName || !formData.lastName) {
     alert('กรุณากรอกข้อมูลให้ครบถ้วน');
     return;
   }

   // Check password validations
   const passwordChecks = Object.values(validations.password);
   if (!passwordChecks.every(Boolean)) {
     alert('กรุณากรอกรหัสผ่านให้ตรงตามเงื่อนไข');
     return;
   }

   try {
     const response = await axios.post('http://localhost:5000/api/users/register', {
       username: formData.username,
       email: formData.email,
       password: formData.password,
       firstName: formData.firstName,
       lastName: formData.lastName,
       phoneNumber: formData.phoneNumber || null
     });

     if (response.data.success) {
       setShowSuccessModal(true);
     }
   } catch (error) {
     alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
   }
 };

 const handleCloseSuccessModal = () => {
   setShowSuccessModal(false);
   navigate('/login');
 };

 return (
   <>
     <div className="w-full lg:w-[60%] flex items-center justify-center bg-white p-4 sm:p-6 md:p-8">
       <div className="w-full max-w-md space-y-4 sm:space-y-6">
         <h1 className="text-center text-xl sm:text-2xl font-bold text-black">ลงทะเบียน</h1>
         
         <form onSubmit={handleSubmit} className="space-y-4">
           {/* Username field */}
           <div>
             <label className="block text-sm text-black mb-1">ชื่อผู้ใช้</label>
             <input
               type="text"
               name="username"
               value={formData.username}
               onChange={handleChange}
               className={`w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 ${
                 formData.username && !validations.username.isValid 
                   ? 'ring-2 ring-red-500' 
                   : 'focus:ring-emerald-500'
               }`}
               required
             />
             {formData.username && !validations.username.isValid && (
               <p className="mt-1 text-sm text-red-500">{validations.username.message}</p>
             )}
           </div>

           {/* Email field */}
           <div>
             <label className="block text-sm text-black mb-1">อีเมล</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className={`w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 ${
                 formData.email && !validations.email.isValid 
                   ? 'ring-2 ring-red-500' 
                   : 'focus:ring-emerald-500'
               }`}
               required
             />
             {formData.email && !validations.email.isValid && (
               <p className="mt-1 text-sm text-red-500">{validations.email.message}</p>
             )}
           </div>

           {/* First Name field */}
           <div>
             <label className="block text-sm text-black mb-1">ชื่อจริง</label>
             <input
               type="text"
               name="firstName"
               value={formData.firstName}
               onChange={handleChange}
               className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
               required
             />
           </div>

           {/* Last Name field */}
           <div>
             <label className="block text-sm text-black mb-1">นามสกุล</label>
             <input
               type="text"
               name="lastName"
               value={formData.lastName}
               onChange={handleChange}
               className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
               required
             />
           </div>

           {/* Phone Number field */}
           <div>
             <label className="block text-sm text-black mb-1">เบอร์โทรศัพท์</label>
             <input
               type="tel"
               name="phoneNumber"
               value={formData.phoneNumber}
               onChange={handleChange}
               className={`w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 ${
                 formData.phoneNumber && !validations.phoneNumber.isValid 
                   ? 'ring-2 ring-red-500' 
                   : 'focus:ring-emerald-500'
               }`}
             />
             {formData.phoneNumber && !validations.phoneNumber.isValid && (
               <p className="mt-1 text-sm text-red-500">{validations.phoneNumber.message}</p>
             )}
           </div>

           {/* Password field */}
           <div>
             <label className="block text-sm text-black mb-1">รหัสผ่าน</label>
             <div className="relative">
               <input
                 type={showPassword ? "text" : "password"}
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
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
             <div className="mt-2 space-y-1">
               <ValidationItem isValid={validations.password.length} text="อย่างน้อย 8 ตัวอักษร" />
               <ValidationItem isValid={validations.password.hasLetter} text="มีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว" />
             </div>
           </div>

           {/* Confirm Password field */}
           <div>
             <label className="block text-sm text-black mb-1">ยืนยันรหัสผ่าน</label>
             <div className="relative">
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 name="confirmPassword"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 className={`w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:ring-2 ${
                   formData.confirmPassword && !validations.confirmPassword.isValid 
                     ? 'ring-2 ring-red-500' 
                     : 'focus:ring-emerald-500'
                 }`}
                 required
               />
               <button
                 type="button"
                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
               >
                 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
               </button>
             </div>
             {formData.confirmPassword && !validations.confirmPassword.isValid && (
               <p className="mt-1 text-sm text-red-500">{validations.confirmPassword.message}</p>
             )}
           </div>

           {/* Submit button */}
           <button
             type="submit"
             className="w-full rounded-md bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition duration-200"
           >
             ลงทะเบียน
           </button>
         </form>

         <div className="text-center text-sm">
           มีบัญชีผู้ใช้อยู่แล้ว?{' '}
           <Link to="/login" className="text-emerald-500 hover:text-emerald-600">
             เข้าสู่ระบบ
           </Link>
         </div>
       </div>
     </div>

     {/* Success Modal */}
     <SuccessRegisterModal 
       isOpen={showSuccessModal} 
       onClose={handleCloseSuccessModal} 
     />
   </>
 );
};

export default RegisterForm;