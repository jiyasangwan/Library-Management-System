import React from "react";
import { useSelector } from "react-redux";
import { Shield, User, BookA, Users } from "lucide-react";

const TestComponent = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Authenticated</h2>
          <p className="text-gray-600">Please log in to access the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          {user?.role === "Admin" ? (
            <Shield className="h-8 w-8 text-purple-600" />
          ) : (
            <User className="h-8 w-8 text-blue-600" />
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">User Information</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {user?.name}</p>
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Role:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  user?.role === "Admin" 
                    ? "bg-purple-100 text-purple-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {user?.role}
                </span>
              </p>
              <p><span className="font-medium">Verified:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  user?.accountVerified 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {user?.accountVerified ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Authentication Status</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Authenticated:</span> 
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  isAuthenticated 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {isAuthenticated ? "Yes" : "No"}
                </span>
              </p>
              <p><span className="font-medium">User ID:</span> {user?._id}</p>
              <p><span className="font-medium">Joined:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Available Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <BookA className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Browse Catalog</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <BookA className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">My Borrowed Books</span>
            </div>

            {user?.role === "Admin" && (
              <>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <BookA className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Book Management</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium">User Management</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium">Admin Dashboard</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Test Credentials</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Admin User:</strong> admin@library.com / admin123</p>
            <p><strong>Regular User:</strong> Register a new account to test user functionality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent; 