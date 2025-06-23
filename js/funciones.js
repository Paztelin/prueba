/*
setTimeout(() => {
    // Ya se ha cargado header.html, así que puedes asignar eventos
    const boton = document.querySelector('#step1 button');
    if (boton) {
        boton.onclick = mostrarConfirmacion;
    }
}, 300); // espera 300ms (puedes ajustar si hace falta)

function mostrarConfirmacion() {
    // Crear fondo oscuro (modal background)
    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = 9999;

    // Crear caja del modal
    const modal = document.createElement("div");
    modal.style.backgroundColor = "#fff";
    modal.style.padding = "30px";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    modal.style.textAlign = "center";
    modal.style.maxWidth = "300px";

    // Título/pregunta
    const pregunta = document.createElement("p");
    pregunta.textContent = "¿Deseas iniciar el proceso de pago de propinas?";
    modal.appendChild(pregunta);

    // Botón Sí
    const botonSi = document.createElement("button");
    botonSi.textContent = "Sí";
    botonSi.style.margin = "10px";
    botonSi.style.padding = "10px 20px";
    botonSi.style.backgroundColor = "#4CAF50";
    botonSi.style.color = "#fff";
    botonSi.style.border = "none";
    botonSi.style.borderRadius = "5px";
    botonSi.onclick = function () {
        document.body.removeChild(overlay);
        iniciarProceso();
    };
    modal.appendChild(botonSi);

    // Botón No
    const botonNo = document.createElement("button");
    botonNo.textContent = "No";
    botonNo.style.margin = "10px";
    botonNo.style.padding = "10px 20px";
    botonNo.style.backgroundColor = "#f44336";
    botonNo.style.color = "#fff";
    botonNo.style.border = "none";
    botonNo.style.borderRadius = "5px";
    botonNo.onclick = function () {
        document.body.removeChild(overlay);
        cancelarProceso();
    };
    modal.appendChild(botonNo);

    // Agregar modal al overlay y al body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function iniciarProceso() {
    const contenedor = document.getElementById("step1");
    contenedor.innerHTML = "";

    class Calculator {
        constructor(operand1Elemt, operand2Elemt) {
            this.elemento1 = operand1Elemt; //elementos donde se escriben los numeros(pantalla)
            this.elemento2 = operand2Elemt;
            this.clear();
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
    const numberButtons = document.querySelectorAll("[data-number]");
    const deleteButton = document.querySelector("[data-delete]");
    const equalsButtons = document.querySelector("[data-equals]");

    const calculator = new Calculator(elemento1, elemento2);


    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerHTML);
        })
    });

    deleteButton.addEventListener('click', () => {
        calculator.delete();
    });

    equalsButtons.addEventListener('click', () => {
        calculator.calc();
    });


}

function cancelarProceso() {
    const contenedor = document.getElementById("step1");
    contenedor.innerHTML = "";
    // Volver a crear el botón
    const boton = document.createElement("button");
    boton.textContent = "Iniciar pago de propinas";
    boton.onclick = mostrarConfirmacion;
    contenedor.appendChild(boton);
}
*/



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
