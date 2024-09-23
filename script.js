let string = "";
const buttons = document.querySelectorAll(".button");
const inputField = document.querySelector("input");

const CLEAR = "C";
const EQUAL = "=";

try {
    Array.from(buttons).forEach((button) => {
        button.addEventListener("click", (e) => {
            const clickedValue = e.target.value; // Use the value attribute instead of innerHTML

            if (e.target.innerHTML === "=") {
                try {
                    string = eval(string);
                    document.querySelector('input').value = string;
                } catch (error) {
                    document.querySelector('input').value = "Error";
                    string = "";
                }
            } else if (e.target.innerHTML === "C") {
                // Clear the input
                string = "";
                document.querySelector('input').value = string;
            } else {
                // Add the clicked button's value to the string (instead of the innerHTML)
                string += clickedValue;
                document.querySelector('input').value = string;
            }
        });
    });
} catch (error) {
    console.error(error);
    document.querySelector('input').value = "Error";
}
