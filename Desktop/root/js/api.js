const ciudad = "Buenos Aires";
const apiKeyWeather = "032b0d429450e46085dc273e4b07aafd";
const urlBaseWeather = "https://api.openweathermap.org/data/2.5/weather";

const paramsWeather = {
    q: ciudad,
    appid: apiKeyWeather,
    units: "metric",
    lang: "es",
};

const queryStringWeather = Object.keys(paramsWeather)
    .map((key) => `${key}=${encodeURIComponent(paramsWeather[key])}`)
    .join("&");

const urlWeather = `${urlBaseWeather}?${queryStringWeather}`;

fetch(urlWeather)
    .then((respuestaWeather) => {
        return respuestaWeather.json();
    })
    .then(async (dataWeather) => {
        const contenedor = document.querySelector("#app");
        const card = document.createElement("div");
        const lista = document.createElement("ul");
        lista.className = "listaClima";

        const detalles = [
            ciudad,
            "Temperatura: " + dataWeather.main.temp + "°C",
            "Humedad: " + dataWeather.main.humidity + "%",
            "Velocidad del viento: " + dataWeather.wind.speed + " m/s",
            "Estado del tiempo: " + dataWeather.weather[0].description,
            `<img src="http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png" alt="Icono del clima">`
        ];

        detalles.forEach((detalle) => {
            const listaItem = document.createElement("li");
            listaItem.innerHTML = detalle;
            lista.appendChild(listaItem);
        });

        card.appendChild(lista);
        contenedor.appendChild(card);
    })
    .catch((error) => {
        const contenedor = document.querySelector("#app");
        const lista = document.createElement("ul");
        lista.innerText = `Error al obtener los datos del sistema, vuelva a intentarlo mas tarde`;
        contenedor.appendChild(lista);
    });