let string = "";
const buttons = document.querySelectorAll(".button");
const inputField = document.querySelector("input");

const CLEAR = "C";
const EQUALS = "=";

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

