$(document).ready(function () {
 
    let tollEntries = [];
 
    $("#submit-entry").click(function () {
 
        const vehicleType = $("#vehicle-type").val();
 
        const registrationNumber = $("#registration-number").val();
 
        let tollAmount;
 
        switch (vehicleType) {
 
            case "Bike":
 
                tollAmount = 50;
 
                break;
 
            case "LMV":
 
                tollAmount = 100;
 
                break;
 
            case "HMV":
 
                tollAmount = 200;
 
                break;
 
            case "HeavyTruck":
 
                tollAmount = 300;
 
                break;
 
            default:
 
                tollAmount = 0;
 
        }
 
 
        const entry = {
 
            vehicleType,
 
            registrationNumber,
 
            tollAmount
 
        };
 
 
        tollEntries.push(entry);
 
        updateStatistics();
 
        $("#vehicle-type").val("");
 
        $("#registration-number").val("");
 
    });
 
 
    function updateStatistics() {
 
        $("#statistics-list").empty();
 
        const groupedEntries = tollEntries.reduce((acc, entry) => {
 
            if (!acc[entry.vehicleType]) {
 
                acc[entry.vehicleType] = {
 
                    totalAmount: 0,
 
                    count: 0
 
                };
 
            }
 
            acc[entry.vehicleType].totalAmount += entry.tollAmount;
 
            acc[entry.vehicleType].count++;
 
            return acc;
 
        }, {});
 
 
        for (const vehicleType in groupedEntries) {
 
            const { totalAmount, count } = groupedEntries[vehicleType];
 
            $("#statistics-list").append(`<li>${vehicleType}: Total Amount - ${totalAmount}, Count - ${count}</li>`);
 
        }
 
    }
 
    $("#search-button").click(function () {
 
        const searchCategory = $("#search-category").val();
 
        const searchRegNumber = $("#search-registration-number").val();
 
        const filteredEntries = tollEntries.filter((entry) => {
 
            if (searchCategory && entry.vehicleType !== searchCategory) {
 
                return false;
 
            }
 
            if (searchRegNumber && entry.registrationNumber !== searchRegNumber) {
 
                return false;
 
            }
 
            return true;
 
        });
 
        $("#statistics-list").empty();
 
        for (const entry of filteredEntries) {
 
            $("#statistics-list").append(`<li>${entry.vehicleType}: Registration Number - ${entry.registrationNumber}, Toll Amount - ${entry.tollAmount}</li>`);
 
        }
 
    });
 
 });