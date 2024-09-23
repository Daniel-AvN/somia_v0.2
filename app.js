(async function () {
    try {
        model = await tf.loadGraphModel('https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json');
        console.log('Modelo de ejemplo cargado exitosamente');
    } catch (error) {
        console.error('Error al cargar el modelo de ejemplo:', error);
    }
})();
