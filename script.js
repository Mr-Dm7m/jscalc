const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

// Calculator state variables
let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;

// Your existing operation functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
    if (b === 0) return "Infinity";
    return a / b; 
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "Error";
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            // Clear everything
            display.textContent = '0';
            firstNumber = null;
            currentOperator = null;
            resetDisplay = false;
        }
        else if (value === '=') {
            // Calculate the result
            if (currentOperator && firstNumber !== null) {
                const secondNumber = display.textContent;
                display.textContent = operate(currentOperator, firstNumber, secondNumber);
                firstNumber = null;
                currentOperator = null;
                resetDisplay = true;
            }
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            // Handle operator buttons
            if (currentOperator && firstNumber !== null) {
                // If we already have an operator, calculate the result first
                const secondNumber = display.textContent;
                display.textContent = operate(currentOperator, firstNumber, secondNumber);
            }
            firstNumber = display.textContent;
            currentOperator = value;
            resetDisplay = true;
        }
        else {
            // Handle number buttons
            if (display.textContent === '0' || resetDisplay) {
                display.textContent = value;
                resetDisplay = false;
            } else {
                display.textContent += value;
            }
        }
    });
});