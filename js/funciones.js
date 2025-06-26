setTimeout(() => {
    alert(
        "Bienvenido al sistema de propinas.\n\n" +
        "1. Usa los botones numéricos para ingresar lo que se indique (Efectivo en caja, total de propinas, etc).\n" +
        "2. Presiona la palomita para confirmar el monto de ambos.\n" +
        "3. Luego se te preguntará si deseas dividir las propinas.\n" +
        "4. Si decides dividirlo, ingresa el número de personas.\n" +
        "5. Verás cuánto le toca a cada uno.\n" +
        "6. Si no deseas dividirlas, continúa normalmente.\n" +
        "7. Puedes editar el monto de propinas si lo necesitas.\n" +
        "8. Al editar, el cálculo por persona se actualizará.\n" +
        "9. Finalmente, elige el método de pago.\n" +
        "10. ¡Gracias por usar el sistema!"
    );

    class Calculator {
        constructor(displayElement) {
            this.displayElement = displayElement;
            this.clear();
            this.dividingMode = false;
            this.totalPropina = 0;
            this.ingresandoEfectivo = true;
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
            if (this.currentValue === '') {
                this.displayElement.textContent = '';
                return;
            }

            if (this.dividingMode) {
                this.displayElement.textContent = this.currentValue;
            } else {
                const formatted = this.formatNumber(this.currentValue);
                this.displayElement.textContent = `$${formatted}`;
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
            const inputCaja = document.querySelector(".cajaDinero");
            const inputPropina = document.querySelector(".input-propina");
            const divInput = document.querySelector(".div-pro");
            const divText = document.querySelector(".divir p");

            if (this.currentValue === '') return;

            // Paso 1: si está en modo ingresando efectivo
            if (this.ingresandoEfectivo) {
                const monto = parseFloat(this.currentValue.replace(/,/g, ''));
                if (isNaN(monto) || monto < 0) {
                    alert("Monto inválido");
                    this.clear();
                    return;
                }

                const formattedEfectivo = this.formatNumber(this.currentValue); // 👈 aplicar formato

                if (inputCaja) {
                    inputCaja.value = `$${formattedEfectivo}`;
                }

                this.ingresandoEfectivo = false;
                this.clear();
                alert("✅ Efectivo en caja registrado. Ahora ingresa el total de propinas.");
                return;
            }

            // Paso 2: lógica de propinas (igual que ya tenías)
            if (!this.dividingMode) {
                const formatted = this.formatNumber(this.currentValue);
                const numericValue = parseFloat(this.currentValue.replace(/,/g, ''));

                inputPropina.value = `$${formatted}`;
                this.totalPropina = numericValue;
                this.clear();

                const numPersonas = parseInt(divInput.value);
                if (!isNaN(numPersonas) && numPersonas > 0) {
                    const propinaPorPersona = this.totalPropina / numPersonas;
                    divText.textContent = `$${propinaPorPersona.toFixed(2)} x persona`;
                } else {
                    setTimeout(() => {
                        const deseaDividir = confirm("¿Deseas dividir las propinas?");
                        if (deseaDividir) {
                            alert("Ok, escribe entre cuántos se dividirán las propinas");
                            this.dividingMode = true;
                        } else {
                            alert("Ok, continúa eligiendo el método de pago.");
                        }
                    }, 1000);
                }

            } else {
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
            const inputPropina = document.querySelector(".input-propina");
            const divInput = document.querySelector(".div-pro");

            if (inputPropina) inputPropina.value = '';
            this.totalPropina = 0;
            this.dividingMode = false;
            this.clear();

            const numPersonas = parseInt(divInput.value);
            const divText = document.querySelector(".divir p");
            if (isNaN(numPersonas) || numPersonas <= 0) {
                divText.textContent = '$0.00 x persona';
            }

            alert("Se actualizará el monto de propinas x persona.");
            alert("Escribe el nuevo total de las propinas");
        }
    }

    // Selección de elementos del DOM
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

}, 1500);
