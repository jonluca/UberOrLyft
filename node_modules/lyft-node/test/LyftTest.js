'use es6';

import dotenv from 'dotenv';

import {expect} from 'chai';

import Lyft from '../src/index';

dotenv.load();

describe('Test Lyft API Node Wrapper', function() {
  const lyft = new Lyft(
    process.env.LYFT_CLIENT_ID,
    process.env.LYFT_CLIENT_SECRET
  );

  const startLat = 33.792858;
  const startLng = -118.021032;
  const endLat = 33.594303;
  const endLng = -117.873806;

  const start = {
    latitude: startLat,
    longitude: startLng,
  };

  const end = {
    latitude: endLat,
    longitude: endLng,
  };

  const rideTypesSearch = {
    start: {
      latitude: startLat,
      longitude: startLng,
    },
  };

  const driverEtaSearch = {
    start: {
      latitude: startLat,
      longitude: startLng,
    },
  };

  const rideEstimatesSearch = {
    start: {
      latitude: startLat,
      longitude: startLng,
    },
    end: {
      latitude: endLat,
      longitude: endLng,
    },
    rideType: 'lyft_plus',
  };

  const nearbyDriversSearch = {
    start: {
      latitude: startLat,
      longitude: startLng,
    },
  };

  it('tests ride types fetch', () => {
    return lyft.getRideTypes(rideTypesSearch)
                 .then(response => console.log(response));
  });

  it('tests driver eta fetch', () => {
    return lyft.getDriverEta(driverEtaSearch)
                 .then(response => console.log(response));
  });

  it('tests ride estimates fetch', () => {
    return lyft.getRideEstimates(rideEstimatesSearch)
                 .then(response => console.log(response));
  });

  it('tests nearby drivers fetch', () => {
    return lyft.getNearbyDrivers(nearbyDriversSearch)
                 .then(response => console.log(response));
  });
});
