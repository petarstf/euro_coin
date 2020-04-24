const express = require('express');

const app = express();

response = {
  recognized: true,
  coin: {
    name: "2 Euro",
    desc: "Medal",
    image1: "https://coin-brothers.com/photos/Andorra_Euro_2/20th_Anniversary_of_the_Council_of_Europe_2014_13.01.2017_02.15.jpg",
    image2: "https://coin-brothers.com/photos/Andorra_Euro_2/20th_Anniversary_of_the_Council_of_Europe_2014_13.01.2017_01.30_01.jpg",
    year: "2014",
    spec: ['Type Commemorative Issue (Circulating)', 'Material Bi-Metallic', 'Ring Cupronickel', 'Center Nickel Brass', 'Weight 8.5 g', 'Diameter 25.75 mm', 'Thickness 2.2 mm', 'Shape round', 'Alignment Medal', 'Mint\nRoyal Spanish Mint (FNMT-RCM)'],
    country: "Andorra"
  },
  similar: [
    {
      name: "1 Euro",
      desc: "Medal",
      image1: "https://coin-brothers.com/photos/San_Marino_Euro_1/2017_06.07.2017_22.22.jpg",
      image2: "https://coin-brothers.com/photos/San_Marino_Euro_1/2017_06.07.2017_22.22_01.jpg",
      year: "2017-2019",
      spec: ['Material Bi-Metallic', 'Ring Nickel Brass', 'Center Cupronickel', 'Weight 7.5 g', 'Diameter 23.25 mm', 'Thickness 2.33 mm', 'Shape round', 'Alignment Medal', 'Mint\nItalian State Mint and Polygraphic Institute (R)'],
      country: "San Marino"
    },
    {
      name: "1 Euro",
      desc: "Medal",
      image1: "https://coin-brothers.com/photos/Spain_Euro_1/2015-2019_23.07.2019_23.28.jpg",
      image2: "https://coin-brothers.com/photos/Spain_Euro_1/2015-2019_23.07.2019_23.28_01.jpg",
      year: "2015-2020",
      spec: ['Material Bi-Metallic', 'Ring Nickel Brass', 'Center Cupronickel', 'Weight 7.5 g', 'Diameter 23.25 mm', 'Thickness 2.33 mm', 'Shape round', 'Alignment Medal', 'Mint\nRoyal Spanish Mint (FNMT-RCM)'],
      country: "Spain"
    },
    {
      name: "1 Euro",
      desc: "Medal",
      image1: "https://coin-brothers.com/photos/Andorra_Euro_1/2014-2016_26.01.2017_22.33.jpg",
      image2: "https://coin-brothers.com/photos/Andorra_Euro_1/2014-2016_26.01.2017_22.33_01.jpg",
      year: "2014-2019",
      spec: ['Material Bi-Metallic', 'Ring Nickel Brass', 'Center Cupronickel', 'Weight 7.5 g', 'Diameter 23.25 mm', 'Thickness 2.33 mm', 'Shape round', 'Alignment Medal', 'Mints\\nParis Mint (A)\\nRoyal Spanish Mint (FNMT-RCM)'],
      country: "Andorra"
    }
  ]
}


app.use((req, res, next) => {
  numero = Math.random();
  if(numero > 0.5) {
    res.status(200).send(response);
  } else {
    res.status(404).send(false);
  }
});

module.exports = app;
