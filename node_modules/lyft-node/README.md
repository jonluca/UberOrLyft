[![Build Status](https://travis-ci.org/djchie/lyft-node.svg?branch=master)](https://travis-ci.org/djchie/lyft-node)
[![Coverage Status](https://coveralls.io/repos/github/djchie/lyft-node/badge.svg?branch=master)](https://coveralls.io/github/djchie/lyft-node?branch=master)
[![npm version](https://badge.fury.io/js/lyft-node.svg)](https://badge.fury.io/js/lyft-node)

[![NPM](https://nodei.co/npm/lyft-node.png?downloads=true)](https://nodei.co/npm/lyft-node/)

# A Node Wrapper for the Lyft API

## Introduction
A simple node wrapper that serves as an abstraction for the Lyft API's public scope endpoints.

## Installation
Install via NPM
```
npm install lyft-node
```

## Usage

### Get Ride Types
Takes a ride types search query and returns a response wrapped in a Promise.

#### Ride Types Search Query
##### Required:
* `start [coordinate]`

##### Optional:
* `rideType [string]` (must be `lyft`, `lyft_line`, or `lyft_plus`)

#### Example
```javascript
import Lyft from 'lyft-node';

const lyft = new Lyft('LYFT_CLIENT_ID', 'LYFT_CLIENT_SECRET');

const query = {
  start: {
      latitude: 1,
        longitude: 2,
    },
};

lyft.getRideTypes(query)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Driver ETA
Takes a driver eta search query and returns a response wrapped in a Promise.

#### Driver ETA Search Query
##### Required:
* `start [coordinate]`

##### Optional:
* `end [coordinate]`
* `rideType [string]` (must be `lyft`, `lyft_line`, or `lyft_plus`)

#### Example
```javascript
import Lyft from 'lyft-node';

const lyft = new Lyft('LYFT_CLIENT_ID', 'LYFT_CLIENT_SECRET');

const query = {
  start: {
      latitude: 1,
        longitude: 2,
    },
};

lyft.getDriverEta(query)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Ride Estimates
Takes a ride estimates search query and returns a response wrapped in a Promise.

#### Ride Estimates Search Query
##### Required:
* `start [coordinate]`
* `end [coordinate]`
* `rideType [string]` (must be `lyft`, `lyft_line`, or `lyft_plus`)

#### Example
```javascript
import Lyft from 'lyft-node';

const lyft = new Lyft('LYFT_CLIENT_ID', 'LYFT_CLIENT_SECRET');

const query = {
  start: {
      latitude: 1,
        longitude: 2,
    },
    end: {
      latitude: 3,
        longitude: 4,
    },
    rideType: 'lyft',
};

lyft.getRideEstimates(query)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Nearby Drivers
Takes a nearby drivers search query and returns a response wrapped in a Promise.

#### Time Estimates Search Query
##### Required:
* `start [coordinate]`

#### Example
```javascript
import Lyft from 'lyft-node';

const lyft = new Lyft('LYFT_CLIENT_ID', 'LYFT_CLIENT_SECRET');

const query = {
  start: {
      latitude: 1,
        longitude: 2,
    },
};

lyft.getNearbyDrivers(query)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
