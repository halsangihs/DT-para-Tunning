from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, r2_score, mean_squared_error
from sklearn.preprocessing import LabelEncoder
from sklearn.utils.multiclass import type_of_target
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import base64
import io
import os
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/train', methods=['POST'])
def train_model():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400
        
        max_depth = request.form.get('max_depth', type=int)
        min_samples_split = request.form.get('min_samples_split', type=int)
        criterion = request.form.get('criterion', 'gini')
        max_features = request.form.get('max_features', '')
        min_samples_leaf = request.form.get('min_samples_leaf', type=int, default=1)
        max_leaf_nodes = request.form.get('max_leaf_nodes', '')
        min_impurity_decrease = request.form.get('min_impurity_decrease', type=float, default=0.0)
        
        if max_depth is None or min_samples_split is None:
            return jsonify({'error': 'Missing hyperparameters'}), 400
        
        if max_features == '' or max_features == 'None':
            max_features = None
        elif max_features not in ['sqrt', 'log2']:
            try:
                max_features = int(max_features)
            except:
                max_features = None
        
        if max_leaf_nodes == '' or max_leaf_nodes == 'None':
            max_leaf_nodes = None
        else:
            try:
                max_leaf_nodes = int(max_leaf_nodes)
            except:
                max_leaf_nodes = None
        
        df = pd.read_csv(file)
        
        if df.empty:
            return jsonify({'error': 'CSV file is empty'}), 400
            
        df = df.dropna()
        if df.empty:
            return jsonify({'error': 'dataset is empty after dropping NaN values'}), 400
        
        X = df.iloc[:, :-1].copy()
        y = df.iloc[:, -1].copy()
        
        for col in X.columns:
            if X[col].dtype == 'object':
                le = LabelEncoder()
                X[col] = le.fit_transform(X[col].astype(str))
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        is_float_target = pd.api.types.is_float_dtype(y)
        target_type = type_of_target(y)
        
        is_regression = target_type == 'continuous' or is_float_target
        
        if is_regression:
            clf = DecisionTreeRegressor(
                criterion='squared_error' if criterion == 'gini' else 'absolute_error',
                max_depth=max_depth,
                min_samples_split=min_samples_split,
                min_samples_leaf=min_samples_leaf,
                max_features=max_features,
                max_leaf_nodes=max_leaf_nodes,
                min_impurity_decrease=min_impurity_decrease,
                random_state=42
            )
        else:
            clf = DecisionTreeClassifier(
                criterion=criterion,
                max_depth=max_depth,
                min_samples_split=min_samples_split,
                min_samples_leaf=min_samples_leaf,
                max_features=max_features,
                max_leaf_nodes=max_leaf_nodes,
                min_impurity_decrease=min_impurity_decrease,
                random_state=42
            )

        clf.fit(X_train, y_train)
        
        y_pred = clf.predict(X_test)
        
        if is_regression:
            accuracy = r2_score(y_test, y_pred)
            mse = mean_squared_error(y_test, y_pred)
            cm = []
        else:
            accuracy = accuracy_score(y_test, y_pred)
            cm = confusion_matrix(y_test, y_pred).tolist()
        
        plt.figure(figsize=(20, 10))
        plot_tree(
            clf,
            feature_names=X.columns.tolist(),
            class_names=None if is_regression else [str(c) for c in clf.classes_],
            filled=True,
            rounded=True,
            fontsize=10
        )
        
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', bbox_inches='tight', dpi=150)
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
        plt.close()
        
        plt.figure(figsize=(20, 10))
        plot_tree(
            clf,
            feature_names=X.columns.tolist(),
            class_names=None if is_regression else [str(c) for c in clf.classes_],
            filled=True,
            rounded=True,
            fontsize=10
        )
        plt.savefig('tree.png', bbox_inches='tight', dpi=150)
        plt.close()
        
        response = {
            'accuracy': float(accuracy),
            'confusion_matrix': cm,
            'is_regression': is_regression,
            'tree_image': img_base64,
            'train_size': len(X_train),
            'test_size': len(X_test),
            'n_features': X.shape[1],
            'n_classes': 1 if is_regression else len(clf.classes_)
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    print("Starting Flask backend on http://localhost:5000")
    print("Ready to train Decision Tree models!")
    app.run(host='0.0.0.0', port=5000, debug=True)
