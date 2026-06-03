// script.js
const newVehicleBtn = document.getElementById('newVehicleBtn');
const existingVehicleBtn = document.getElementById('existingVehicleBtn');
const newVehicleForm = document.getElementById('newVehicleForm');
const existingVehicleForm = document.getElementById('existingVehicleForm');

newVehicleBtn.addEventListener('click', () => {
    newVehicleForm.style.display = 'block';
    existingVehicleForm.style.display = 'none';
});

existingVehicleBtn.addEventListener('click', () => {
    existingVehicleForm.style.display = 'block';
    newVehicleForm.style.display = 'none';
});

// ... (Add further JavaScript for form submission, validation, 
// dynamic form generation for component assessment, etc.) ...
