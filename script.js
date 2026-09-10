document.addEventListener("DOMContentLoaded", () => {

    AOS.init({
        duration: 700,
        once: true
    });

    const header = document.querySelector("body > header");
    const nav = header?.querySelector("nav");
    const menu = nav?.querySelector("ul");

    if (header && nav && menu) {

        const menuButton = document.createElement("button");

        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Abrir menu");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "menu-principal");

        menu.id = "menu-principal";

        menuButton.innerHTML = "☰";

        Object.assign(menuButton.style, {
            display: "none",
            background: "transparent",
            border: "none",
            color: "#1E5F74",
            fontSize: "28px",
            lineHeight: "1",
            padding: "6px",
            cursor: "pointer"
        });

        const botaoAgendar = nav.querySelector("a:last-child");

        if (botaoAgendar) {
            nav.insertBefore(menuButton, botaoAgendar);
        } else {
            nav.appendChild(menuButton);
        }

        const mediaQuery = window.matchMedia("(max-width: 760px)");

        function atualizarMenuMobile() {

            if (mediaQuery.matches) {
                menuButton.style.display = "block";

                if (menuButton.getAttribute("aria-expanded") !== "true") {
                    menu.style.display = "none";
                }

            } else {
                menuButton.style.display = "none";
                menu.style.display = "";

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            }
        }

        function abrirFecharMenu() {

            const menuAberto =
                menuButton.getAttribute("aria-expanded") === "true";

            if (menuAberto) {
                menu.style.display = "none";

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");

                menuButton.innerHTML = "☰";

            } else {
                menu.style.display = "flex";

                menuButton.setAttribute("aria-expanded", "true");
                menuButton.setAttribute("aria-label", "Fechar menu");

                menuButton.innerHTML = "✕";
            }
        }

        menuButton.addEventListener("click", abrirFecharMenu);

        const linksDoMenu = menu.querySelectorAll("a");

        linksDoMenu.forEach((link) => {

            link.addEventListener("click", () => {

                if (mediaQuery.matches) {
                    menu.style.display = "none";

                    menuButton.setAttribute("aria-expanded", "false");
                    menuButton.setAttribute("aria-label", "Abrir menu");

                    menuButton.innerHTML = "☰";
                }

            });

        });

        mediaQuery.addEventListener("change", atualizarMenuMobile);

        atualizarMenuMobile();
    }

    const linksInternos = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destinoId = link.getAttribute("href");

            if (!destinoId) {
                return;
            }

            const destino = document.querySelector(destinoId);

            if (!destino) {
                return;
            }

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.pushState(null, "", destinoId);

        });

    });

    const formulario = document.querySelector("#contato form");

    if (formulario) {

        const camposObrigatorios = [
            {
                elemento: formulario.querySelector("#nome"),
                mensagem: "Informe seu nome."
            },
            {
                elemento: formulario.querySelector("#telefone"),
                mensagem: "Informe seu telefone ou WhatsApp."
            },
            {
                elemento: formulario.querySelector("#regiao-contato"),
                mensagem: "Informe seu bairro ou região."
            }
        ];

        formulario.noValidate = true;


        function removerErro(campo) {

            if (!campo) {
                return;
            }

            campo.style.borderColor = "#d8dee1";
            campo.style.boxShadow = "";

            const mensagemErro =
                campo.parentElement.querySelector(".mensagem-erro");

            if (mensagemErro) {
                mensagemErro.remove();
            }

            campo.removeAttribute("aria-invalid");
        }


        function mostrarErro(campo, mensagem) {

            if (!campo) {
                return;
            }

            removerErro(campo);

            campo.style.borderColor = "#c0392b";

            campo.style.boxShadow =
                "0 0 0 3px rgba(192, 57, 43, 0.12)";

            campo.setAttribute("aria-invalid", "true");

            const mensagemErro = document.createElement("small");

            mensagemErro.className = "mensagem-erro";
            mensagemErro.textContent = mensagem;

            Object.assign(mensagemErro.style, {
                color: "#c0392b",
                fontSize: "0.85rem",
                marginTop: "2px"
            });

            campo.parentElement.appendChild(mensagemErro);
        }


        function validarFormulario() {

            let formularioValido = true;
            let primeiroCampoComErro = null;

            camposObrigatorios.forEach((item) => {

                const campo = item.elemento;

                if (!campo) {
                    return;
                }

                const valor = campo.value.trim();

                if (valor === "") {

                    mostrarErro(campo, item.mensagem);

                    formularioValido = false;

                    if (!primeiroCampoComErro) {
                        primeiroCampoComErro = campo;
                    }

                } else {

                    removerErro(campo);

                }

            });

            if (primeiroCampoComErro) {
                primeiroCampoComErro.focus();
            }

            return formularioValido;
        }


        formulario.addEventListener("submit", (event) => {

            event.preventDefault();

            const formularioValido = validarFormulario();

            if (!formularioValido) {
                return;
            }

            alert(
                "Dados preenchidos corretamente. Em breve entraremos em contato."
            );

        });


        camposObrigatorios.forEach((item) => {

            const campo = item.elemento;

            if (!campo) {
                return;
            }

            campo.addEventListener("input", () => {

                if (campo.value.trim() !== "") {
                    removerErro(campo);
                }

            });

            campo.addEventListener("blur", () => {

                if (campo.value.trim() === "") {
                    mostrarErro(campo, item.mensagem);
                }

            });

        });

    }

});
