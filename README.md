# UberOrLyft


Want to know what's cheaper right this instant, Uber or Lyft? Check out UberOrLyft!

UberOrLyft shows you the full price difference between all possible products!


<img src='http://i.imgur.com/JG4DSSh.png' title='UberOrLyft' width='' alt='' />

## Live Site

The deployed demo can be found [here](https://jonlu.ca/UberOrLyft/)

## Deploying locally

After cloning the repo, make sure to `npm install`, and to create a file called `config.js` with the following format:

```js
module.exports = {
  client_id: 'uber_id',
  client_secret: 'uber_secret',
  server_token: 'server_token',
  redirect_uri: 'http://localhost:3000',
  lyft_one: 'lyft_id',
  lyft_two: 'lyft_secret'
};

```