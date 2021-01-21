function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(number) {
    document.getElementById("history-value").innerText = number;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(number) {
    if (number == "") {
        document.getElementById("output-value").innerText = number;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(number);
    }
}

function getFormattedNumber(number) {
    if (number == "-") {
        return "";
    }
    let n = Number(number);
    let value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(number) {
    return Number(number.replace(/,/g, '')); //replace , with " "
}

let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "clear") { //if it is C
            printHistory(""); //clear the history and output
            printOutput("");
        } else if (this.id == "backspace") { //If it is CE
            let output = reverseNumberFormat(getOutput()).toString(); //take output, replace commas with spaces and return it as a string
            if (output) {
                output = output.substr(0, output.length - 1); //cut the last char
                printOutput(output); //print it
            }
        } else {
            let output = getOutput();
            let history = getHistory();
            if (output == "" && history != "") { //if output is empty and history is not, that means you type the number
                if (isNaN(history[history.length - 1])) { //if number before operator is really number
                    history = history.substr(0, history.length - 1); //cut the operator sign from history string
                }
            }
            if (output != "" || history != "") { //if both history and output are clear
                output = output == "" ? output : reverseNumberFormat(output); //if output is clear, place output in output, else make function
                history = history + output; //add history and output
                if (this.id == "=") { //if it is =
                    let result = eval(history); //place result in result variable
                    printOutput(result); //print the result
                    printHistory(""); //clear the history
                } else if (this.id == "/" || this.id == "+" || this.id == "-" || this.id == "*") { //if it is +,-,*,/
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                } else {
                    output += ".";
                }
            }
        }

    });
}
let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        let output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    });
}