import React, { useEffect, useState } from "react";
import { BookA, Calendar, DollarSign, AlertTriangle, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBorrowedBooks } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { borrowedBooks, loading, error } = useSelector((state) => state.borrow);
  
  // Get the active tab from localStorage or default to "non-returned"
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("borrowedBooksTab");
    return savedTab || "non-returned";
  });

  useEffect(() => {
    dispatch(getMyBorrowedBooks());
    
    // Set up an interval to refresh the borrowed books data every 30 seconds
    const interval = setInterval(() => {
      dispatch(getMyBorrowedBooks());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  // Save the active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("borrowedBooksTab", activeTab);
  }, [activeTab]);
  
  // Filter books based on return status
  const returnedBooks = borrowedBooks.filter(book => book.returnDate);
  const nonReturnedBooks = borrowedBooks.filter(book => !book.returnDate);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (dueDate, returnDate) => {
    if (returnDate) return "bg-green-100 text-green-800";
    const daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining < 0) return "bg-red-100 text-red-800";
    if (daysRemaining <= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (dueDate, returnDate) => {
    if (returnDate) return "Returned";
    const daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining < 0) return "Overdue";
    if (daysRemaining <= 3) return "Due Soon";
    return "Active";
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookA className="h-8 w-8 text-purple-600" />
        <h1 className="text-2xl font-bold text-gray-900">My Borrowed Books</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab("non-returned")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "non-returned"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Non-Returned Books
        </button>
        <button
          onClick={() => setActiveTab("returned")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "returned"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Returned Books
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {(activeTab === "returned" ? returnedBooks : nonReturnedBooks).map((borrow) => (
            <div
              key={borrow._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BookA className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {borrow.book?.title || "Book Title Not Available"}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        borrow.dueDate,
                        borrow.returnDate
                      )}`}
                    >
                      {getStatusText(borrow.dueDate, borrow.returnDate)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Borrowed</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(borrow.borrowDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Due Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(borrow.dueDate)}
                        </p>
                      </div>
                    </div>

                    {borrow.returnDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Returned</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(borrow.returnDate)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-medium text-gray-900">
                          ${borrow.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {borrow.fine > 0 && (
                    <div className="flex items-center gap-2 bg-red-50 p-3 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Fine Amount: ${borrow.fine}
                        </p>
                        <p className="text-xs text-red-600">
                          Please pay the fine at the library counter.
                        </p>
                      </div>
                    </div>
                  )}

                  {!borrow.returnDate && getDaysRemaining(borrow.dueDate) < 0 && (
                    <div className="flex items-center gap-2 bg-red-50 p-3 rounded-md mt-3">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          This book is overdue by {Math.abs(getDaysRemaining(borrow.dueDate))} days
                        </p>
                        <p className="text-xs text-red-600">
                          Please return the book as soon as possible to avoid additional fines.
                        </p>
                      </div>
                    </div>
                  )}

                  {!borrow.returnDate && getDaysRemaining(borrow.dueDate) <= 3 && getDaysRemaining(borrow.dueDate) >= 0 && (
                    <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-md mt-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          This book is due in {getDaysRemaining(borrow.dueDate)} days
                        </p>
                        <p className="text-xs text-yellow-600">
                          Please return the book on time to avoid fines.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {(activeTab === "returned" ? returnedBooks : nonReturnedBooks).length === 0 && (
            <div className="text-center py-12">
              <BookA className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {activeTab === "returned" ? "No returned books" : "No borrowed books"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeTab === "returned" 
                  ? "You haven't returned any books yet."
                  : "You haven't borrowed any books yet. Visit the catalog to find interesting books!"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBorrowedBooks;
