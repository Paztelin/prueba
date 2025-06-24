setTimeout(() => {
    class Calculator {
        constructor(displayElement) {
            this.displayElement = displayElement;
            this.clear();
            this.dividingMode = false;
            this.totalPropina = 0;
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
            this.currentValue += number;
            this.updateUI();
        }

        delete() {
            this.currentValue = this.currentValue.slice(0, -1);
            this.updateUI();
        }

        confirm() {
            const inputPropina = document.querySelector(".input-propina");
            const divInput = document.querySelector(".div-pro");
            const divText = document.querySelector(".divir p");

            if (this.currentValue === '') return;

            const formatted = this.formatNumber(this.currentValue);
            const numericValue = parseFloat(this.currentValue.replace(/,/g, ''));

            if (!this.dividingMode) {
                // Modo normal: guardar total propina
                inputPropina.value = `$${formatted}`;
                this.totalPropina = numericValue;
                this.clear();

                // Preguntar si desea dividir
                const deseaDividir = confirm("¿Deseas dividir las propinas?");
                if (deseaDividir) {
                    this.dividingMode = true;
                } else {
                    alert("Ok, continúa eligiendo el método de pago.");
                }
            } else {
                // Modo dividir activado: ingresar número de personas
                const numPersonas = parseInt(this.currentValue);
                if (isNaN(numPersonas) || numPersonas <= 0) {
                    alert("Ingresa un número válido de personas");
                    this.clear();
                    return;
                }

                divInput.value = numPersonas;
                const propinaPorPersona = this.totalPropina / numPersonas;
                divText.textContent = `$${propinaPorPersona.toFixed(2)} x persona`;

                // Reiniciar modo
                this.dividingMode = false;
                this.clear();
            }
        }

        editInput() {
            const inputPropina = document.querySelector(".input-propina");
            const divInput = document.querySelector(".div-pro");
            const divText = document.querySelector(".divir p");

            if (inputPropina) inputPropina.value = '';
            if (divInput) divInput.value = '';
            if (divText) divText.textContent = '$0.00 x persona';

            this.totalPropina = 0;
            this.dividingMode = false;
            this.clear();
        }
    }

    // Selección de elementos
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
