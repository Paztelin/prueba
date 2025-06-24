function includeHTML(callback) {
    const elements = document.querySelectorAll('[include-html]');
    const total = elements.length;
    let loaded = 0;

    if (total === 0 && typeof callback === "function") callback();

    elements.forEach(elmnt => {
        const file = elmnt.getAttribute("include-html");
        if (!file) return;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) elmnt.innerHTML = this.responseText;
                if (this.status === 404) elmnt.innerHTML = "Page not found.";
                elmnt.removeAttribute("include-html");

                loaded++;
                if (loaded === total && typeof callback === "function") {
                    callback(); // ✅ Aquí se ejecuta el callback cuando termina todo
                }
            }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
    });
}

