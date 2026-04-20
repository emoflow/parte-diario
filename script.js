// Datos de la fuente original [1]
const sectores = [
    { nombre: "PABELLON 1", cap: 4 },
    { nombre: "PABELLON 2", cap: 30 },
    { nombre: "PABELLON 3", cap: 10 },
    { nombre: "PABELLON 4", cap: 4 },
    { nombre: "CELDA 5", cap: 2 },
    { nombre: "CELDA 6", cap: 4 },
    { nombre: "MUJERES", cap: 8 },
    { nombre: "MENORES", cap: 4 }
];

const mainContainer = document.getElementById('data-container');
const totalEl = document.getElementById('total-internos');
const fechaEl = document.getElementById('fecha-actual');

function cargarSectores() {
    sectores.forEach(s => {
        const row = document.createElement('div');
        row.className = 'data-row';
        row.innerHTML = `
            <span class="section-name">${s.nombre}</span>
            <div class="values">
                <input type="number" class="internos-input" value="0" min="0">
                <span class="capacidad-val">${s.cap}</span>
            </div>
        `;
        mainContainer.appendChild(row);
    });

    // Evento para actualizar total
    document.querySelectorAll('.internos-input').forEach(input => {
        input.addEventListener('input', () => {
            let sum = 0;
            document.querySelectorAll('.internos-input').forEach(i => sum += Number(i.value) || 0);
            totalEl.innerText = sum;
        });
    });
}

function mostrarFecha() {
    const ahora = new Date();
    fechaEl.innerText = "Generado el: " + ahora.toLocaleString('es-ES', {
        dateStyle: 'long',
        timeStyle: 'short'
    });
}

function descargarPDF() {
    mostrarFecha(); // Actualiza la hora justo antes de exportar
    const element = document.getElementById('reporte-pdf');
    const btn = document.getElementById('btn-exportar');
    
    btn.style.display = 'none';

    html2pdf()
        .set({
            margin: 0.5,
            filename: 'parte-diario.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .then(() => btn.style.display = 'block');
}

// Inicialización
window.onload = () => {
    cargarSectores();
    mostrarFecha();
    document.getElementById('btn-exportar').onclick = descargarPDF;
};
