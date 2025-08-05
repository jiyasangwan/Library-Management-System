import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import userIcon from "../assets/user.png";
import settingIcon from "../assets/setting.png";
import blackLogo from "../assets/black-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../store/slices/bookSlice";
import { getMyBorrowedBooks } from "../store/slices/borrowSlice";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const UserDashboard = ({ setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const { borrowedBooks } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getMyBorrowedBooks());
  }, [dispatch]);

  // Calculate user-specific statistics
  const totalBorrowedBooks = borrowedBooks.length;
  const totalReturnedBooks = borrowedBooks.filter(borrow => borrow.returnDate).length;

  const handleCardClick = (component) => {
    if (setSelectedComponent) {
      setSelectedComponent(component);
    }
  };

  return (
    <div className="p-6">
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            handleCardClick("My Borrowed Books");
            // Set the default tab to non-returned books
            localStorage.setItem("borrowedBooksTab", "non-returned");
          }}
        >
          <div className="flex items-center gap-4">
            <img src={bookIcon} alt="Borrowed Books" className="h-12 w-12" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Borrowed Book List</h3>
              <p className="text-sm text-gray-600">View your currently borrowed books</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            handleCardClick("My Borrowed Books");
            // Set the default tab to returned books
            localStorage.setItem("borrowedBooksTab", "returned");
          }}
        >
          <div className="flex items-center gap-4">
            <img src={returnIcon} alt="Returned Books" className="h-12 w-12" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Returned Book List</h3>
              <p className="text-sm text-gray-600">View your returned books history</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleCardClick("Catalog")}
        >
          <div className="flex items-center gap-4">
            <img src={browseIcon} alt="Browse Books" className="h-12 w-12" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Let's browse books inventory</h3>
              <p className="text-sm text-gray-600">Explore available books</p>
            </div>
          </div>
        </div>
      </div>

      {/* Central Logo */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <img src={blackLogo} alt="BookWorm Logo" className="h-16 w-16 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">BookWorm LIBRARY</h2>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <blockquote className="text-center">
          <p className="text-lg text-gray-700 italic mb-4">
            "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character."
          </p>
          <footer className="text-sm text-gray-500">~ BookWorm Team</footer>
        </blockquote>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-700">Total Borrowed Books</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-700">Total Returned Books</span>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <img src={blackLogo} alt="BookWorm Logo" className="h-8 w-8" />
            <h3 className="text-lg font-semibold text-gray-900">Your Reading Stats</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Borrowed Books:</span>
              <span className="font-semibold text-gray-900">{totalBorrowedBooks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Returned Books:</span>
              <span className="font-semibold text-gray-900">{totalReturnedBooks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
