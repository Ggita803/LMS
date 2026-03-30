import React from 'react';
import BaseModal from '../../components/Modals/BaseModal';

const BookDetailsModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Book Details" size="md">
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Title:</span> {book.title}
        </div>
        <div>
          <span className="font-semibold">Author:</span> {book.author}
        </div>
        <div>
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </div>
        <div>
          <span className="font-semibold">Category:</span> {book.category}
        </div>
        <div>
          <span className="font-semibold">Total Copies:</span> {book.copies}
        </div>
        <div>
          <span className="font-semibold">Available:</span> {book.available}
        </div>
        <div>
          <span className="font-semibold">Description:</span> {book.description || <span className="italic text-slate-400">No description</span>}
        </div>
      </div>
    </BaseModal>
  );
};

export default BookDetailsModal;
