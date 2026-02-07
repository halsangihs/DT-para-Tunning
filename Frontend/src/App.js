import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [maxDepth, setMaxDepth] = useState(5);
  const [minSamplesSplit, setMinSamplesSplit] = useState(2);
  const [criterion, setCriterion] = useState('gini');
  const [maxFeatures, setMaxFeatures] = useState('None');
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1);
  const [maxLeafNodes, setMaxLeafNodes] = useState('None');
  const [minImpurityDecrease, setMinImpurityDecrease] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleGenerateTree = async () => {
    if (!file) {
      alert('Please upload a CSV file first');
      return;
    }

    setLoading(true);
    setResults(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('max_depth', maxDepth);
    formData.append('min_samples_split', minSamplesSplit);
    formData.append('criterion', criterion);
    formData.append('max_features', maxFeatures === 'None' ? '' : maxFeatures);
    formData.append('min_samples_leaf', minSamplesLeaf);
    formData.append('max_leaf_nodes', maxLeafNodes === 'None' ? '' : maxLeafNodes);
    formData.append('min_impurity_decrease', minImpurityDecrease);

    try {
      const response = await fetch('http://localhost:5000/train', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to train model');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      
      <header className="bg-white border-b border-gray-200 py-6 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Decision Tree Tuner</h1>
          
          <div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
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

      <div className="flex flex-1 flex-col md:flex-row items-stretch">
        
        <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 p-8 flex-shrink-0 z-10 relative">
          <div className="sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gray-800 rounded-full"></span>
              Parameters
            </h2>
            
            <div className="space-y-8 pr-2">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Criterion</label>
                <div className="relative">
                  <select 
                    value={criterion} 
                    onChange={(e) => setCriterion(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none appearance-none transition-all"
                  >
                    <option value="gini">Gini Impurity</option>
                    <option value="entropy">Entropy</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Max Depth</label>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Min Samples Split</label>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={minSamplesSplit}
                  onChange={(e) => setMinSamplesSplit(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Min Samples Leaf</label>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{minSamplesLeaf}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={minSamplesLeaf}
                  onChange={(e) => setMinSamplesLeaf(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Max Features</label>
                <div className="relative">
                  <select 
                    value={maxFeatures} 
                    onChange={(e) => setMaxFeatures(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none appearance-none transition-all"
                  >
                    <option value="None">None</option>
                    <option value="sqrt">Square Root</option>
                    <option value="log2">Log2</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Max Leaf Nodes</label>
                <div className="relative">
                  <select 
                    value={maxLeafNodes} 
                    onChange={(e) => setMaxLeafNodes(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none appearance-none transition-all"
                  >
                    <option value="None">None</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Min Impurity Decrease</label>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{minImpurityDecrease.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.001"
                  value={minImpurityDecrease}
                  onChange={(e) => setMinImpurityDecrease(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                />
              </div>

            </div>
          </div>
        </aside>

        <main className="flex-1 bg-gray-50 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <button
              onClick={handleGenerateTree}
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
      </div>
    </div>
  );
}

export default App;
