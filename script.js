const display = document.getElementById('display');
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let operator;
let operatorDecimal

function updateDisplay(numero) {
    display.textContent += numero;
}
 
const insertNumber = (event) => {
     if (operator == "=" )
        clearCalc();
    operator = event.target.textContent;
    updateDisplay(operator);
}


numeros.forEach(numero => 
    numero.addEventListener("click", insertNumber));


const selectOperator = (event) => {
    if ( ("/*-+").includes(operator) ) return
    operator = event.target.textContent;
    operatorDecimal = undefined;
    updateDisplay(operator);
}


operadores.forEach(operator => operator.addEventListener("click", selectOperator));

const calculate = () => { 
    s = display.textContent.replace(/\b0*((\d+))\b/g, "$1") ; // 00 à esquerda, o EVAL entende como OCTAL!
    if (s == "") return;
    clearCalc();    
    updateDisplay(String( parseFloat(eval(`${s.replaceAll(",",".")}`)).toFixed(2)).replaceAll(".",","));
    operator = "="
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    operator = undefined;
    operatorDecimal = undefined;
    clearDisplay();
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => { 
    s = display.textContent;
    clearDisplay();
    updateDisplay(s.slice(0, -1) );
};

document.querySelector("#apagar").addEventListener("click", removeLastNumber);

const operarDecimal = (event) => {
    if (operatorDecimal ) return
    if (operator === "=") clearCalc();
    (operator && !("=+-*/").includes(operator)) ? updateDisplay(',') : updateDisplay('0,');
    operatorDecimal = event.target.textContent;
};

document.querySelector("#decimal").addEventListener("click", operarDecimal);

const invertSignal = () => {
    s = display.textContent;
    clearCalc();     
    updateDisplay(String(eval(`${s.replace(",",".") + ' * (-1)'}`)).replace(".",","));
}

document.querySelector("#inverter").addEventListener("click", invertSignal);
