import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import BaseModal from '../../components/Modals/BaseModal';


import { getCategories } from '../../services/categoryService';

const AddBookModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category_id: '',
    copies: 1,
    available: 1,
    description: '',
    cover: null,
    book_file: null,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      getCategories().then((cats) => {
        setCategories(cats);
        // Set default category_id if not set
        if (cats.length && !formData.category_id) {
          setFormData((prev) => ({ ...prev, category_id: cats[0].category_id }));
        }
      });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (formData.copies < 1) newErrors.copies = 'Must have at least 1 copy';
    if (formData.available > formData.copies) newErrors.available = 'Available cannot exceed total copies';
    if (!formData.cover) newErrors.cover = 'Cover image is required';
    if (!formData.book_file) newErrors.book_file = 'Book file is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'cover' || key === 'book_file') {
        if (value) {
          data.append(key, value);
        }
      } else if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });
    await onSubmit(data);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category_id: categories[0]?.category_id || '',
      copies: 1,
      available: 1,
      description: '',
      cover: null,
      book_file: null,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : (name === 'copies' || name === 'available' ? parseInt(value) : value),
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Book"
      size="lg"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-semibold"
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </>
      }
    >
      <form className="space-y-4" encType="multipart/form-data">
                {/* Cover Photo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Cover Photo *
                  </label>
                  <input
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.cover && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cover}
                    </div>
                  )}
                </div>

                {/* Book File */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Book File (PDF, EPUB, etc) *
                  </label>
                  <input
                    type="file"
                    name="book_file"
                    accept=".pdf,.epub,.mobi,.doc,.docx,.txt"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.book_file && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.book_file}
                    </div>
                  )}
                </div>
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Book Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.title && (
            <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.title}
            </div>
          )}
        </div>

        {/* Author and ISBN - Two columns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.author && (
              <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.author}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              ISBN *
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.isbn && (
              <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.isbn}
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Category *
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
            ))}
          </select>
          {errors.category_id && (
            <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.category_id}
            </div>
          )}
        </div>

        {/* Copies and Available - Two columns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Total Copies *
            </label>
            <input
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.copies && (
              <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.copies}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Available *
            </label>
            <input
              type="number"
              name="available"
              value={formData.available}
              onChange={handleChange}
              min="0"
              max={formData.copies}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.available && (
              <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.available}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Book description (optional)"
            rows="3"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </form>
    </BaseModal>
  );
};

export default AddBookModal;
