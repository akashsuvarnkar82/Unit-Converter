// Conversion Form Constant Variables
const lengthForm = document.getElementById('length');
const temperatureForm = document.getElementById('temperature');
const areaForm = document.getElementById('area');
const weightForm = document.getElementById('weight');
const timeForm = document.getElementById('time');

// Hide Form
temperatureForm.style.display = "none";
lengthForm.style.display = "none";
areaForm.style.display = "none";
weightForm.style.display = "none";
timeForm.style.display = "none";

// Display Form by Category
const conversionCategory = document.getElementById('conversionCategory');

conversionCategory.addEventListener('change', function() {
    const conversionValue = conversionCategory.value;

    // If statement for form display
    temperatureForm.style.display = conversionValue === "temperature" ? "" : "none";
    lengthForm.style.display = conversionValue === "length" ? "" : "none";
    areaForm.style.display = conversionValue === "area" ? "" : "none";
    weightForm.style.display = conversionValue === "weight" ? "" : "none";
    timeForm.style.display = conversionValue === "time" ? "" : "none";
});

// Function to save conversion data to the server
async function saveConversionData(type, fromUnit, toUnit, value, result) {
    const conversionData = { type, fromUnit, toUnit, value, result };

    try {
        const response = await fetch('http://localhost:5000/api/conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(conversionData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Conversion data saved:', await response.json());
    } catch (error) {
        console.error('Error saving conversion data:', error);
    }
}

// Temperature Conversion Function
function convertTemperature() {
    const inputValue = parseFloat(document.getElementById("temperatureInput").value);
    const fromUnit = document.getElementById("fromTemperatureUnit").value;
    const toUnit = document.getElementById("toTemperatureUnit").value;

    let result;
    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        result = (inputValue * 9/5) + 32;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        result = inputValue + 273.15;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        result = (inputValue - 32) * 5/9;
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        result = (inputValue - 32) * 5/9 + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        result = inputValue - 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        result = (inputValue - 273.15) * 9/5 + 32;
    } else {
        result = inputValue;
    }

    document.getElementById("temperatureResult").textContent = `Result: ${result.toFixed(2)}`;
    saveConversionData("temperature", fromUnit, toUnit, inputValue, result);
}

// Similar conversion functions for Area, Weight, Length, and Time...

// Call saveConversionData in each conversion function similarly...