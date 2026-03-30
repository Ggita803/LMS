import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import AddBookModal from './AddBookModal';
import MainLayout from '../MainLayout';
import { getBooks, addBook, deleteBook, updateBook } from '../../services/bookService';
import BookDetailsModal from './BookDetailsModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { getCategories } from '../../services/categoryService';

const BooksPageContent = () => {
    // Delete handler
    const handleDelete = async () => {
      if (!deleteTarget) return;
      setIsDeleting(true);
      try {
        await deleteBook(deleteTarget.id);
        // Refresh books from backend
        const booksRes = await getBooks();
        const catMap = {};
        categories.forEach(cat => { catMap[cat.category_id] = cat.category_name; });
        const mappedBooks = booksRes.map(b => ({
          id: b.book_id,
          title: b.title,
          isbn: b.isbn,
          author: b.author,
          category: b.category_name || catMap[b.category_id] || b.category_id,
          copies: b.total_copies,
          available: b.available_copies,
          status: b.available_copies === 0 ? 'unavailable' : (b.available_copies < 2 ? 'low-stock' : 'available'),
        }));
        setBooks(mappedBooks);
        setDeleteTarget(null);
      } catch (error) {
        alert('Failed to delete book.');
      } finally {
        setIsDeleting(false);
      }
    };
  const [books, setBooks] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  // Fetch books and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          getBooks(),
          getCategories(),
        ]);
        const catMap = {};
        categoriesRes.forEach(cat => { catMap[cat.category_id] = cat.category_name; });
        setCategoryMap(catMap);
        // Map backend book fields to frontend fields
        const mappedBooks = booksRes.map(b => ({
          id: b.book_id,
          title: b.title,
          isbn: b.isbn,
          author: b.author,
          category: b.category_name || catMap[b.category_id] || b.category_id,
          copies: b.total_copies,
          available: b.available_copies,
          status: b.available_copies === 0 ? 'unavailable' : (b.available_copies < 2 ? 'low-stock' : 'available'),
        }));
        setBooks(mappedBooks);
      } catch (err) {
        console.error('Failed to fetch books or categories', err);
      }
    };
    fetchData();
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewBook, setViewBook] = useState(null);

  const handleAddBook = async (formData) => {
    setIsLoading(true);
    try {
      // Map frontend fields to backend fields
      const payload = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        category_id: formData.category_id,
        total_copies: formData.copies,
        available_copies: formData.available,
        description: formData.description,
      };
      await addBook(payload);
      // Refresh books from backend
      const booksRes = await getBooks();
      const catMap = {};
      categories.forEach(cat => { catMap[cat.category_id] = cat.name; });
      const mappedBooks = booksRes.map(b => ({
        id: b.book_id,
        title: b.title,
        isbn: b.isbn,
        author: b.author,
        category: catMap[b.category_id] || b.category_id,
        copies: b.total_copies,
        available: b.available_copies,
        status: b.available_copies === 0 ? 'unavailable' : (b.available_copies < 2 ? 'low-stock' : 'available'),
      }));
      setBooks(mappedBooks);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add book:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'isbn', label: 'ISBN' },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
          {value}
        </span>
      ),
    },
    {
      key: 'copies',
      label: 'Total',
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'available',
      label: 'Available',
      render: (value, row) => (
        <span
          className={`font-semibold ${
            value > 0 ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const styles = {
          available:
            'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          'low-stock':
            'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
          unavailable:
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value}
          </span>
        );
      },
    },
  ];

  const renderActions = (row) => (
    <>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
        onClick={() => setViewBook(row)}
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
        onClick={() => {
          setEditBook(row);
          setIsEditModalOpen(true);
        }}
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
        onClick={() => setDeleteTarget(row)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );
  // Edit handler
  const handleEditBook = async (formData) => {
    setIsLoading(true);
    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        category_id: formData.category_id,
        total_copies: formData.copies,
        available_copies: formData.available,
        description: formData.description,
      };
      await updateBook(editBook.id, payload);
      // Refresh books from backend
      const booksRes = await getBooks();
      const catMap = {};
      categories.forEach(cat => { catMap[cat.category_id] = cat.name; });
      const mappedBooks = booksRes.map(b => ({
        id: b.book_id,
        title: b.title,
        isbn: b.isbn,
        author: b.author,
        category: b.category_name || catMap[b.category_id] || b.category_id,
        copies: b.total_copies,
        available: b.available_copies,
        status: b.available_copies === 0 ? 'unavailable' : (b.available_copies < 2 ? 'low-stock' : 'available'),
      }));
      setBooks(mappedBooks);
      setIsEditModalOpen(false);
      setEditBook(null);
    } catch (error) {
      alert('Failed to update book.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Books Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage library book inventory and catalog
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Books
          </p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {books.reduce((sum, b) => sum + b.copies, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Available
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {books.reduce((sum, b) => sum + b.available, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Borrowed
          </p>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {books.reduce((sum, b) => sum + (b.copies - b.available), 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Unique Titles
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {books.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Books List"
        columns={columns}
        data={books}
        searchPlaceholder="Search books by title, author, ISBN..."
        actions={renderActions}
      />

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddBook}
        isLoading={isLoading}
      />
      {/* Edit Book Modal */}
      <AddBookModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setEditBook(null); }}
        onSubmit={handleEditBook}
        isLoading={isLoading}
        initialData={editBook}
        isEdit
      />
      {/* View Book Modal */}
      <BookDetailsModal
        isOpen={!!viewBook}
        onClose={() => setViewBook(null)}
        book={viewBook}
      />
    {/* Delete Confirmation Modal */}
    <ConfirmationModal
      isOpen={!!deleteTarget}
      title="Delete Book"
      message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.` : ''}
      confirmText="Delete"
      cancelText="Cancel"
      isDangerous
      isLoading={isDeleting}
      onCancel={() => setDeleteTarget(null)}
      onConfirm={handleDelete}
    />
    </div>
  );
};

const BooksPage = () => {
  return (
    <MainLayout>
      <BooksPageContent />
    </MainLayout>
  );
};

export default BooksPage;
