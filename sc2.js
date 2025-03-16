function appendValue(value) {
    const result = document.getElementById('result');
    if (value === '3√') {
        if (result && result.value) {
            // Parse the current value as a number
            const numberToCubeRoot = parseFloat(result.value);
            if (!isNaN(numberToCubeRoot)) {
                // Calculate the cube root and update the input field
                const cubeRootResult = Math.cbrt(numberToCubeRoot);
                result.value = cubeRootResult.toFixed(6); // Round to 6 decimal places
            } else {
                alert('Please enter a valid number to find its cube root.');
            }
        } else {
            alert('Please enter a number before applying the cube root.');
        }
    } else if (value === 'e^x') {
        calculateExponential(); // Call the calculateExponential function
    } else {
        // Append other values to the input field
        if (result) result.value += value;
    }
}

// Clear the result field
function clearAll() {
    const resultInput = document.getElementById("result");
    resultInput.value = '';
}

function clearResult() {
    const resultInput = document.getElementById("result");
    resultInput.value = resultInput.value.slice(0, -1); // Remove the last character
}


// Toggle the sign of the current value
function toggleSign() {
    const result = document.getElementById('result');
    if (result) {
        if (result.value.startsWith('-')) {
            result.value = result.value.slice(1);
        } else {
            result.value = '-' + result.value;
        }
    }
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Convert radians to degrees
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Factorial calculation
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculateExponential() {
    // Get the input value from the result display
    const inputElement = document.querySelector('.result-display');
    const inputValue = parseFloat(inputElement.value);

    // Check if the input is a valid number
    if (isNaN(inputValue)) {
        inputElement.value = 'Invalid Input';
        return;
    }

    // Display e^x and then calculate
    inputElement.value = `e^${inputValue}`;

    setTimeout(() => {
        // Calculate e^x using Math.exp()
        const result = Math.exp(inputValue);

        // Display the result in the input field
        inputElement.value = result;
    }, 500); // Adding delay to show e^x first
}

// Calculate the result
function calculateResult() {
    const result = document.getElementById('result');
    try {
        let expression = result.value;

        // Replace constants
        expression = expression.replace(/PI/g, Math.PI).replace(/e/g, Math.E);

        // Handle factorial
        expression = expression.replace(/(\d+)!/g, (match, p1) => factorial(parseInt(p1)));

        // Handle exponentiation
        expression = expression.replace(/(\d+)\^(\d+)/g, (match, p1, p2) => Math.pow(parseFloat(p1), parseFloat(p2)));

        // Handle trigonometric functions
        expression = expression.replace(/asin\(([^)]+)\)/g, (match, p1) => toDegrees(Math.asin(eval(p1))));
        expression = expression.replace(/acos\(([^)]+)\)/g, (match, p1) => toDegrees(Math.acos(eval(p1))));
        expression = expression.replace(/atan\(([^)]+)\)/g, (match, p1) => toDegrees(Math.atan(eval(p1))));
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => Math.sin(toRadians(eval(p1))));
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => Math.cos(toRadians(eval(p1))));
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => Math.tan(toRadians(eval(p1))));

        // Handle logarithmic functions
        expression = expression.replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(');

        // Handle square root
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');

        // Evaluate the expression
        result.value = eval(expression);
    } catch (error) {
        result.value = 'Error';
    }
}
