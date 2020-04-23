const express = require('express');

const app = express();

coin = {
  name: "1 Euro",
  desc: "Medal",
  image1: "https://coin-brothers.com/photos/Andorra_Euro_1/2014-2016_26.01.2017_22.33.jpg",
  image2: "https://coin-brothers.com/photos/Andorra_Euro_1/2014-2016_26.01.2017_22.33_01.jpg",
  year: "2014-2019",
  spec: ['Material Bi-Metallic', 'Ring Nickel Brass', 'Center Cupronickel', 'Weight 7.5 g', 'Diameter 23.25 mm', 'Thickness 2.33 mm', 'Shape round', 'Alignment Medal', 'Mints\\nParis Mint (A)\\nRoyal Spanish Mint (FNMT-RCM)'],
  country: "Andorra"
}

app.use((req, res, next) => {
  numero = Math.random();
  if(numero > 0.5) {
    res.status(200).send(coin);
  } else {
    res.status(404).send(null);
  }
});

module.exports = app;
