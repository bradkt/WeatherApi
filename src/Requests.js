export default {
  GET: function (url) {
    return fetch(url).then((request) => {
      if (request.ok) {
        return request.json();
      }
      throw new Error('Network response was not ok.');
    }).catch(function (error) {
      console.log(error);
    });
  }
};

export let MockData = {
  GET: function (url) {
    console.log(url);
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(fakeWeatherData);
      }, 190);
    });
  }
};

let fakeWeatherData = {
  'coord': {
    'lon': -84.99,
    'lat': 32.46
  },
  'weather': [
    {
      'id': 800,
      'main': 'Clear',
      'description': 'clear sky',
      'icon': '01d'
    }
  ],
  'base': 'stations',
  'main': {
    'temp': 285.82,
    'pressure': 1025,
    'humidity': 48,
    'temp_min': 284.25,
    'temp_max': 287.05
  },
  'visibility': 16093,
  'wind': {
    'speed': 3.1,
    'deg': 300
  },
  'clouds': {
    'all': 1
  },
  'dt': 1542822960,
  'sys': {
    'type': 1,
    'id': 764,
    'message': 0.0055,
    'country': 'US',
    'sunrise': 1542802536,
    'sunset': 1542839774
  },
  'id': 4188985,
  'name': 'Columbus',
  'cod': 200
};
