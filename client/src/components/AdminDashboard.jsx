import React, { useEffect, useState } from "react";
import { BookA, Users, UserCheck, TrendingUp, Calendar, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBorrowedBooks } from "../store/slices/borrowSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  
  const { user } = useSelector((state) => state.auth);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { books } = useSelector((state) => state.book);
  const { users } = useSelector((state) => state.user);
  
  // Calculate real-time stats
  const stats = {
    totalUsers: users?.filter(user => user.role === "User").length || 0,
    totalBooks: books?.length || 0,
    totalAdmins: users?.filter(user => user.role === "Admin").length || 0,
    borrowedBooks: allBorrowedBooks?.filter(book => !book.returnDate).length || 0,
    returnedBooks: allBorrowedBooks?.filter(book => book.returnDate).length || 0
  };

  // Fetch borrowed books data
  useEffect(() => {
    dispatch(getAllBorrowedBooks());
  }, [dispatch]);
  
  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
      setCurrentDate(now.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate pie chart data
  const totalBooks = stats.borrowedBooks + stats.returnedBooks;
  const borrowedPercentage = totalBooks > 0 ? (stats.borrowedBooks / totalBooks) * 100 : 0;
  const returnedPercentage = totalBooks > 0 ? (stats.returnedBooks / totalBooks) * 100 : 0;

  // Pie chart configuration
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const borrowedDashArray = (borrowedPercentage / 100) * circumference;
  const returnedDashArray = (returnedPercentage / 100) * circumference;

  if (user?.role !== "Admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookA className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            Only administrators can access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex items-center gap-3">
          <BookA className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">{currentTime}</p>
            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Statistics Cards */}
        <div className="lg:col-span-1 space-y-6">
          {/* Statistics Cards */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total User Base</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookA className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Book Count</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Admin Count</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAdmins}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Pie Chart */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Statistics</h3>
            
            {/* Pie Chart */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg width="200" height="200" className="transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                  
                  {/* Borrowed books slice */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#374151"
                    strokeWidth="20"
                    strokeDasharray={`${borrowedDashArray} ${circumference}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  
                  {/* Returned books slice */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="20"
                    strokeDasharray={`${returnedDashArray} ${circumference}`}
                    strokeDashoffset={-borrowedDashArray}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{totalBooks}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Total Borrowed Books ({stats.borrowedBooks})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Total Returned Books ({stats.returnedBooks})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Admin Welcome Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center">
              {/* Admin Avatar */}
              <div className="mx-auto mb-4">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={`${user.name} avatar`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {user?.name || "Admin User"}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to your admin dashboard. Here you can manage all the settings and monitor the statistics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Inspirational Quote */}
      <div className="mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <blockquote className="text-center">
            <p className="text-xl font-bold text-gray-900 leading-relaxed mb-4">
              "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character."
            </p>
            <footer className="text-sm text-gray-600">
              ~ BookWorm Team
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
