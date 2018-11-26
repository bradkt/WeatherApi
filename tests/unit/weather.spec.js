import { shallowMount } from '@vue/test-utils'
import Weather from '@/components/Weather.vue'
import Form from '@/components/Form.vue';
import Response from '@/components/Response.vue';

  describe('Weather.vue', () => {
  
    it('shouldDisplayResults should be false', () => {
        const WeatherWrap = shallowMount(Weather);
        expect(WeatherWrap.vm.shouldDisplayResults).toBe(false);
      });
    
      it('should create a valid api url', () => {
        const WeatherWrap = shallowMount(Weather);
        const city = 'Columbus';
        const country = 'USA';
        const key = '1234567890';
        const url = 'https://www.fakeurl.com';
        const units = 'imperial';
        let FullURL = WeatherWrap.vm.urlBuilder(url, city, country, units, key);
        expect(FullURL).toBe(`${url} ?q= ${city}, ${country} & units= ${units} & ${key}`.replace(/\s/g, ''));
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
  });
