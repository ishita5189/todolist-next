import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuoteDialog = ({ onClose }) => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://type.fit/api/quotes');
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({ text: 'Failed to fetch quote', author: '' });
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-500 rounded shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl text-white font-bold mb-4">Motivational Quote</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-lg text-white">{quote.text}</p>
            <p className="text-sm text-gray-200 mt-2">— {quote.author.split(',')[0] || 'Unknown'}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 shadow-md rounded font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MotivationalQuoteDialog;
