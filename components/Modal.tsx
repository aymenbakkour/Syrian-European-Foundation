
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-primary-dark">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
            aria-label="إغلاق"
          >
            &times;
          </button>
        </div>
        <div className="py-6 flex-grow overflow-y-auto">
          {children}
        </div>
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
