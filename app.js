// Carga el modelo
let model;
(async function () {
    try {
        model = await tf.loadGraphModel('model/model.json');
        console.log('Modelo cargado exitosamente', model);
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
    }
})();

// Procesa la imagen y realiza la predicción
document.getElementById('image-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        img.onload = async function () {
            try {
                // Preprocesamiento de la imagen
                let tensor = tf.browser.fromPixels(img)
                    .resizeNearestNeighbor([224, 224])  // Ajusta el tamaño de entrada
                    .toFloat()
                    .expandDims();  // Añade dimensión para el batch
                
                // Predicción
                const predictions = await model.predict(tensor).data();
                console.log('Predicciones:', predictions);
                
                // Muestra el resultado en el div #result
                document.getElementById('result').innerHTML = `Predicciones: ${predictions}`;
            } catch (error) {
                console.error('Error al hacer la predicción:', error);
            }
        };
        document.getElementById('selected-image').src = reader.result;  // Muestra la imagen seleccionada
    };
    reader.readAsDataURL(file);
});
