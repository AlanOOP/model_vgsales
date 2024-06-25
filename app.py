from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# Cargar el modelo
model = joblib.load('modelo_svr.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_data = np.array([data['features']])
    prediction = model.predict(input_data)
   
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
