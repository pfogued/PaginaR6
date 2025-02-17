document.addEventListener('DOMContentLoaded', function () {
    const filtroSeleccionado = document.getElementById('filtroSeleccionado');
    const operadores = document.querySelectorAll('#operadores img');
    const masFiltros = document.getElementById('masFiltros');
    const filtrosDesplegables = document.getElementById('filtrosDesplegables');
    const resetFiltro = document.getElementById('resetFiltro');  // Nuevo botón para resetear el filtro

    // Aplicar estilos iniciales a los operadores
    operadores.forEach(op => {
        op.style.transition = 'opacity 1.5s ease, transform 0.5s ease';
    });

    // Función que aplica el filtro con transición
    function aplicarFiltro() {
        // Restablecer todas las imágenes a su estado original
        operadores.forEach(op => {
            op.classList.remove('iluminado');
            op.style.transform = 'scale(1)';
            op.style.visibility = 'visible';
            op.style.opacity = '1';
        });

        // Si no se ha seleccionado un filtro, salir
        if (filtroSeleccionado.value === "") return;

        // Aplicar cambios a las imágenes que coincidan con el filtro
        operadores.forEach(op => {
            if (op.classList.contains(filtroSeleccionado.value)) {
                op.classList.add('iluminado');
            } else {
                op.style.opacity = '0';  // Se desvanecen
                setTimeout(() => { op.style.visibility = 'hidden'; }, 1500); // Se ocultan tras 1.5s
            }
        });
    }

    // Función para mostrar/ocultar el desplegable de filtros
    masFiltros.addEventListener('click', function () {
        filtrosDesplegables.style.display = (filtrosDesplegables.style.display === "none" || filtrosDesplegables.style.display === "") 
            ? "block" 
            : "none";
    });

    // Escuchar cambios en el filtro seleccionado
    filtroSeleccionado.addEventListener('change', function () {
        aplicarFiltro();
        actualizarEstiloFiltro();
    });

    // Función para actualizar el estilo del filtro seleccionado
    function actualizarEstiloFiltro() {
        const opciones = filtroSeleccionado.querySelectorAll('option');
        opciones.forEach(opcion => {
            if (opcion.value === filtroSeleccionado.value) {
                opcion.style.fontWeight = 'bold';
                opcion.style.backgroundColor = '#e0e0e0';  // Color de fondo para destacar
            } else {
                opcion.style.fontWeight = 'normal';
                opcion.style.backgroundColor = '';  // Restaurar el fondo para otras opciones
            }
        });
    }

    // Añadir funcionalidad para restablecer el filtro
    resetFiltro.addEventListener('click', function () {
        filtroSeleccionado.value = "";  // Restablecer el filtro
        aplicarFiltro();  // Volver a aplicar el filtro (vacío en este caso)
        actualizarEstiloFiltro();  // Restaurar el estilo del desplegable
    });

    // Mostrar el filtro desplegable al hacer clic en "MAS FILTROS"
    document.getElementById("masFiltros").addEventListener("click", function() {
        const filtros = document.getElementById("filtrosDesplegables");
        filtros.classList.toggle("show");
    });

    // Obtener el contenedor del video y el iframe
    const videoContainer = document.getElementById('videoContainer');
    const videoIframe = document.getElementById('videoIframe');
    const closeButton = document.getElementById('closeVideo');

    // Cerrar el video cuando se haga clic en el botón de cierre
    closeButton.addEventListener('click', function () {
        videoContainer.style.display = 'none';  // Ocultar el contenedor
        videoIframe.src = "";  // Detener el video
    });
});


// Cargar operadores desde JSON dinámicamente
fetch('operadores.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(operadoresVideos => {
        operadoresVideos.forEach(op => {
            const operadorImage = document.getElementById(op.id);
            if (operadorImage) {
                operadorImage.addEventListener('click', function () {
                    const videoIframe = document.getElementById('videoIframe');
                    const videoContainer = document.getElementById('videoContainer');
                    
                    videoIframe.src = op.videoUrl;
                    videoContainer.style.display = 'flex';
                });
            }
        });
    })
    .catch(error => console.error('Error cargando operadores:', error));
