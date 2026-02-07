# Decision Tree Hyperparameter Tuner

A simple React frontend for tuning Decision Tree hyperparameters.

## Layout

- **Top Center**: Title and CSV file upload
- **Left Sidebar**: Hyperparameter sliders (max_depth, min_samples_split)
- **Center**: Generate button and results display

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The app will open at **http://localhost:3000**

## Usage

1. Upload a CSV file (top center)
2. Adjust hyperparameters using sliders (left sidebar)
3. Click "Generate Decision Tree" button
4. View results: accuracy, confusion matrix, and tree visualization

## Backend Requirement

Make sure the Flask backend is running at **http://localhost:5000**

## Technologies

- React 18
- Simple CSS with sidebar layout
- Fetch API for backend communication
