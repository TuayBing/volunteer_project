import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = ({ user, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700">{user?.username}</span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">{user?.username}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Link
              to="/profile"
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              ตั้งค่าโปรไฟล์
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-md mt-1"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;