// Datos basados fielmente en la fuente proporcionada [1]
const sectores = [
    { nombre: "PABELLON 1", capacidad: 4 },
    { nombre: "PABELLON 2", capacidad: 30 },
    { nombre: "PABELLON 3", capacidad: 10 },
    { nombre: "PABELLON 4", capacidad: 4 },
    { nombre: "CELDA 5", capacidad: 2 },
    { nombre: "CELDA 6", capacidad: 4 },
    { nombre: "MUJERES", capacidad: 8 },
    { nombre: "MENORES", capacidad: 4 }
];

const container = document.getElementById('data-container');
const totalInternosEl = document.getElementById('total-internos');
const timestampEl = document.getElementById('timestamp');

// Renderiza las filas de datos
function init() {
    container.innerHTML = "";
    sectores.forEach(s => {
        const div = document.createElement('div');
        div.className = 'data-row';
        div.innerHTML = `
            <span class="section-name">${s.nombre}</span>
            <div class="values">
                <input type="number" class="internos-input" value="0" min="0">
                <span class="capacidad-box">${s.capacidad}</span>
            </div>
        `;
        container.appendChild(div);
    });

    // Actualizar fecha y hora al cargar
    actualizarFechaHora();

    // Event listeners para los inputs
    document.querySelectorAll('.internos-input').forEach(input => {
        input.addEventListener('input', calcularTotal);
    });

    // Event listener para el botón de PDF
    document.getElementById('btn-exportar').addEventListener('click', exportarPDF);
}

function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.internos-input').forEach(input => {
        total += parseInt(input.value) || 0;
    });
    totalInternosEl.innerText = total;
}

function actualizarFechaHora() {
    const ahora = new Date();
    const opciones = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    timestampEl.innerText = `Carga realizada el: ${ahora.toLocaleDateString('es-ES', opciones)}`;
}

function exportarPDF() {
    actualizarFechaHora(); // Asegurar que el PDF tenga la hora exacta del clic
    const elemento = document.getElementById('reporte-pdf');
    const boton = document.getElementById('btn-exportar');
    
    boton.style.visibility = 'hidden';

    const opciones = {
        margin: 0.5,
        filename: `Parte_Diario_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save().then(() => {
        boton.style.visibility = 'visible';
    });
}

window.onload = init;
