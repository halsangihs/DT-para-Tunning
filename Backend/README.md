# Decision Tree Backend API

Flask backend for training Decision Tree models with hyperparameter tuning.

## Features

- 🎯 Train Decision Tree Classifier
- 📊 Calculate accuracy and confusion matrix
- 🌳 Generate tree visualization
- 🔄 CORS enabled for React frontend
- ⚡ Fast response with base64 encoded images

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on Mac/Linux
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

```bash
python app.py
```

The server will start at **http://localhost:5000**

## API Endpoints

### POST /train

Train a Decision Tree model with uploaded CSV and hyperparameters.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: CSV file (required)
  - `max_depth`: Integer 1-20 (required)
  - `min_samples_split`: Integer 2-50 (required)

**Response:**
```json
{
  "accuracy": 0.95,
  "confusion_matrix": [[50, 2], [1, 47]],
  "tree_image": "base64_encoded_image_string",
  "train_size": 80,
  "test_size": 20,
  "n_features": 4,
  "n_classes": 2
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "Backend is running"
}
```

## CSV Format Requirements

- Must be a valid CSV file
- Last column should be the target variable (labels)
- All other columns are treated as features
- Should contain numerical or categorical data compatible with sklearn

## Example CSV

```csv
feature1,feature2,feature3,target
1.2,3.4,5.6,0
2.3,4.5,6.7,1
3.4,5.6,7.8,0
4.5,6.7,8.9,1
```

## How It Works

1. Receives CSV file and hyperparameters
2. Loads data using pandas
3. Splits into 80% train, 20% test
4. Trains DecisionTreeClassifier with specified hyperparameters
5. Computes accuracy and confusion matrix
6. Generates tree visualization using matplotlib
7. Returns results as JSON with base64 encoded image

## Error Handling

The API handles various errors:
- Missing or invalid file
- Invalid CSV format
- Missing hyperparameters
- Empty dataset
- Model training errors

All errors return appropriate HTTP status codes and error messages.

## Technologies Used

- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **pandas** - Data manipulation
- **scikit-learn** - Machine learning
- **matplotlib** - Visualization
- **numpy** - Numerical computing

## Output Files

The backend also saves the decision tree visualization as `tree.png` in the backend directory for reference.
