// getting elements
const inputSection = document.getElementById("input-section");
const orderSection = document.getElementById("order-section");
const coefficientSection = document.getElementById("coefficient-section");

let coefficientInputs = document.getElementsByClassName("coefficient-input");

const orderInput = document.getElementById("order-input");
const orderOuput = document.getElementById("order-output");

const button = document.getElementById("button");

const outputSection = document.getElementById("output-section");
const solutionList = document.getElementById("solution-list");
const linearFactorList = document.getElementById("linear-factor-list");



// localstorage for calculation counter
if (!localStorage.calculations){
    localStorage.setItem("calculations",0);
    setTimeout(help, 3200);
}
const calculations = document.getElementById("calculations");
calculations.textContent = localStorage.calculations


// defining important variables / arrays
let order;
let coefficients = [];
let solutions = [];


// getting order input and setting the eqution input
orderInput.value = 3;
order = orderInput.value;
orderOuput.innerHTML = order;

let setEquation = order => {
    coefficientSection.innerText = "";

    for (i = order; i >= 0; i--) {
        let span = document.createElement("span");



        let input = document.createElement("input");
        input.type = "number"
        input.required = true;
        input.placeholder = 1;
        input.classList.add("coefficient-input");
        span.appendChild(input);




        let expression = document.createElement("span");
        expression.textContent = "x";


        let sup = document.createElement("sup");
        sup.textContent = i;
        expression.appendChild(sup);

        let operator = document.createElement("span");
        if (i > 0) {
            operator.textContent = " +";
        } else {
            operator.textContent = " = 0";
        }
        expression.appendChild(operator);

        span.appendChild(expression)


        coefficientSection.appendChild(span);
    }


    coefficientInputs = document.getElementsByClassName("coefficient-input");

    for (i of coefficientInputs) {
        i.addEventListener("focus", toInputView);
    }

    orderInput.addEventListener("input", toInputView)
}
setEquation(order);

orderInput.addEventListener("input", () => {
    orderInput.setAttribute("max", parseInt(window.innerWidth / 100));

    order = orderInput.value;
    orderOuput.innerHTML = order;

    setEquation(order);
});






// process after clicking the button
let run = () => {
    clearOuput();

    getCoefficients();
    solveEquation();
    setSolutions();
    

    localStorage.calculations = parseInt(localStorage.calculations) + 1;
    calculations.textContent = localStorage.calculations

    toOuputView();
}
button.addEventListener("click", run);


// switching between input and output view
function toOuputView() {
    inputSection.classList.add("minimized");
    button.classList.add("minimized");
}
function toInputView() {
    inputSection.classList.remove("minimized");

    button.classList.remove("minimized");
    button.textContent = "Run";
}


// clearing the output
function clearOuput() {
    console.clear();

    solutionList.innerHTML = "";
    let solutionHeader = document.createElement("li");
    solutionHeader.textContent = "solution";
    solutionHeader.style = "font-weight: bold";
    solutionList.appendChild(solutionHeader);

    linearFactorList.innerHTML = "";
    linearFactorList.style.display = "flex"; // if no solutions, display wasset to "none"
    let linearFactorHeader = document.createElement("li");
    linearFactorHeader.textContent = "linear factor";
    linearFactorHeader.style = "font-weight: bold";
    linearFactorList.appendChild(linearFactorHeader);
}


// getting coefficients from the input elements and saving them in the coefficients array
function getCoefficients() {

    coefficients = [];
    solutions = [];

    coefficientInputs = document.getElementsByClassName("coefficient-input");

    for (i = 0; i < coefficientInputs.length; i++) {

        coefficients[i] = coefficientInputs[i].value;

        if (coefficients[i] == ""){
            coefficients[i] = coefficientInputs[i].placeholder;
        }

        coefficients[i] = parseFloat(coefficients[i]);
    }

    console.log("coefficients: " + coefficients);

    coefficients.reverse();
}

// solving the equation and saving the results in the solutions array
function solveEquation() {
    console.time("solvingTime");
    let n = -2000;
    while (n <= 2000) {
        let sum = 0;

        for (i = 0; i < coefficients.length; i++) {
            sum += (coefficients[i] * ((n/100) ** i));
        }

        if (sum == 0) {
            solutions.push(n/100);
        }

        n++;
    }
    console.timeEnd("solvingTime");
}

// setting the solutions and linear factors in the output section
function setSolutions() {

    button.textContent = "solutions: " + solutions.length;
    console.log("solutions: " + `(determined: ${solutions.length})`);

    for (i = 0; i < solutions.length; i++) {

        let solutionItem = document.createElement("li");
        let solution = solutions[i];
        solutionItem.textContent = solution;
        if (solution >= 0) {
            solutionItem.style.paddingLeft = "4px";
        }
        solutionList.appendChild(solutionItem);


        let linearFactorItem = document.createElement("li");
        let linearFactor;

        if (solutions[i] > 0) {
            linearFactor = `(x - ${solutions[i]})`;
        } else if (solutions[i] == 0) {
            linearFactor = "x"
        } else if (solutions[i] < 0) {
            linearFactor = `(x + ${-solutions[i]})`
        }

        linearFactorItem.textContent = linearFactor
        linearFactorList.appendChild(linearFactorItem);


        console.log(`${solution} -> ${linearFactor}`);
    }

    if (solutions.length == 0) {
        solutionList.textContent = "";
        linearFactorList.textContent = "";

        linearFactorList.style.display = "none";
        let message = document.createElement("li");
        message.innerText = "no solutions determined";
        solutionList.appendChild(message);
    }
}




// defining key listeners
document.addEventListener('keydown', event =>  {
    var key = event.key;   
    var code = event.code;
    // console.log("key: " + key);
    // console.log("code: " + code);

    if (code == "Tab") {
        toInputView();
    } else if (code == "Enter") {
        run();
    } else  if (key == "h"){
        help()
    }

});


// help
function help() {
    alert("Welcome to the equation solver! \nI'll give you a short introduction.");
    alert("First of all set the order of your equation by moving the slider while watching your input change above.");
    alert("Next insert the coefficients of your expanded equation. \nUse negative signs if necessary as the equation is written as a sum.");
    alert("Finally click the run button so that you get displayed the whole solutions of your equation.");
    alert("You will also see the number of solutions in the button and the corresponding linear factor at the right of each solution.");
    alert("Just update your input to run the next equation.");
    alert("I hope you enjoy this powerful and simple tool and it makes your live a bit easier!");
    alert("Furthermore if you have any ideas you want to share or you want to report a bug, just hover over the info label and click the link in the footer.");
    alert("Just click the h-key on your keyboard to repeat this short tutorial. \nLet's get started!");
}