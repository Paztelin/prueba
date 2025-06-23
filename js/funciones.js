class Calculator {
    constructor(operand1Elemt, operand2Elemt) {
        this.elemento1 = operand1Elemt; //elementos donde se escriben los numeros(pantalla)
        this.elemento2 = operand2Elemt;
        this.clear();
    }
    clear() {
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI();
    }
    updateUI() {
        this.elemento1.innerHTML = this.operand1 + this.operator;
        this.elemento2.innerHTML = this.operand2;
    }

    appendNumber(number) {
        if (number === "." && this.operand2.includes('.')) return;
        this.operand2 = this.operand2 === 0
            ? number
            : this.operand2.toString() + number;

        this.updateUI();
    }
    delete() {
        if (this.operand2 === 0) return;
        this.operand2 = +this.operand2.toString().slice(0, -1);
        this.updateUI();
    }
    operation(operator) {
        if (this.operator) {
            this.calc();
        }
        this.operator = operator;
        this.operand1 = +this.operand2 === 0 ? this.operand1 : this.operand2;
        this.operand2 = 0;
        this.updateUI();

    }
    calc() {
        switch (this.operator){
            case "+":
                this.operand1 = +this.operand1 + +this.operand2;
            break;

            case "-":
                this.operand1 = +this.operand1 - +this.operand2;
            break;

            case "*":
                this.operand1 = +this.operand1 * +this.operand2;
            break;

            case "/":
                this.operand1 = +this.operand1 / +this.operand2;
            break;
        }
        this.operator= "";
        this.operand2=0;
        this.updateUI();
    }
}

const elemento1=document.querySelector("[data-operand-1]");
const elemento2=document.querySelector("[data-operand-2]");
const clearButton=document.querySelector("[data-clear]");
const numberButtons=document.querySelectorAll("[data-number]");
const deleteButton=document.querySelector("[data-delete]");
const operationButtons=document.querySelectorAll("[data-operation]");
const equalsButtons=document.querySelector("[data-equals]");

const calculator = new Calculator(elemento1, elemento2);

clearButton.addEventListener("click", () =>{
    calculator.clear();
});

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerHTML);
    })
});

deleteButton.addEventListener('click',() =>{
    calculator.delete();
});

operationButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        calculator.operation(button.innerHTML);
    })
});

equalsButtons.addEventListener('click', () =>{
    calculator.calc();
});
