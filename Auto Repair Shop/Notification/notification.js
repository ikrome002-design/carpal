// script.js

// Sample vehicle data (replace with data fetched from database)
const vehicleData = [
    { license: "KCA123B", checkin: "2023-10-26", checkout: "2023-10-27" },
    { license: "KCB456C", checkin: "2023-10-25", checkout: null }, // Example of ongoing service
    // ... more vehicle data
];

const vehicleList = document.getElementById('vehicle-list');
const vehicleDetails = document.getElementById('vehicle-details');
const detailLicense = document.getElementById('detail-license');
const detailCheckin = document.getElementById('detail-checkin');
const detailCheckout = document.getElementById('detail-checkout');

// Populate vehicle list
vehicleData.forEach(vehicle => {
    const listItem = document.createElement('li');
    listItem.textContent = `${vehicle.license} (${vehicle.checkin})`;
    listItem.dataset.license = vehicle.license; // Store license plate in data attribute
    listItem.addEventListener('click', () => showVehicleDetails(vehicle.license));
    vehicleList.appendChild(listItem);
});


function showVehicleDetails(license) {
    const vehicle = vehicleData.find(v => v.license === license);
    if (vehicle) {
        detailLicense.textContent = vehicle.license;
        detailCheckin.textContent = vehicle.checkin;
        detailCheckout.textContent = vehicle.checkout || "Ongoing"; // Handle ongoing services

        vehicleList.style.display = 'none'; // Hide vehicle list
        vehicleDetails.style.display = 'block'; // Show details section


        // Fetch and display service documentation for the selected vehicle (AJAX call to backend)
        // Example:
        // fetch(`/api/service-history/${license}`)
        // .then(response => response.json())
        // .then(data => {
        //     // Populate service documentation sections with data
        //     // ...
        // });

    }
}

// Add search and sort functionality (using filter and sort methods on vehicleData)
// ...

