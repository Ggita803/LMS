import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import AddBookModal from './AddBookModal';
import MainLayout from '../MainLayout';

const BooksPageContent = () => {
  const [books, setBooks] = useState([
    {
      id: '1',
      title: 'The Great Gatsby',
      isbn: '978-0743273565',
      author: 'F. Scott Fitzgerald',
      category: 'Fiction',
      copies: 5,
      available: 3,
      status: 'available',
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      isbn: '978-0061120084',
      author: 'Harper Lee',
      category: 'Fiction',
      copies: 4,
      available: 2,
      status: 'available',
    },
    {
      id: '3',
      title: 'Python Crash Course',
      isbn: '978-1593279288',
      author: 'Eric Matthes',
      category: 'Programming',
      copies: 8,
      available: 1,
      status: 'low-stock',
    },
    {
      id: '4',
      title: 'Clean Code',
      isbn: '978-0132350884',
      author: 'Robert C. Martin',
      category: 'Programming',
      copies: 3,
      available: 0,
      status: 'unavailable',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBook = async (formData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newBook = {
        id: String(books.length + 1),
        ...formData,
        status: formData.available > 0 ? 'available' : 'unavailable',
      };

      setBooks([...books, newBook]);
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
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

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
