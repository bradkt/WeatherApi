<template>
  <section class="hero is-info is-fullheight">
    <div class="container has-text-centered">
      <div class="column is-6 is-offset-3">
        <h1 class="title">World<span class="gray-text light-weight">Weather</span></h1>
        <h2 class="subtitle blue-text">
            {{ subtitle }}
        </h2>
          <Form v-on:locationData="createURL($event)"></Form>
        <div class="overlay">
          <Placeholder v-if="!shouldDisplayResults" v-bind:requestHadError="requestHadError"></Placeholder>
          <Response v-if="shouldDisplayResults" v-bind:weatherData="weatherData"></Response>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiKey } from '../main.js';
import { eventBus } from '../events.js';
import Placeholder from './Placeholder.vue';
import Response from './Response.vue';
import Form from './Form.vue';
import RequestHandler from '../Requests.js';

export default {
  name: 'Weather',
  components: {
    Placeholder,
    Response,
    Form
  },
  data () {
    return {
      subtitle: 'Weather by City and Country Around the World',
      weatherApiURL: 'https://api.openweathermap.org/data/2.5/weather',
      requestHadError: false,
      shouldDisplayResults: false,
      weatherData: {}
    };
  },
  created () {
    let _this = this;
    eventBus.$on('ResetApp', function () {
      _this.shouldDisplayResults = false;
    });
  },
  computed: {
    weatherDTO: {
    // getter
    get: function () {
      return this.weatherData
    },
    // setter
    set: function (dto) {
      this.weatherData =
        {
          'Location': dto.name,
          'Temperature': dto.main.temp,
          'Humidity': dto.main.humidity,
          'Conditions': dto.weather[0].description
        };
    }
  }
  },
  methods: {
    createURL: function (eventData) {
      let FullURL = this.urlBuilder(this.weatherApiURL, eventData.city, eventData.country, 'imperial', apiKey);
      this.getWeatherData(FullURL, RequestHandler);
    },
    getWeatherData: function (fullURL, requesthandler) {
      let _this = this;
      requesthandler.GET(fullURL)
        .then(function (data) {
          _this.weatherDTO = data;
          _this.shouldDisplayResults = true;
        })
        .catch(function (error) {
          _this.DisplayRequestError();
          console.log(error);
        });
    },

    urlBuilder: function (url, city, country, units, key) {
      let safeCity = encodeURI(city);
      let safeCountry = encodeURI(country);
      let fullURL = `${url} ?q= ${safeCity}, ${safeCountry} & units= ${units} & ${key}`.replace(/\s/g, '');
      return fullURL;
    },
    DisplayRequestError: function () {
      let _this = this;
      _this.requestHadError = true;
      setTimeout(function () {
        _this.requestHadError = false;
      }, 3500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hero {
  padding: 15px 0 0 0;
}

.hero.is-info {
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(../assets/gray-world-map-dark-crop.png) no-repeat center center fixed;
  background-size: cover;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 50%;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 2;
}

.hero.is-info .subtitle {
  color:#209cee;
}

@media screen and (max-width: 457px){
  .overlay {
    margin-top: 25px;
  }
}

@media screen and (min-width: 765px) and (max-width: 1087px){
  .column.is-6 {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
