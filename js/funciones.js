setTimeout(() => {
    class Calculator {
        constructor(displayElement) {
            this.displayElement = displayElement;
            this.clear();
        }

        clear() {
            this.currentValue = '';
            this.updateUI();
        }

        formatNumber(value) {
            const number = parseFloat(value.replace(/,/g, ''));
            if (isNaN(number)) return '';
            return number.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        updateUI() {
            this.displayElement.textContent = this.formatNumber(this.currentValue);
        }

        appendNumber(number) {
            if (number === '.' && this.currentValue.includes('.')) return;

            // Agrega número normalmente como string sin formatear
            this.currentValue += number;

            this.updateUI();
        }

        delete() {
            this.currentValue = this.currentValue.slice(0, -1);
            this.updateUI();
        }

        confirm() {
            const inputPropina = document.querySelector(".input-propina");
            if (inputPropina && this.currentValue !== '') {
                const formatted = this.formatNumber(this.currentValue);
                inputPropina.value = `$${formatted}`;
                this.clear();
            }
        }

        editInput() {
            const inputPropina = document.querySelector(".input-propina");
            if (inputPropina) {
                inputPropina.value = '';
                this.clear();
            }
        }
    }

    // Obtener elementos del DOM
    const display = document.querySelector("[data-operand-1]");
    const botonesNumero = document.querySelectorAll("[data-number]");
    const btnBorrar = document.querySelector("[data-delete]");
    const btnOk = document.querySelector("[data-ok]");
    const btnEditar = document.querySelector(".edit");

    const calculator = new Calculator(display);

    botonesNumero.forEach(button => {
        button.addEventListener("click", () => {
            calculator.appendNumber(button.textContent);
        });
    });

    btnBorrar.addEventListener("click", () => {
        calculator.delete();
    });

    btnOk.addEventListener("click", () => {
        calculator.confirm();
    });

    btnEditar.addEventListener("click", () => {
        calculator.editInput();
    });

}, 100);






/*class Calculator {
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
    okay(){

    }
}

const elemto1=document.querySelector("[data-operand-1]");
//const elemto2=document.querySelector("[]");
const botones=document.querySelectorAll("[data-number]");
const btnBorrar=document.querySelector("[data-delete]");
const btnOK=document.querySelector("[data-ok]");

const calculator = new Calculator(elemto1);

botones.forEach(button =>{
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerHTML);
    })
});

btnBorrar.addEventListener("click", () =>{
    calculator.delete();
});

btnOK.addEventListener("click", () =>{
    calculator.okay();
});

*/



/*setTimeout(() => {
    // 👇 Aquí va todo tu código de instanciación
    const elemento1 = document.querySelector("[data-operand-1]");
    const elemento2 = document.querySelector("[data-operand-2]");
    const clearButton = document.querySelector("[data-clear]");
    const numberButtons = document.querySelectorAll("[data-number]");
    const deleteButton = document.querySelector("[data-delete]");
    const operationButtons = document.querySelectorAll("[data-operation]");
    const equalsButtons = document.querySelector("[data-equals]");

    if (!elemento1 || !elemento2) return; // proteger si aún no cargó

    const calculator = new Calculator(elemento1, elemento2);

    clearButton.addEventListener("click", () => {
        calculator.clear();
    });

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerHTML);
        });
    });

    deleteButton.addEventListener('click', () => {
        calculator.delete();
    });

    operationButtons.forEach(button => {
        button.addEventListener("click", () => {
            calculator.operation(button.innerHTML);
        });
    });

    equalsButtons.addEventListener('click', () => {
        calculator.calc();
    });

}, 300); // espera 300ms para que se cargue el HTML parcial

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
        switch (this.operator) {
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
        this.operator = "";
        this.operand2 = 0;
        this.updateUI();
    }
}

const elemento1 = document.querySelector("[data-operand-1]");
const elemento2 = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");

const calculator = new Calculator(elemento1, elemento2);

clearButton.addEventListener("click", () => {
    calculator.clear();
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
    })
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.operation(button.innerHTML);
    })
});

equalsButtons.addEventListener('click', () => {
    calculator.calc();
});
*/
