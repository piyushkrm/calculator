let string = "";
const buttons = document.querySelectorAll(".button");
const inputField = document.querySelector("input");

const CLEAR = "C";
const EQUALS = "=";
const BACKSPACE = "←";

let isResult = false;

// Keyboard support
document.addEventListener("keydown", handleKeyboardInput);

// Button click support
Array.from(buttons).forEach((button) => {
    button.addEventListener("click", (e) => {
        const clickedValue = e.target.value;
        handleButtonInput(clickedValue);  // Correct function to handle button clicks
    });
});

// Handle keyboard input
function handleKeyboardInput(e) {
    const key = e.key;
    if (key === "Enter") {
        evaluateExpression();
    } else if (key === "Escape" || key === "C" || key === "c") {
        clearInput();
    } else if (key === "Backspace") {
        backspace();
    } else if (/[\d+\-*/.]/.test(key)) {
        processInput(key);
    } else {
        e.preventDefault();
    }
}

// Handle button input
function handleButtonInput(value) {
    if (value === EQUALS) {
        evaluateExpression();
    } else if (value === CLEAR) {
        clearInput();
    } else if (value === BACKSPACE) {
        backspace();
    } else {
        processInput(value);
    }
}

// Process the input and update the display
function processInput(input) {
    if (isResult && ["+", "-", "*", "/"].includes(input)) {
        string = inputField.value; // Reset the input field to current result
        isResult = false;
    }

    // Prevent multiple consecutive operators
    if (["+", "-", "*", "/"].includes(input) && ["+", "-", "*", "/"].includes(string.slice(-1))) {
        return; // Prevent adding multiple operators
    }

    string += input;
    inputField.value = string;
    adjustFontSize();
}

// Evaluate the current expression
function evaluateExpression() {
    try {
        // Prevent division by zero error
        if (string.includes("/") && string.split("/").pop() === "0") {
            throw new Error("Division by zero");
        }

        if (string.trim() !== "") {
            string = eval(string); // Evaluate the expression
            inputField.value = string;
            isResult = true; // Set flag to true for next calculation
            adjustFontSize();
        }
    } catch (error) {
        inputField.value = error.message === "Division by zero" ? "Error: Division by zero" : "Error: Invalid input";
        string = ""; // Clear the input for safety
        isResult = false; // Reset the flag for next calculation
        adjustFontSize();
    }
}

// Clear the input
function clearInput() {
    string = "";
    inputField.value = string; // Correct reference
    adjustFontSize();
}

// Handle backspace (delete last character)
function backspace() {
    string = string.slice(0, -1);
    inputField.value = string;
    adjustFontSize();
}

// Adjust the font size and color based on the length of the input
function adjustFontSize() {
    const length = inputField.value.length;

    if (length > 15) {
        inputField.style.fontSize = "20px"; // Very small font for long inputs
    } else if (length > 10) {
        inputField.style.fontSize = "25px"; // Medium-small font size
    } else if (length > 5) {
        inputField.style.fontSize = "28px"; // Medium font size
    } else {
        inputField.style.fontSize = "35px"; // Default large font size
    }

    // Adjust the height based on the number of characters
    const newHeight = Math.max(50, Math.min(200, length * 3)); // Adjust the multiplier to suit your needs
    inputField.style.height = newHeight + 'px'; // Dynamically set the height
}
