import React from 'react';

function Header({ file, onFileChange }) {
  return (
    <header className="bg-white border-b border-gray-200 py-6 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Decision Tree Tuner</h1>
        
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={onFileChange}
            id="file-upload"
            className="hidden"
          />
          <label 
            htmlFor="file-upload" 
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {file ? file.name : 'Upload CSV Dataset'}
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
