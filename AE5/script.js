document.addEventListener('DOMContentLoaded', function () {
    const filtroSeleccionado = document.getElementById('filtroSeleccionado');
    const operadores = document.querySelectorAll('#operadores img');
    const masFiltros = document.getElementById('masFiltros');
    const filtrosDesplegables = document.getElementById('filtrosDesplegables');
    const resetFiltro = document.getElementById('resetFiltro');

    // Inicio las transiciones de los operadores
    operadores.forEach(op => {
        op.style.transition = 'opacity 1.5s ease, transform 0.5s ease';
    });

// Función para aplicar los filtros a los operadores
function aplicarFiltro() {
    operadores.forEach(op => {
        op.classList.remove('iluminado', 'unselected');
        op.style.transform = 'scale(1)';
        op.style.visibility = 'visible';
        op.style.opacity = '1';
        op.style.transition = 'filter 2s ease';
        op.style.filter = 'grayscale(0%)';
    });

    if (filtroSeleccionado.value === "") {
        operadores.forEach(op => {
            op.style.filter = 'grayscale(0%)';
            op.classList.remove('unselected');
        });
        return;
    }

    operadores.forEach(op => {
        if (op.classList.contains(filtroSeleccionado.value)) {
            op.classList.add('iluminado');
            op.style.filter = 'grayscale(0%)';
        } else {
            op.style.filter = 'grayscale(100%)';
            setTimeout(() => {
                op.classList.add('unselected');
            }, 50);
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

// Cargo los operadores desde el JSON
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

// Animación de los botones al clickar
function togglePressed(event) {
    const buttons = document.querySelectorAll('#myButton');
    buttons.forEach(button => {
        button.classList.remove('pressed');
    });
    const button = event.target;
    button.classList.add('pressed');
}

// Gestión de videos de los agentes
const agentes = document.querySelectorAll("#operadores img");

fetch('operadores.json')
    .then(response => response.json())
    .then(videos => {
        agentes.forEach(agente => {
            agente.addEventListener('click', function() {
                const agenteId = this.dataset.id;
                
                document.getElementById("videoLoading").style.display = "flex";

                setTimeout(function() {
                    document.getElementById("videoLoading").style.height = "100%";  

                    setTimeout(function() {
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
    });

// Función para mostrar el video
function mostrarVideo(url) {
    const videoContainer = document.getElementById("videoContainer");
    const iframe = document.getElementById("videoIframe");
    
    iframe.src = url;  
    
    videoContainer.style.display = "flex";
    
    setTimeout(function() {
        videoContainer.classList.add("show");
    }, 100);  
}

// Función para ocultar el fondo de carga
function ocultarFondoDeCarga() {
    document.getElementById("videoLoading").style.height = "0";  
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
        const videoSrc = videoIframe.src;

        closeButton.addEventListener('click', function() {
            videoContainer.style.display = "none";

            videoIframe.src = '';
            setTimeout(() => {
                videoIframe.src = videoSrc; 
            }, 100);
        });
    }
});
