// Datos extraídos de la fuente proporcionada [1]
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
    datosParte.forEach((item, index) => {
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

// Inicializar la carga
window.onload = renderData;
