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
    container.innerHTML = ""; // Limpiar antes de renderizar
    datosParte.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'data-row';
        row.innerHTML = `
            <span class="section-name">${item.nombre}</span>
            <div class="values">
                <input type="number" class="internos-input" value="0" min="0">
                <span class="capacidad-box">${item.capacidad}</span>
            </div>
        `;
        container.appendChild(row);
    });

    // Escuchar cambios en los inputs para actualizar el total
    document.querySelectorAll('.internos-input').forEach(input => {
        input.addEventListener('input', updateTotal);
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

// Nueva forma de asignar la función de exportar
function exportarPDF() {
    const elemento = document.getElementById('reporte-pdf');
    const boton = document.getElementById('btn-exportar');
    
    boton.style.display = 'none'; // Ocultar para el PDF

    const opciones = {
        margin: 0.5,
        filename: 'Parte_Diario_Internos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save().then(() => {
        boton.style.display = 'block';
    });
}

// Inicialización segura
window.onload = () => {
    renderData();
    // Asignar el evento click aquí soluciona el ReferenceError
    const btn = document.getElementById('btn-exportar');
    if (btn) {
        btn.addEventListener('click', exportarPDF);
    }
};
