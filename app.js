let model;
const imageInput = document.getElementById('image-input');
const resultDiv = document.getElementById('result');
const imgElement = document.getElementById('selected-image');

// Cargar el modelo cuando se cargue la página
window.onload = async () => {
    model = await tf.loadGraphModel('model/model.json');
    console.log('Model loaded successfully');
};

// Manejar la selección de la imagen
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        imgElement.src = e.target.result;
        predict(e.target.result);  // Hacer la predicción cuando se seleccione la imagen
    };

    reader.readAsDataURL(file);
});

// Predecir la imagen cargada
async function predict(imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
        // Procesar la imagen antes de la predicción (ajustar tamaño, normalizar, etc.)
        const tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224, 224]) // Ajusta el tamaño a lo que espera tu modelo
            .toFloat()
            .expandDims(0);

        const prediction = await model.predict(tensor);
        const classIndex = prediction.argMax(1).dataSync()[0];

        let classNames = ['TIRADS 1', 'TIRADS 2', 'TIRADS 3', 'TIRADS 4', 'TIRADS 5'];
        resultDiv.innerText = `Prediction: ${classNames[classIndex]}`;
    };
}
