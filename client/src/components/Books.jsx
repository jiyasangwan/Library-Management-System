import React, { useEffect, useState } from "react";
import { BookA, Search, Filter, Eye, Clock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { toast } from "react-toastify";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState("title");

  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetBookSlice());
    }
  }, [dispatch, error]);

  // Filter and sort books
  const filteredBooks = books
    .filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "price":
          return parseFloat(a.price) - parseFloat(b.price);
        default:
          return 0;
      }
    });

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowBookDetails(true);
  };

  const handleBorrowBook = (book) => {
    // TODO: Implement borrow functionality
    toast.info("Borrow functionality will be implemented soon!");
  };

  const categories = ["all", "fiction", "non-fiction", "science", "history", "biography", "technology"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Library Catalog</h1>
        <p className="text-gray-600">Browse and discover books in our collection</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {/* Book Cover */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <BookA className="h-16 w-16 text-blue-600" />
            </div>

            {/* Book Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-2">by {book.author}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-600 font-semibold">${book.price}</span>
                <span className="text-sm text-gray-500">
                  {book.quantity} available
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(book)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Details
                </button>
                <button
                  onClick={() => handleBorrowBook(book)}
                  disabled={book.quantity === 0}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Clock className="h-4 w-4" />
                  Borrow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Books Found */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookA className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      {/* Book Details Modal */}
      {showBookDetails && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedBook.title}</h2>
                <button
                  onClick={() => setShowBookDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Cover */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-64 flex items-center justify-center">
                  <BookA className="h-20 w-20 text-blue-600" />
                </div>

                {/* Book Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Author</h3>
                    <p className="text-gray-600">{selectedBook.author}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Description</h3>
                    <p className="text-gray-600">{selectedBook.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Price</h3>
                      <p className="text-green-600 font-semibold">${selectedBook.price}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Available</h3>
                      <p className="text-gray-600">{selectedBook.quantity} copies</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBorrowBook(selectedBook)}
                    disabled={selectedBook.quantity === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Clock className="h-5 w-5" />
                    {selectedBook.quantity === 0 ? "Not Available" : "Borrow This Book"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books; 