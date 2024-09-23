// Carga el modelo
let model;
(async function () {
    try {
        model = await tf.loadGraphModel('model/model.json');
        console.log('Modelo cargado exitosamente');
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
    }
})();

// Procesa la imagen y realiza la predicción
document.getElementById('upload-image').addEventListener('change', function (event) {
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
            } catch (error) {
                console.error('Error al hacer la predicción:', error);
            }
        };
        document.body.appendChild(img);
    };
    reader.readAsDataURL(file);
});
