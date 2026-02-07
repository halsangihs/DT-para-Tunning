import React from 'react';

function MainContent({ loading, file, onGenerate, results }) {
  return (
    <main className="flex-1 bg-gray-50 p-8 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <button
          onClick={onGenerate}
          disabled={loading || !file}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all duration-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:bg-black hover:shadow-[0_6px_20px_rgba(93,93,93,0.23)] hover:-translate-y-0.5"
        >
          {loading ? (
             <span className="flex items-center gap-2">
               <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Processing...
             </span>
          ) : 'Generate Model'}
        </button>

        {results && (
          <div className="mt-12 w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {results.tree_image && (
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-4 pt-2">
                  <h3 className="font-bold text-gray-900">Tree Visualization</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">Generated</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 overflow-x-auto border border-gray-100">
                  <img
                    src={`data:image/png;base64,${results.tree_image}`}
                    alt="Decision Tree"
                    className="max-w-none md:max-w-full h-auto mx-auto"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 text-center flex flex-col justify-center ${results.is_regression ? 'md:col-span-2' : ''}`}>
                <h3 className="text-lg font-medium text-gray-500 uppercase tracking-widest mb-2">
                  {results.is_regression ? 'R² Score' : 'Accuracy Score'}
                </h3>
                <div className="text-6xl font-black text-gray-900 tracking-tight">
                  {(results.accuracy * 100).toFixed(2)}<span className="text-2xl text-gray-400 font-normal">%</span>
                </div>
              </div>

              {!results.is_regression && results.confusion_matrix && (
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Confusion Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="mx-auto border-separate border-spacing-2">
                      <tbody>
                        {results.confusion_matrix.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td 
                                key={j} 
                                className="w-12 h-12 md:w-14 md:h-14 text-sm md:text-base text-center align-middle bg-gray-100 text-gray-800 font-bold rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;
