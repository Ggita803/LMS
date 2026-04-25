import React from 'react';
const ASSET_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000';
import { Book, User, Info, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const statusColors = {
    available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    borrowed: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    reserved: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  // Mock rating for demonstration (could be replaced with book.rating)
  const rating = book.rating || 4.2;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="card group hover:shadow-xl hover:-translate-y-1 transition-smooth flex flex-col h-full border-slate-100 dark:border-slate-800">
      <div className="aspect-[16/10] rounded-lg bg-slate-100 dark:bg-slate-800 relative mb-3 overflow-hidden flex items-center justify-center">
        {book.cover_url ? (
          <img
            src={book.cover_url.startsWith('http') ? book.cover_url : `${ASSET_URL}${book.cover_url}`}
            alt={book.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=No+Cover'; }}
          />
        ) : (
          <Book className="w-12 h-12 text-slate-300 dark:text-slate-600" />
        )}
        <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[book.status.toLowerCase()] || statusColors.available}`}>
          {book.status}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition-smooth line-clamp-1">{book.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
          <User className="w-3 h-3" />
          <span className="line-clamp-1">{book.author}</span>
        </div>
        {/* Review Stars */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array.from({ length: totalStars }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-700'}`}
              fill={i < fullStars ? 'currentColor' : i === fullStars && hasHalfStar ? 'url(#half)' : 'none'}
              strokeWidth={i < fullStars || (i === fullStars && hasHalfStar) ? 0 : 1.5}
            />
          ))}
          <span className="ml-1 text-xs text-slate-400">{rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-sky-600">
            Shs {Number(book.fine_per_day || 500).toLocaleString()}
            <span className="text-[10px] text-muted font-normal"> /day</span>
          </span>
          <span className="text-[10px] font-medium text-muted">{book.category}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
        <Link 
          to={`/books/${book.id}`}
          className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-smooth flex items-center justify-center gap-2"
        >
          Borrow <ArrowRight className="w-3 h-3" />
        </Link>
        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth">
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;