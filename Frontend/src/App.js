import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

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
      
      <Header file={file} onFileChange={handleFileChange} />

      <div className="flex flex-1 flex-col md:flex-row items-stretch">
        
        <Sidebar
          criterion={criterion}
          setCriterion={setCriterion}
          maxDepth={maxDepth}
          setMaxDepth={setMaxDepth}
          minSamplesSplit={minSamplesSplit}
          setMinSamplesSplit={setMinSamplesSplit}
          minSamplesLeaf={minSamplesLeaf}
          setMinSamplesLeaf={setMinSamplesLeaf}
          maxFeatures={maxFeatures}
          setMaxFeatures={setMaxFeatures}
          maxLeafNodes={maxLeafNodes}
          setMaxLeafNodes={setMaxLeafNodes}
          minImpurityDecrease={minImpurityDecrease}
          setMinImpurityDecrease={setMinImpurityDecrease}
        />

        <MainContent 
          loading={loading}
          file={file}
          onGenerate={handleGenerateTree}
          results={results}
        />
      </div>
    </div>
  );
}

export default App;
