import React from 'react';

function Sidebar({
  criterion, setCriterion,
  maxDepth, setMaxDepth,
  minSamplesSplit, setMinSamplesSplit,
  minSamplesLeaf, setMinSamplesLeaf,
  maxFeatures, setMaxFeatures,
  maxLeafNodes, setMaxLeafNodes,
  minImpurityDecrease, setMinImpurityDecrease
}) {
  return (
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
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{minSamplesSplit}</span> 
             
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
  );
}

export default Sidebar;
