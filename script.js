let string = "";
const buttons = document.querySelectorAll(".button");
const inputField = document.querySelector("input");

const CLEAR = "C";
const EQUALS = "=";

// Flag to prevent duplication between click and keypress
let isButtonClicked = false;

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
        if (isButtonClicked) {
            isButtonClicked = false;    //Reset flag after button is clicked
            return; // Skip keydown event if button is clicked
        }

    const key = e.key;

    if (key === "Enter") {
        // Trigger equals button
        try {
            string = eval(string);
            inputField.value = string;
        } catch (error) {
            inputField.value = "Error";
            string = "";
        }
        // Call the same logic as EQUALS button
    } else if (key === "c" || key === "C") {
        // Trigger clear button
        string = "";
        inputField.value = string;

    } else if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        // Add key pressed to the string if it's a valid number or operator
        string += key;
        inputField.value = string;
        // Handle other key presses
    }
});

    Array.from(buttons).forEach((button) => {
        button.addEventListener("click", (e) => {
            const clickedValue = e.target.value; // Use the value attribute instead of innerHTML

            if (clickedValue === EQUALS) {
                try {
                    string = eval(string);
                    inputField.value = string;
                } catch (error) {
                    inputField.value = "Error";
                    string = "";
                }
            } else if (clickedValue === CLEAR) {
                // Clear the input
                string = "";
                inputField.value = string;
            } else {
                // Add the clicked button's value to the string (instead of the innerHTML)
                string += clickedValue;
                inputField.value = string;
            }
        });
    });


    // Function to evaluate the expression


