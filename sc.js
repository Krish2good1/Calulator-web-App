// Append value to the input field
function appendValue(value) {
    const result = document.getElementById('result');
    result.value += value;
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
    if (result.value.startsWith('-')) {
        result.value = result.value.slice(1);
    } else {
        result.value = '-' + result.value;
    }
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
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

        // Handle trigonometric functions sin functions
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => Math.sin(toRadians(eval(p1))));
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => Math.cos(toRadians(eval(p1))));
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => Math.tan(toRadians(eval(p1))));

        // Handle trigonometric functions sin invers functions
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

document.addEventListener('keydown', function (event) {
    const result = document.getElementById('result');
    if (!result) return;

    // Handle numeric input
    if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        appendValue(event.key);
    } 
    // Handle arithmetic operators
    else if (['+', '-', '*', '/'].includes(event.key)) {
        event.preventDefault();
        appendValue(event.key);
    } 
    // Handle Enter key for calculating the result
    else if (event.key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } 
    // Handle Backspace for removing the last character
    else if (event.key === 'Backspace') {
        event.preventDefault();
        clearResult();
    } 
    // Handle decimal point
    else if (event.key === '.') {
        event.preventDefault();
        appendValue('.');
    } 
    // Handle Escape key for clearing all input
    else if (event.key === 'Escape') {
        event.preventDefault();
        clearAll();
    }
});
