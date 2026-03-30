import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import { Tag, Plus, Search, Trash2, Edit2, BookOpen, Filter } from 'lucide-react';
import CategoryModal from '../components/CategoryModal';
import { fetchCategories, createCategory, deleteCategory } from '../services/categoryService';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCategories = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        // Debug log
        console.log('Fetched categories data:', data);
        const cats = data.items || data.categories || [];
        setCategories(
          cats.map((cat) => ({
            id: cat.category_id,
            name: cat.category_name,
            description: cat.description,
            count: cat.book_count,
            color: 'bg-sky-100 text-sky-600',
          }))
        );
      } catch (err) {
        toast.error('Failed to load categories');
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category removed');
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  const handleAddCategory = async (form) => {
    setLoading(true);
    try {
      const res = await createCategory(form);
      toast.success('Category added');
      setModalOpen(false);
      // Refetch categories
      const data = await fetchCategories();
      const cats = data.items || data.categories || [];
      setCategories(
        cats.map((cat) => ({
          id: cat.category_id,
          name: cat.category_name,
          description: cat.description,
          count: cat.book_count,
          color: 'bg-sky-100 text-sky-600',
        }))
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Category Manager</h1>
            <p className="text-muted mt-1">Organize your collection by genre and academic level</p>
          </div>
          <button
            className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-sky-700 transition-smooth shadow-lg shadow-sky-100"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="w-5 h-5" /> Add New Category
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search genres, subjects..."
              className="input-base pl-12 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="card bg-sky-50 dark:bg-sky-900/20 border-none flex items-center justify-center p-0 h-12">
            <span className="text-sm font-bold text-sky-600 uppercase tracking-widest">{categories.length} Total Categories</span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-12">
                No categories found.
              </div>
            ) : (
              filtered.map((cat) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={cat.id} 
                  className="card bg-white dark:bg-slate-900 border-none shadow-subtle group hover:shadow-xl transition-smooth"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${cat.color}`}>
                      <Tag className="w-6 h-6" />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                      <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-sky-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-muted">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">{cat.count} Books in Stock</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <button className="w-full py-2 text-xs font-bold text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-smooth">
                      VIEW ALL BOOKS
                    </button>
                  </div>
                </motion.div>
              ))
            )}
            <CategoryModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onSubmit={handleAddCategory}
              loading={loading}
            />
          </AnimatePresence>

          {/* Quick Add Placeholder */}
          <button className="card border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent flex flex-col items-center justify-center gap-3 group hover:border-sky-400 transition-smooth min-h-[240px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-sky-50 transition-smooth">
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-sky-600" />
            </div>
            <p className="text-sm font-bold text-slate-400 group-hover:text-sky-600">NEW GENRE</p>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageCategories;