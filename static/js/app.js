document.getElementById('prediction-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log('Formulario enviado');

    const formData = {
        platform: parseFloat(document.getElementById('platform').value),
        genre: parseFloat(document.getElementById('genre').value),
        publisher: parseFloat(document.getElementById('publisher').value),
        na_sales: parseFloat(document.getElementById('na_sales').value),
        eu_sales: parseFloat(document.getElementById('eu_sales').value)
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ features: Object.values(formData) })
        });

        const result = await response.json();

        console.log('Resultado:', result);

        const predictionDiv = document.getElementById('prediction');
        const p = document.createElement('p');

        //crear imagen a esta direccion  <img src="{{ url_for('static', filename='img/sales-icon.png') }}" alt="" class="sales-icon"></img>



        p.className = 'text-green-500 font-bold text-2xl mt-4 text-center bg-green-100 p-4 shadow-md  border-l-4 border-green-500';
        p.textContent = `Predicción: - Se calcula un total de ventas de ${result.prediction} millones de copias`;

        
        predictionDiv.appendChild(p);

    } catch (error) {
        console.error('Error al realizar la predicción:', error);
    }
});