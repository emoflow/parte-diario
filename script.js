const datosParte = [
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

function renderData() {
    datosParte.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'data-row';
        row.innerHTML = `
            <span class="section-name">${item.nombre}</span>
            <div class="values">
                <input type="number" class="internos-input" value="0" min="0" onchange="updateTotal()">
                <span class="capacidad-box">${item.capacidad}</span>
            </div>
        `;
        container.appendChild(row);
    });
}

function updateTotal() {
    const inputs = document.querySelectorAll('.internos-input');
    let total = 0;
    inputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    totalInternosEl.innerText = total;
}

// Función para exportar a PDF
function exportarPDF() {
    const elemento = document.getElementById('reporte-pdf');
    const boton = document.getElementById('btn-exportar');
    
    // Ocultar botón temporalmente para que no salga en el PDF
    boton.style.display = 'none';

    const opciones = {
        margin: 1,
        filename: 'Parte_Diario_Internos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save().then(() => {
        boton.style.display = 'block'; // Volver a mostrar el botón
    });
}

window.onload = renderData;
