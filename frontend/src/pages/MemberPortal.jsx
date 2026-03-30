import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter
} from 'lucide-react';
import MemberLayout from './MemberLayout';
import BookCard from './BookCard';

const MemberPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFilter, setActiveCategory] = useState('All');

  // Added createdAt field for sorting by 'Recently Added'
  const books = [
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Fiction', status: 'Available', fine_per_day: 500, createdAt: '2026-03-01' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', status: 'Borrowed', fine_per_day: 1000, createdAt: '2026-03-20' },
    { id: 3, title: 'Kintu', author: 'Jennifer Makumbi', category: 'Fiction', status: 'Available', fine_per_day: 500, createdAt: '2026-03-25' },
    { id: 4, title: 'The River Between', author: 'Ngũgĩ wa Thiong\'o', category: 'Academic', status: 'Available', fine_per_day: 700, createdAt: '2026-03-10' },
    { id: 5, title: 'Data Structures', author: 'N. Karumanchi', category: 'Technology', status: 'Available', fine_per_day: 800, createdAt: '2026-03-28' },
    { id: 6, title: 'Tropical Fish', author: 'Doreen Baingana', category: 'Fiction', status: 'Available', fine_per_day: 500, createdAt: '2026-03-29' },
  ];

  // Enhanced filter logic for 'Available' and 'Recently Added'
  let filteredBooks = books.filter(b =>
    (selectedCategory === 'All' || b.category === selectedCategory) &&
    (b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (activeFilter === 'Available') {
    filteredBooks = filteredBooks.filter(b => b.status === 'Available');
  } else if (activeFilter === 'Recently Added') {
    filteredBooks = filteredBooks
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5); // Show 5 most recent books
  } else {
    // Default: sort so available books come first
    filteredBooks = filteredBooks.sort((a, b) => {
      if (a.status === 'Available' && b.status !== 'Available') return -1;
      if (a.status !== 'Available' && b.status === 'Available') return 1;
      return 0;
    });
  }

  return (
    <MemberLayout>
      {/* Hero Section with Search */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1481627564523-4a7c3994ef24?q=80&w=2070&auto=format&fit=crop" 
            alt="Library" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 dark:to-slate-950 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 text-center space-y-12 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-5xl font-black text-white mt-12 mb-6 tracking-wider leading-tight">
              Explore the Universe of Knowledge
            </h1>
            <p className="text-base md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-tight opacity-90">
              Access thousands of academic resources, research journals, and local literature at your fingertips.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="bg-white/95 dark:bg-slate-900/95 p-2 rounded-[50px] shadow-2xl shadow-sky-900/20 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto ring-1 ring-white/20">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by title, author, or ISBN..." 
                className="w-full h-14 pl-14 pr-4 bg-transparent border-none focus:ring-0 focus:outline-none text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-14 w-[1px] bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
            <div className="relative min-w-[180px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select 
                className="w-full h-14 pl-10 pr-8 bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 appearance-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Technology">Technology</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <button className="h-14 px-10 bg-sky-600 hover:bg-sky-700 text-white rounded-[50px] font-bold transition-all shadow-lg shadow-sky-600/20 uppercase tracking-widest">
              Search
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

        <motion.div 
          layoutId="book-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredBooks.map(book => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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