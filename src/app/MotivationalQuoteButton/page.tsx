"use client"
import React, { useState } from 'react';
import MotivationalQuoteDialog from './MotivationalQuoteDialog';

const MotivationalQuoteButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="absolute top-4 right-4 bg-indigo-500 text-white px-4 py-2 shadow-md rounded font-bold"
      >
        Show Quote
      </button>
      {open && <MotivationalQuoteDialog onClose={handleClose} />}
    </div>
  );
};

export default MotivationalQuoteButton;
