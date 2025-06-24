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