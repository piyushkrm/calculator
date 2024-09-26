let string = "";
const buttons = document.querySelectorAll(".button");
const inputField = document.querySelector("input");

const CLEAR = "C";
const EQUALS = "=";

let isResult = false; //

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Enter") {
        if (isResult) {
            return; // Prevent evaluation if the last action was a result
        }
        evaluateExpression();
    } else if (key === "Escape" || key === "C" || key === "c") {
        clearInput();
    } else if (key === "Backspace") {
        backspace();
    } else if (/[\d+\-*/.]/.test(key)) {

        if (isResult && ["+", "-", "*", "/"].includes(key)){
            string = inputField.value;   //// Reset the string to the current result
            isResult = false; //Reset the flag
        }

        // Check if the last character is an operator
        // Check for multiple operators
        if (["+", "-", "*", "/"].includes(key) && ["+", "-", "*", "/"].includes(string.slice(-1))){
            return; //Prevent adding multiple operators
        }
        string += key;
        inputField.value = string;
    } else {
        // Prevent any other characters from being entered
        e.preventDefault();
    }
});

Array.from(buttons).forEach((button) => {
    button.addEventListener("click", (e) => {
        const clickedValue = e.target.value;

        if (clickedValue === EQUALS) {
            evaluateExpression();
        } else if (clickedValue === CLEAR) {
            clearInput();
        } else if (clickedValue === "←") {
            backspace();
        } else if (/[\d+\-*/.]/.test(clickedValue)) {
            if (["+", "-", "*", "/"].includes(clickedValue) && ["+", "-", "*", "/"].includes(string.slice(-1))) {
                // prevent adding multiple operators in a row
                return;
            }
            string += clickedValue;
            inputField.value = string;
        }
    });
});

// Function to evaluate the expression
function evaluateExpression() {
    try {
        // Check for division by zero before eval
        if (string.includes("/") && string.split("/").pop() === "0") {
            throw new Error("Division by zero");
        }

        // Try to evaluate the expression
        if (string.trim() !== "") {
            string = eval(string);
            inputField.value = string;
            isResult = true; // Set flag to true for next calculation
        }
    } catch (error) {
        // Display specific error messages
        if (error.message === "Division by zero") {
            inputField.value = "Error: Division by zero";
        } else {
            inputField.value = "Error: Invalid input";
        }
        string = ""; // Clear the string for safety
        isResult = false; // Reset the flag for next calculation
    }
}

// You can adjust the font size based on the length of the input string

function adjustFontSize() {
    const length = inputField.value.length;


    if (length > 10) {
        inputField.style.fontSize = "18px" // Decrease font size
    } else if (length > 5) {
        inputField.style.fontSize = "24px" // Medium font size
    } else {
        inputField.style.fontSize = "32px" // Default large font size
    }
}

// Call this function whenever the input changes
inputField.addEventListener('input', adjustFontSize);

// Function to clear the input
function clearInput() {
    string = "";
    inputField.value = string;
}

// Backspace button function

function backspace() {
    string = string.slice(0, -1);
    inputField.value = string;
}