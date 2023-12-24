let paciente = {
    username: "",
    email: "",
    servicio: "",
    fecha: "",
    horario: "",
    turno: 1
};

const sectionCreadoDos = document.querySelector("#sesionMain");
const inputUsername = document.querySelector("#username");
const inputEmail = document.querySelector("#email");
const botonRegistrar = document.querySelector("#btnRegistrar");
const ultimoTurnoRegistrado = localStorage.getItem("ultimoTurno");
paciente.turno = ultimoTurnoRegistrado ? parseInt(ultimoTurnoRegistrado, 10) + 1 : 1;

function manejarFormulario(e) {
    e.preventDefault();

    if (inputUsername.value && inputEmail.value) {
        paciente.username = inputUsername.value;
        paciente.email = inputEmail.value;

        let timerInterval;
        Swal.fire({
            title: "Usted ha sido registrado",
            html: "Aguarde unos instantes",
            timer: 1050,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
            }
        });

        mostrarFormularioSiguiente();

        localStorage.setItem("ultimoTurno", paciente.turno.toString());
        localStorage.setItem("recordarUsername", paciente.username);
        localStorage.setItem("paciente", JSON.stringify(paciente));

    } else {
        Swal.fire({
            title: "ERROR",
            text: "Por favor, complete todos los campos",
            icon: "error"
        });
    }
}

const recordarUsername = localStorage.getItem("recordarUsername");

if (recordarUsername) {
    sectionCreadoDos.innerHTML = `
        <h2>Bienvenido Sr/ Sra ${recordarUsername.toUpperCase()} al Inicio del Hospital Central, <br> seleccione el servicio que desea pedir:</h2>
        <div class="servicio">
            <label for="servicios">Selecciona un Servicio Medico:</label> <br>
            <select id="servicios">
                <option value="Odontologia">Odontologia</option>
                <option value="Medicina Interna">Medicina Interna</option>
                <option value="Traumatologia">Traumatologia</option>
                <option value="Kineseologia">Kineseologia</option>
                <option value="Otorrinolaringologia">Otorrinolaringologia</option>
            </select>
        </div>
        <div class="fecha">
            <h3>Elija la fecha:</h3>
            <label for="date">Se tendrá en cuenta la disponibilidad del doctor</label>
            <input type="date" id="date" name="date" required>
            <label for="hora">Selecciona una hora:</label>
            <input type="time" id="hora" name="hora">
            <button id="btnSiguiente" class="btnSiguiente" type="button">Siguiente</button>
        </div>`;

    const servicios = document.getElementById("servicios");
    const dateInput = document.getElementById("date");
    const horarioInput = document.getElementById("hora");
    const btnSiguiente = document.getElementById("btnSiguiente");

    btnSiguiente.addEventListener("click", function() {
        if (servicios.value && dateInput.value && horarioInput.value) {
            paciente.servicio = servicios.value;
            paciente.fecha = dateInput.value;
            paciente.horario = horarioInput.value;

            mostrarInformacionTurno();

            localStorage.setItem("ultimoTurno", paciente.turno.toString());
            localStorage.setItem("paciente", JSON.stringify(paciente));

        } else {
            Swal.fire({
                title: "ERROR",
                text: "Por favor, elija un servicio y una fecha",
                icon: "error"
            });
        }
    });
}

botonRegistrar.addEventListener("click", manejarFormulario);

function mostrarFormularioSiguiente() {
    const ultimoTurnoRegistrado = localStorage.getItem("ultimoTurno");
    paciente.turno = ultimoTurnoRegistrado ? parseInt(ultimoTurnoRegistrado, 10) + 1 : 1;

    sectionCreadoDos.innerHTML = `
        <h2>Bienvenido Sr/ Sra ${paciente.username.toUpperCase()} al Inicio del Hospital Central, <br> seleccione el servicio que desea pedir:</h2>
        <div class="servicio">
            <label for="servicios" name="servicios">Selecciona un Servicio Medico:</label> <br>
            <select id="servicios">
                <option value="Odontologia">Odontologia</option>
                <option value="Medicina Interna">Medicina Interna</option>
                <option value="Traumatologia">Traumatologia</option>
                <option value="Kineseologia">Kineseologia</option>
                <option value="Otorrinolaringologia">Otorrinolaringologia</option>
            </select>
        </div>
        <div class="fecha">
            <h3>Elija la fecha:</h3>
            <label for="date">Se tendrá en cuenta la disponibilidad del doctor</label>
            <input type="date" id="date" name="date" required>
            <label for="hora">Selecciona una hora:</label>
            <input type="time" id="hora" name="hora">
            <button id="btnSiguiente" class="btnSiguiente" type="button">Siguiente</button>
        </div>`;

    const servicios = document.getElementById("servicios");
    const dateInput = document.getElementById("date");
    const horarioInput = document.getElementById("hora");
    const btnSiguiente = document.getElementById("btnSiguiente");

    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaManana = manana.toISOString().split('T')[0];

    dateInput.setAttribute('min', fechaManana);

    btnSiguiente.addEventListener("click", function() {
        if (servicios.value && dateInput.value && horarioInput.value) {
            paciente.servicio = servicios.value;
            paciente.fecha = dateInput.value;
            paciente.horario = horarioInput.value;

            mostrarInformacionTurno();

            localStorage.setItem("ultimoTurno", paciente.turno.toString());
            localStorage.setItem("paciente", JSON.stringify(paciente));
        } else {
            Swal.fire({
                title: "ERROR",
                text: "Por favor, elija un servicio, una fecha y una hora dentro del horario permitido",
                icon: "error"
            });
        }
    });
}

function mostrarInformacionTurno() {
    localStorage.setItem("user", JSON.stringify({ usuario: paciente.username }));
    const nombreUsuario = recordarUsername ? recordarUsername.toUpperCase() : paciente.username.toUpperCase();
    sectionCreadoDos.innerHTML = `
        <div class="finalizar">
            <ul>
                Sr/ Sra ${nombreUsuario} su turno es el N° ${paciente.turno} <br>
                para el servicio de ${paciente.servicio.toUpperCase()} <br>
                con fecha para el ${paciente.fecha}, <br>
                concurrir al horario de ${paciente.horario}.<br>
                Se envió una confirmación de turno al correo ingresado.<br>
                ("ESC" para finalizar) <br>
            </ul>
            <input type="button" id="btnNuevoTurno" value="Solicitar nuevo turno" >
        </div>`;

    const btnNuevoTurno = document.getElementById("btnNuevoTurno");
    btnNuevoTurno.addEventListener("click", function() {
        mostrarFormularioSiguiente();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        mostrarAgradecimiento();
    }
});

const mostrarAgradecimiento = () => {
    Swal.fire({
        title: "¿Desea volver al Inicio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html"
            localStorage.removeItem("recordarUsername");
            localStorage.removeItem("paciente");
            localStorage.removeItem("user");
        }
    });
};



