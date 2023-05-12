import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
    static properties = {
        header: {
            type: String
        },
        timezone: {
            type: String
        },
        maxTemp: {
            type: String
        },
        minTemp: {
            type: String
        },
        precipSum: {
            type: String
        },
        sunrise: {
            type: String
        },
        sunset: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }

    static styles = css `
    :host {
        margin-top: 10%;
        padding-top: 1.5%;
        padding-bottom: 1.5%;
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  `;

    constructor() {
        super();
        this.header = "Today's Weather";
        this.timezone = '';
        this.maxTemp = '';
        this.minTemp = '';
        this.precipSum = '';
        this.sunrise = '';
        this.sunset = '';
        this.latitude = -33.87
        this.longitude = 151.21

        // setting the url to use when fetching data from API
        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                //The weather data received is set to variables
                this.timezone = data['timezone'];
                this.maxTemp = data['daily']['temperature_2m_max'][0];
                this.minTemp = data['daily']['temperature_2m_min'][0];
                this.precipSum = data['daily']['precipitation_sum'][0];
                this.sunrise = data['daily']['sunrise'][0];
                this.sunset = data['daily']['sunset'][0];
                this.tempUnit = data['daily_units']['temperature_2m_max']
                this.precipUnit = data['daily_units']['precipitation_sum'];
                console.log(this.timezone, this.maxTemp, this.minTemp, this.precipSum, this.sunrise, this.sunset);
            })
            .catch(error => console.error(error));

        function geoFindMe() {
            function success(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(latitude, longitude);
                status.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            }

            function error() {
                status.textContent = "Unable to retrieve your location";
            }

            if (!navigator.geolocation) {
                status.textContent = "Geolocation is not supported by your browser";
            } else {
                status.textContent = "Locating…";
                navigator
                    .geolocation
                    .getCurrentPosition(success, error);
            }
        }
    }

    render() {
        if (this.timezone == '') 
            return html `Loading Weather Data...`;
        console.log(this.timezone, this.maxTemp, this.minTemp, this.precipSum, this.sunrise, this.sunset);
        return html `
      <h3>${this
            .header}</h3>
      <title>Todays Weather</title>
      <p>Timezone: ${this.timezone}<br>
      maxTemp: ${this.maxTemp}${this.tempUnit}<br>
      minTemp: ${this.minTemp}${this.tempUnit}<br>
      precipSum: ${this.precipSum}${this.precipUnit}<br>
      sunrise: ${this.sunrise.substring(11,)}<br>
      sunset: ${this.sunset.substring(11,)}</p>

      <button id="find-me">Change to my location</button><br />
      <p id="status"></p>
    `;
    }

    get _statusButton() {
        return this.renderRoot.querySelector('#status')
    }

    get _FindMeBtn(){
      return this.renderRoot.querySelector('#find-me');
    }
}

customElements.define('weather-widget', WeatherWidget);