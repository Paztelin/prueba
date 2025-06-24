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
            // Si está en modo división, no dar formato
            if (this.dividingMode) {
                this.displayElement.textContent = this.currentValue;
            } else {
                this.displayElement.textContent = this.formatNumber(this.currentValue);
            }
        }

        appendNumber(number) {
            if (number === '.' && this.currentValue.includes('.')) return;

            // En modo dividir solo aceptar números enteros
            if (this.dividingMode && number === '.') return;

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

            if (!this.dividingMode) {
                // Paso 1: Registrar el total de propinas
                const formatted = this.formatNumber(this.currentValue);
                const numericValue = parseFloat(this.currentValue.replace(/,/g, ''));

                inputPropina.value = `$${formatted}`;
                this.totalPropina = numericValue;
                this.clear();

                // Ahora sí preguntar si desea dividir
                setTimeout(() => {
                    const deseaDividir = confirm("¿Deseas dividir las propinas?");
                    if (deseaDividir) {
                        this.dividingMode = true;
                    } else {
                        alert("Ok, continúa eligiendo el método de pago.");
                    }
                }, 100);

            } else {
                // Paso 2: Recibir número de personas
                const numPersonas = parseInt(this.currentValue);
                if (isNaN(numPersonas) || numPersonas <= 0) {
                    alert("Ingresa un número válido de personas");
                    this.clear();
                    return;
                }

                divInput.value = numPersonas;
                const propinaPorPersona = this.totalPropina / numPersonas;
                divText.textContent = `$${propinaPorPersona.toFixed(2)} x persona`;

                this.dividingMode = false;
                this.clear();
            }
        }

        editInput() {
            const inputPropina =
