import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter,
  Download,
  BookOpen
} from 'lucide-react';
import LibraryHeroImage from '../assets/images/LibraryHeroImage.jpg';
import MemberLayout from './MemberLayout';
import BookCard from './BookCard';
import Modal from '../components/Modal';
import MyBorrowingStatus from '../components/MyBorrowingStatus';
import { getBooks } from '../services/bookService';
import { getCategories } from '../services/categoryService';

// Base URL for backend assets
const ASSET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const MemberPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFilter, setActiveCategory] = useState('All');
  // Modal state for book details
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Loading and error state for async book fetch
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [booksData, categoriesData] = await Promise.all([
          getBooks(),
          getCategories()
        ]);
        
        setCategories(categoriesData);
        
        const catMap = {};
        categoriesData.forEach(c => catMap[c.category_id] = c.category_name);

        const mappedBooks = booksData.map(b => ({
          id: b.book_id,
          title: b.title,
          author: b.author,
          category: catMap[b.category_id] || 'Uncategorized',
          status: b.available_copies > 0 ? 'available' : 'borrowed',
          fine_per_day: 500, 
          createdAt: b.created_at,
          cover_url: b.cover_url ? `${ASSET_URL}${b.cover_url}` : null,
          description: b.description,
          file_url: b.book_file_url ? `${ASSET_URL}${b.book_file_url}` : null
        }));

        setBooks(mappedBooks);
      } catch (err) {
        setError('Failed to fetch library resources.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Enhanced filter logic for 'Available' and 'Recently Added'
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // State for borrowing status toggle
  const [showMyBorrowing, setShowMyBorrowing] = useState(false);

  let filteredBooks = books.filter(b =>
    (selectedCategory === 'All' || b.category === selectedCategory) &&
    (b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (activeFilter === 'Available') {
    filteredBooks = filteredBooks.filter(b => b.status === 'available');
  } else if (activeFilter === 'Recently Added') {
    filteredBooks = filteredBooks
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5); // Show 5 most recent books
  } else {
    // Default: sort so available books come first
    filteredBooks = filteredBooks.sort((a, b) => {
      if (a.status === 'available' && b.status !== 'available') return -1;
      if (a.status !== 'available' && b.status === 'available') return 1;
      return 0;
    });
  }

  // Pagination logic (skip for 'Recently Added' which is always 5 or less)
  const totalPages = activeFilter === 'Recently Added' ? 1 : Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = activeFilter === 'Recently Added'
    ? filteredBooks
    : filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  return (
    <MemberLayout>
      {/* Hero Section with Search */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src={LibraryHeroImage}
            alt="Library Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 dark:to-slate-950 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 text-center space-y-12 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-6xl lg:text-5xl font-black text-white mt-12 mb-4 tracking-tight md:tracking-wider leading-tight">
              Explore the Universe of Knowledge
            </h1>
            <p className="text-sm md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed opacity-90 px-4">
              Access thousands of academic resources, research journals, and local literature at your fingertips.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="bg-white/95 dark:bg-slate-900/95 p-2 rounded-3xl md:rounded-full shadow-2xl shadow-sky-900/20 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto ring-1 ring-white/20 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by title, author, or ISBN..." 
                className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 bg-transparent border-none focus:ring-0 focus:outline-none text-base md:text-lg font-medium placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-14 w-[1px] bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
            <div className="relative md:min-w-[180px] border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select 
                className="w-full h-14 pl-10 pr-8 bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 appearance-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <button 
              aria-label="Search"
              className="h-12 md:h-14 w-full md:w-14 flex-shrink-0 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl md:rounded-full flex items-center justify-center transition-all shadow-lg shadow-sky-600/20 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Dashboard - New Adjustments */}
      {/*<div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-full shadow-xl border border-slate-100 dark:border-slate-800 py-6 px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Loans</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">3 Books</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-l-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Fines</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">UGX 2,500</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Due Soon</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">1 Item</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Browse Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* My Borrowing Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowMyBorrowing(!showMyBorrowing)}
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-smooth flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
          >
            <BookOpen className="w-5 h-5" />
            {showMyBorrowing ? 'Hide' : 'Show'} My Borrowing Status
          </button>
        </div>

        {/* My Borrowing Status Section */}
        {showMyBorrowing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-200 dark:border-sky-800"
          >
            <MyBorrowingStatus />
          </motion.div>
        )}

        {/* Browse Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {searchQuery ? `Search Results (${filteredBooks.length})` : 'Explore the Catalog'}
            </h2>
            <p className="text-slate-500 font-medium mt-1">Discover academic resources and literature at your convenience.</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Available', 'Recently Added'].map(tag => (
              <button 
                key={tag} 
                onClick={() => setActiveCategory(tag)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all ${
                  activeFilter === tag 
                    ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-600/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-600 hover:text-sky-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Loading/Error/Skeleton States */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl h-64 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="py-24 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-rose-200 dark:border-rose-800 shadow-inner">
            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-800 rounded-full flex items-center justify-center mx-auto">
              <span className="text-rose-400 text-4xl">!</span>
            </div>
            <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300">{error}</h3>
            <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-full font-bold text-xs bg-sky-600 text-white hover:bg-sky-700 transition-all mt-4">Retry</button>
          </div>
        ) : (
          <motion.div 
            layoutId="book-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {paginatedBooks.map(book => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                  className="cursor-pointer"
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Book Details Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {selectedBook && (
            <div className="max-w-md w-full">
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{selectedBook.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-1">By <span className="font-semibold">{selectedBook.author}</span></p>
              <p className="text-xs text-slate-400 mb-4">Category: {selectedBook.category}</p>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mr-2 uppercase ${selectedBook.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{selectedBook.status}</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700">UGX {selectedBook.fine_per_day} / day</span>
              </div>
              {/* Book description or reviews */}
              <p className="text-slate-500 dark:text-slate-400 mb-6">{selectedBook.description || 'No description available for this title.'}</p>
              <div className="flex justify-end gap-2">
                {selectedBook.file_url && (
                  <a
                    href={selectedBook.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-6 py-2 rounded-full font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                )}
                {selectedBook.status === 'available' ? (
                  <button
                    className="px-6 py-2 rounded-full font-bold text-xs bg-sky-600 text-white hover:bg-sky-700 transition-all"
                    onClick={() => alert('Borrowed!')}
                  >
                    Borrow
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 rounded-full font-bold text-xs bg-amber-500 text-white hover:bg-amber-600 transition-all"
                    onClick={() => alert('Reserved!')}
                  >
                    Reserve
                  </button>
                )}
                <button
                  className="px-4 py-2 rounded-full font-bold text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              className="px-4 py-2 rounded-full font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-full font-bold text-xs border transition-all ${
                  currentPage === i + 1
                    ? 'bg-sky-600 border-sky-600 text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-600 hover:text-sky-600'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 rounded-full font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="py-24 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No matches found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any resources matching your search. Try broadening your keywords.</p>
          </div>
        )}
      </main>
    </MemberLayout>
  );
};

export default MemberPortal;