const SuccessRegister = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50"></div>
        
        {/* Modal */}
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center z-50">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
  
          {/* Text */}
          <h2 className="text-xl font-semibold mb-2">สำเร็จ!</h2>
          <p className="text-gray-600 mb-6">
            ลงทะเบียนบัญชีผู้ใช้เรียบร้อยแล้ว
          </p>
  
          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    );
  };
  
  export default SuccessRegister;