document.addEventListener('DOMContentLoaded', function () {
    const filtroSeleccionado = document.getElementById('filtroSeleccionado');
    const operadores = document.querySelectorAll('#operadores img');
    const masFiltros = document.getElementById('masFiltros');
    const filtrosDesplegables = document.getElementById('filtrosDesplegables');
    const resetFiltro = document.getElementById('resetFiltro');

    // Aplicar estilos iniciales a los operadores
    operadores.forEach(op => {
        op.style.transition = 'opacity 1.5s ease, transform 0.5s ease';
    });

    function aplicarFiltro() {
        operadores.forEach(op => {
            op.classList.remove('iluminado', 'unselected');
            op.style.transform = 'scale(1)';
            op.style.visibility = 'visible';
            op.style.opacity = '1';
            op.style.transition = 'filter 2s ease, opacity 0.5s ease-in-out';
            op.style.filter = 'grayscale(0%)';
            op.style.pointerEvents = 'auto';
        });
    
        // Si no hay filtro seleccionado, restaurar todo
        if (filtroSeleccionado.value === "") return;
    
        // Aplicar filtro
        operadores.forEach(op => {
            if (op.classList.contains(filtroSeleccionado.value)) {
                op.classList.add('iluminado');
                op.style.filter = 'grayscale(0%)';
                op.style.pointerEvents = 'auto';
            } else {
                op.style.filter = 'grayscale(100%)';
                op.style.pointerEvents = 'none';
                op.classList.add('unselected');
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
                opcion.style.backgroundColor = '#e0e0e0';  
            } else {
                opcion.style.fontWeight = 'normal';
                opcion.style.backgroundColor = '';  
            }
        });
    }

    // Añadir funcionalidad para restablecer el filtro
    resetFiltro.addEventListener('click', function () {
        filtroSeleccionado.value = "";
        aplicarFiltro(); 
        actualizarEstiloFiltro();  
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
        videoContainer.style.display = 'none';
        videoIframe.src = ""; 
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



    document.addEventListener('DOMContentLoaded', function () {
        const operadores = document.querySelectorAll('#operadores img');
        const closeButton = document.getElementById('closeVideo');
        const videoContainer = document.getElementById('videoContainer');
    
        if (operadores.length > 0) {
            // Aplica la animación de entrada a los operadores
            setTimeout(() => {
                operadores.forEach(op => op.classList.add('cargado'));
            }, 100);
    
            // Mostrar el video con animación
            operadores.forEach(img => {
                img.addEventListener("click", function () {
                    videoContainer.style.display = "flex";
                    setTimeout(() => { videoContainer.classList.add("mostrar"); }, 10);
                });
            });
        }
    
        if (closeButton && videoContainer) {
            // Cerrar el video con animación
            closeButton.addEventListener('click', function () {
                videoContainer.classList.remove("mostrar");
                setTimeout(() => { videoContainer.style.display = 'none'; }, 500);
            });
        }
    });
    


    //Animaciones botones
    function togglePressed(event) {
         const buttons = document.querySelectorAll('#myButton');
        buttons.forEach(button => {
            button.classList.remove('pressed');
        });
        const button = event.target;
        button.classList.add('pressed');
    }



// Obtén los elementos de los operadores
const agentes = document.querySelectorAll("#operadores img");

// Muestra el fondo de carga con el logo girando cuando se hace clic en un agente
// Cargar las URLs de los videos desde un archivo JSON
fetch('operadores.json')
    .then(response => response.json())
    .then(videos => {
        agentes.forEach(agente => {
            agente.addEventListener('click', function() {
                const agenteId = this.dataset.id; // Supongamos que cada agente tiene un data-id con su clave en el JSON
                
                // Muestra el fondo negro de carga
                document.getElementById("videoLoading").style.display = "flex";

                // Inicia la animación de deslizamiento desde abajo hacia arriba
                setTimeout(function() {
                    document.getElementById("videoLoading").style.height = "100%";  

                    // Simulamos un retraso para la pantalla de carga
                    setTimeout(function() {
                        // Obtenemos la URL del video desde el JSON
                        const videoUrl = videos[agenteId]; 
                        if (videoUrl) {
                            mostrarVideo(videoUrl);  
                        } else {
                            console.error("No se encontró un video para el agente:", agenteId);
                        }
                        ocultarFondoDeCarga();  
                    }, 2000);
                }, 0);
            });
        });
    })
    .catch(error => console.error("Error cargando el JSON:", error));


// Función para mostrar el video
function mostrarVideo(url) {
    const videoContainer = document.getElementById("videoContainer");
    const iframe = document.getElementById("videoIframe");
    
    iframe.src = url; 
    
    // Muestra el contenedor del video
    videoContainer.style.display = "flex";
    
    // Aseguramos que el contenedor tenga la clase para hacerlo visible con transición
    setTimeout(function() {
        videoContainer.classList.add("show");
    }, 100);  
}

// Función para ocultar el fondo de carga
function ocultarFondoDeCarga() {
    document.getElementById("videoLoading").style.height = "0";  
    //Tiempo que coincide con la animación
    setTimeout(function() {
        document.getElementById("videoLoading").style.display = "none";  
    }, 500);  
}


// Función para cerrar el video
document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById("closeVideo");
    const videoContainer = document.getElementById("videoContainer");
    const videoIframe = document.getElementById("videoIframe");

    if (closeButton && videoContainer && videoIframe) {
        // Guardar la URL original del video
        const videoSrc = videoIframe.src;

        closeButton.addEventListener('click', function() {
            // Ocultar el contenedor del video
            videoContainer.style.display = "none";

            // Detener el video al cerrarlo restableciendo la URL original
            videoIframe.src = '';
            setTimeout(() => {
                videoIframe.src = videoSrc; 
            }, 100);
        });
    }
});
