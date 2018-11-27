import { shallowMount } from '@vue/test-utils'
import Weather from '@/components/Weather.vue'
import Form from '@/components/Form.vue';
import Response from '@/components/Response.vue';
import { MockData } from '@/../src/Requests.js';
import { eventBus } from '@/../src/events.js';

  describe('Weather.vue', () => {
  
    it('shouldDisplayResults should be false', () => {
      const WeatherWrap = shallowMount(Weather);
      expect(WeatherWrap.vm.shouldDisplayResults).toBe(false);
    });
  
    it('should create a valid api url', () => {
      const WeatherWrap = shallowMount(Weather);
      const city = 'Columbus';
      const country = 'USA';
      const key = 'appid=1234567890';
      const url = 'https://www.fakeurl.com';
      const units = 'imperial';
      let FullURL = WeatherWrap.vm.urlBuilder(url, city, country, units, key);
      expect(FullURL).toBe('https://www.fakeurl.com?q=Columbus,USA&units=imperial&appid=1234567890');
    });

    it('should make request and produce desired weather dto', () => {
      // Arrange
      const WeatherWrap = shallowMount(Weather);
      
      let expectedDTO = {
        'Location': 'Columbus',
        'Temperature': 285.82,
        'Humidity': 48,
        'Conditions': 'clear sky'
      };

      // Act
      WeatherWrap.vm.getWeatherData('fakeurl.com', MockData);

      // Assert
      expect(WeatherWrap.vm.weatherData).toEqual(expectedDTO);
    });

  });
  
  describe('Form.vue', () => {
  
    it('has a button', () => {
      const FormWrap = shallowMount(Form);
      expect(FormWrap.contains('button')).toBe(true);
    });
  
    it('should emit locationData after clicking Get Weather with data', () => {
      const FormWrap = shallowMount(Form);
      FormWrap.setData({ city: 'Columbus', country: 'USA' });
      FormWrap.find('button').trigger('click');
      expect(FormWrap.emitted()).toEqual({ "locationData": [[{"city": "Columbus", "country": "USA"}]] });
    });
  });
  
  describe('ResponseWrap.vue', () => {
    it('has a button', () => {
      const ResponseWrap = shallowMount(Response, {
        propsData: {
          weatherData: {}
        }
      });
      expect(ResponseWrap.contains('button')).toBe(true);
    });

    it('Can display weather data', () => {
      const ResponseWrap = shallowMount(Response, {
        propsData: {
          weatherData: {
            'Location': 'Columbus',
            'Temperature': 50,
            'Humidity': 40,
            'Conditions': 'cloudy'
          }
        }
      });
      expect(ResponseWrap.html().includes('Location')).toBe(true)
      expect(ResponseWrap.html().includes('Columbus')).toBe(true)
    });
  });

  describe('events.js', () => {
    it('can emit an event', () => {
      const EventWrap = shallowMount(eventBus);
      EventWrap.vm.$emit('ResetApp');
      expect(EventWrap.emitted().ResetApp).toBeTruthy()
    });
  });