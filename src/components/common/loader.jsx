// src/components/common/Loader.jsx
import React from 'react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600 mx-auto"></div>
    <p className="mt-4 text-lg text-gray-600">{text}</p>
  </div>
);

export default Loader;