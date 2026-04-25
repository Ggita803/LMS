

import React from 'react';
const ASSET_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000';
import BaseModal from '../../components/Modals/BaseModal';

const BookDetailsModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  // Use cover_url as in BookCard, fallback to a placeholder if needed
  let coverUrl = book.cover_url;
  if (coverUrl && !coverUrl.startsWith('http')) {
    coverUrl = `${ASSET_URL}${coverUrl}`;
  }

  // Mock rating for demonstration (could be replaced with book.rating)
  const rating = book.rating || 4.2;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={null} size="md">
      <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-xl p-0 overflow-hidden">
        {/* Header with image and title */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-shrink-0 w-32 h-44 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
            {coverUrl ? (
              <img
                src={coverUrl}
                className="object-cover w-full h-full"
                style={{ objectFit: 'cover' }}
                alt={book.title || 'Book cover'}
                onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x250?text=No+Cover'; }}
              />
            ) : (
              <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="24" height="24" rx="4" fill="currentColor" opacity="0.1"/><path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{book.title}</h2>
            <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/></svg>
              <span className="line-clamp-1">{book.author}</span>
            </div>
            {/* Review Stars */}
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: totalStars }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-700'}`}
                  fill={i < fullStars ? 'currentColor' : i === fullStars && hasHalfStar ? 'url(#half)' : 'none'}
                  stroke="currentColor"
                  strokeWidth={i < fullStars || (i === fullStars && hasHalfStar) ? 0 : 1.5}
                  viewBox="0 0 20 20"
                >
                  <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.6,11.5 14.8,17.3 9.9,14.3 5,17.3 6.2,11.5 1.6,7.3 7.5,6.6" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-slate-400">{rating.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-slate-600 dark:text-slate-300 mt-2">
              {book.year && <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">{book.year}</span>}
              {book.language && <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">{book.language}</span>}
              {book.publisher && <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">{book.publisher}</span>}
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 px-6 py-4">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">ISBN:</span> <span className="text-slate-700 dark:text-slate-200">{book.isbn}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">Category:</span> <span className="text-slate-700 dark:text-slate-200">{book.category}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">Total Copies:</span> <span className="text-slate-700 dark:text-slate-200">{book.copies}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">Available:</span> <span className="text-slate-700 dark:text-slate-200">{book.available}</span>
          </div>
          {book.status && (
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Status:</span> <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${book.status === 'available' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : book.status === 'low-stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>{book.status}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="px-6 pb-6">
          <div className="font-semibold text-slate-900 dark:text-white mb-1">Description:</div>
          <div className={
            book.description
              ? "rounded bg-slate-50 dark:bg-slate-700/50 p-3 text-slate-700 dark:text-slate-200"
              : "italic text-slate-400 dark:text-slate-500"
          }>
            {book.description ? book.description : "No description available."}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default BookDetailsModal;
