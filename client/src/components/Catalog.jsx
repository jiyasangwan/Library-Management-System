import React, { useEffect, useState } from "react";
import { BookA, Check, Clock, DollarSign, Calendar, User, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllBorrowedBooks, returnBook } from "../store/slices/borrowSlice";

const Catalog = () => {
  const [activeTab, setActiveTab] = useState("borrowed");
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [showOverdueReturnPopup, setShowOverdueReturnPopup] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allBorrowedBooks, loading: borrowLoading } = useSelector((state) => state.borrow);

  // Fetch real data from API
  useEffect(() => {
    dispatch(getAllBorrowedBooks());
  }, [dispatch]);
  
  // Process borrowed books data
  const processedBorrowedBooks = allBorrowedBooks.map(borrow => ({
    id: borrow._id,
    username: borrow.user.name,
    email: borrow.user.email,
    bookTitle: borrow.book?.title || "Unknown Book",
    price: borrow.price,
    dueDate: new Date(borrow.dueDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    borrowDateTime: new Date(borrow.borrowDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    returnDate: borrow.returnDate,
    returned: borrow.returnDate !== null,
    fine: borrow.fine || 0
  }));
  
  // Create a list of unique users who have borrowed books
  const borrowingUsers = [...new Map(
    processedBorrowedBooks.map(book => [book.email, { name: book.username, email: book.email }])
  ).values()];
  
  // Filter for overdue books
  const today = new Date();
  const overdueBooks = processedBorrowedBooks
    .filter(book => !book.returned)
    .map(book => {
      const dueDate = new Date(book.dueDate.split('/').reverse().join('-'));
      const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
      const fine = daysOverdue > 0 ? daysOverdue * 2 : 0; // $2 per day overdue
      return { ...book, daysOverdue, fine };
    })
    .filter(book => book.daysOverdue > 0);

  const handleReturnBook = (borrow) => {
    setSelectedBorrow(borrow);
    
    // Check if it's overdue
    const today = new Date();
    const dueDate = new Date(borrow.dueDate.split('/').reverse().join('-'));
    const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    
    if (daysOverdue > 0) {
      setShowOverdueReturnPopup(true);
    } else {
      setShowReturnPopup(true);
    }
  };

  const confirmReturn = () => {
    // Call API to return the book
    dispatch(returnBook(selectedBorrow.id))
      .then(() => {
        // Refresh the borrowed books list
        dispatch(getAllBorrowedBooks());
        
        setShowReturnPopup(false);
        setShowOverdueReturnPopup(false);
        setSelectedBorrow(null);
        
        toast.success(`Book "${selectedBorrow.bookTitle}" returned successfully!`);
      })
      .catch((error) => {
        toast.error("Failed to return book. Please try again.");
      });
  };

  const calculateFine = (borrow) => {
    const today = new Date();
    const dueDate = new Date(borrow.dueDate.split('-').reverse().join('-'));
    const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    return daysOverdue > 0 ? daysOverdue * 2 : 0; // $2 per day
  };

  if (user?.role !== "Admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookA className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            Only administrators can access the catalog.
          </p>
        </div>
      </div>
    );
  }

  if (loading || borrowLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BookA className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Borrowed Books Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab("borrowed")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "borrowed"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Borrowed Books
        </button>
        <button
          onClick={() => setActiveTab("overdue")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === "overdue"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Overdue Borrowers
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === "borrowed" ? processedBorrowedBooks : overdueBooks).map((borrow, index) => (
                <tr 
                  key={borrow.id} 
                  className={`hover:bg-gray-50 ${index === (activeTab === "borrowed" ? processedBorrowedBooks : overdueBooks).length - 1 ? "bg-blue-50" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {borrow.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${borrow.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.borrowDateTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {borrow.returned ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <button
                        onClick={() => handleReturnBook(borrow)}
                        className="text-gray-400 hover:text-gray-600 border border-gray-300 rounded p-1 hover:bg-gray-50"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
              
        {(activeTab === "borrowed" ? processedBorrowedBooks : overdueBooks).length === 0 && (
          <div className="text-center py-8">
            <BookA className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {activeTab === "borrowed" ? "No borrowed books" : "No overdue books"}
              </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "borrowed" 
                ? "All books have been returned." 
                : "No books are currently overdue."
              }
            </p>
          </div>
        )}
              </div>
              
      {/* Return Book Popup */}
      {showReturnPopup && selectedBorrow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Return Book</h2>
                <button
                onClick={() => setShowReturnPopup(false)}
                className="text-gray-400 hover:text-gray-600"
                >
                <BookA className="h-6 w-6" />
                </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookA className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedBorrow.bookTitle}</h3>
                    <p className="text-sm text-gray-600">Book returned successfully</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Book Price:</span>
                      <span className="font-medium">${selectedBorrow.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fine:</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">${selectedBorrow.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
                  <button
                onClick={confirmReturn}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                Confirm Return
                  </button>
                  <button
                onClick={() => setShowReturnPopup(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                Cancel
                  </button>
            </div>
          </div>
        </div>
      )}

      {/* Overdue Return Book Popup */}
      {showOverdueReturnPopup && selectedBorrow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Return Overdue Book</h2>
              <button
                onClick={() => setShowOverdueReturnPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Clock className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-red-600" />
              <div>
                    <h3 className="font-semibold text-gray-900">{selectedBorrow.bookTitle}</h3>
                    <p className="text-sm text-red-600">Book is overdue</p>
                  </div>
              </div>
              
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-gray-900 mb-2">Overdue Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{selectedBorrow.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Days Overdue:</span>
                      <span className="font-medium text-red-600">
                        {Math.floor((new Date() - new Date(selectedBorrow.dueDate.split('-').reverse().join('-'))) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
              </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Book Price:</span>
                      <span className="font-medium">${selectedBorrow.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Late Fine:</span>
                      <span className="font-medium text-red-600">
                        ${calculateFine(selectedBorrow)}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-red-600">
                        ${(parseFloat(selectedBorrow.price) + calculateFine(selectedBorrow)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            <div className="flex gap-3 p-6 border-t">
                  <button
                onClick={confirmReturn}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Confirm Return & Pay Fine
                  </button>
                  <button
                onClick={() => setShowOverdueReturnPopup(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                Cancel
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
