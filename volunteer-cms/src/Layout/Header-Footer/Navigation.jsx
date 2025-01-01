import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartDropdown from "./CartDropdown"; 
import UserMenu from "./UserMenu";

const TIMEOUT_DURATION = 5 * 60 * 1000; 

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setLastActivity(Date.now());
    }
  }, []);

  // Auto logout functionality
  useEffect(() => {
    const resetTimer = () => {
      if (user) {
        setLastActivity(Date.now());
      }
    };

    const checkInactivity = () => {
      if (user && Date.now() - lastActivity > TIMEOUT_DURATION) {
        handleLogout();
      }
    };

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    const inactivityTimer = setInterval(checkInactivity, 1000);

    window.addEventListener('beforeunload', handleLogout);

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
      clearInterval(inactivityTimer);
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, [user, lastActivity]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-[140px]">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Volunteer Logo"
                className="h-[120px] md:h-[150px] w-auto mt-4"
              />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 mx-auto">
            <Link
              to="/"
              className={`text-[#272727] text-sm lg:text-base font-medium px-2 lg:px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "border-b-2 border-[#39DB4A]" : "hover:text-[#39DB4A]"
              }`}
            >
              หน้าแรก
            </Link>
            <Link
              to="/activity"
              className={`text-[#272727] text-sm lg:text-base font-medium px-2 lg:px-3 py-2 rounded-md transition-colors ${
                isActive("/activity") ? "border-b-2 border-[#39DB4A]" : "hover:text-[#39DB4A]"
              }`}
            >
              กิจกรรม
            </Link>
            {user?.role === 'admin' ? (
              <Link
                to="/admin"
                className={`text-[#272727] text-sm lg:text-base font-medium px-2 lg:px-3 py-2 rounded-md transition-colors ${
                  isActive("/admin") ? "border-b-2 border-[#39DB4A]" : "hover:text-[#39DB4A]"
                }`}
              >
                จัดการระบบ
              </Link>
            ) : (
              <Link
                to="/profile"
                className={`text-[#272727] text-sm lg:text-base font-medium px-2 lg:px-3 py-2 rounded-md transition-colors ${
                  isActive("/profile") ? "border-b-2 border-[#39DB4A]" : "hover:text-[#39DB4A]"
                }`}
              >
                โปรไฟล์
              </Link>
            )}
            <Link
              to="/contact"
              className={`text-[#272727] text-sm lg:text-base font-medium px-2 lg:px-3 py-2 rounded-md transition-colors ${
                isActive("/contact") ? "border-b-2 border-[#39DB4A]" : "hover:text-[#39DB4A]"
              }`}
            >
              ติดต่อเรา
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <button className="p-1 lg:p-2 rounded-full hover:bg-gray-100">
              <span className="text-lg lg:text-xl">🔔</span>
            </button>
            <CartDropdown />
            {user ? (
              <UserMenu 
                user={user} 
                isOpen={isProfileDropdownOpen} 
                setIsOpen={setIsProfileDropdownOpen}
              />
            ) : (
              <Link
                to="/login"
                className="bg-[#39DB4A] text-white px-4 lg:px-6 py-1.5 lg:py-2 text-sm lg:text-base rounded-full hover:bg-[#33c442] transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <span className="text-xl">{isMobileMenuOpen ? "✖" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/") ? "text-[#39DB4A]" : "hover:text-[#39DB4A]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            หน้าแรก
          </Link>
          <Link
            to="/activity"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/activity") ? "text-[#39DB4A]" : "hover:text-[#39DB4A]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            กิจกรรม
          </Link>
          {user?.role === 'admin' ? (
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/admin") ? "text-[#39DB4A]" : "hover:text-[#39DB4A]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              จัดการระบบ
            </Link>
          ) : (
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/profile") ? "text-[#39DB4A]" : "hover:text-[#39DB4A]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              โปรไฟล์
            </Link>
          )}
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/contact") ? "text-[#39DB4A]" : "hover:text-[#39DB4A]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ติดต่อเรา
          </Link>

          {/* Mobile user menu */}
          {user ? (
            <>
              <hr className="my-2" />
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.username}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm font-medium hover:text-red-700"
                >
                  ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 text-center bg-[#39DB4A] text-white rounded-md hover:bg-[#33c442]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;