window.onload = function() {
    document.getElementById('display').value = '0';
}

function appendToDisplay(value) {
    let display = document.getElementById('display');
    let currentValue = display.value;

    if (currentValue === '0' && !isNaN(value)) {
        display.value = value;
    } else {

        const operators = ['+', '-', '×', '÷', '%'];

        if (operators.includes(currentValue.slice(-1)) && operators.includes(value)) {
            display.value = currentValue.slice(0, -1) + value;
        } else {
            display.value += value;
        }
    }

    adjustFontSize(); 
    updateClearButton(); 
}

function clearDisplay() {
    let display = document.getElementById('display');
    let clearButton = document.getElementById('AC');

    display.value = '0';

    clearButton.textContent = "AC";

    resetFontSize();
}

function calculate() {
    let display = document.getElementById('display');
    let expression = display.value.trim();

    try {

        expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

      
        if (/[\+\-\*\/]$/.test(expression)) {
            throw new Error("Incomplete expression");
        }

        let result = eval(expression);

        if (result === undefined || isNaN(result)) {
            throw new Error("Invalid result");
        }

        display.value = result;

        adjustFontSize();

    } catch (e) {
        display.value = 'Error';
        console.error("Error evaluating expression:", e.message);
    }
}

function toggleSign() {
    let display = document.getElementById('display');
    let currentValue = display.value;

    if (currentValue.startsWith('-')) {
        display.value = currentValue.substring(1);
    } else if (currentValue !== '0') {
        display.value = '-' + currentValue;
    }
}

function adjustFontSize() {
    let display = document.getElementById('display');
    let contentLength = display.value.length;

    if (contentLength > 15) {
        display.style.fontSize = '20px'; 
    } else if (contentLength > 10) {
        display.style.fontSize = '30px';
    } else {
        display.style.fontSize = '50px'; 
    }
}

function resetFontSize() {
    let display = document.getElementById('display');
    display.style.fontSize = '50px'; 
}

function updateClearButton() {
    let clearButton = document.getElementById('AC');
    let display = document.getElementById('display');

    if (display.value !== '0') {
        clearButton.textContent = "C";
    } else {
        clearButton.textContent = "AC";
    }
}

