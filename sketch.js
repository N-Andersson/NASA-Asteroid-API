
const width = 750;
const height = 750;

let asteroids;
let asteroidArray = [];
let x = 20;
let y = 20;

function preload() {
  const url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=YK0rMhNeklhf0FXVLmAeBSQMeDatKhpoiQtnwEJK';
  asteroids = loadJSON(url);

}

function findDate() {

  var date = new Date();
  res = date.toISOString();
  isoDate = res.substring(0, 10);
  return isoDate;
}

function setup() {
  createCanvas(width, height);
  dayDate = findDate();

  moon = new Asteroid((384400 / 200000) + 20, 1 / 10, 3474 / 1000)

  distanceArr = []
  for (let i = 0; i < asteroids.element_count; i++) {
    var distance = parseInt(asteroids.near_earth_objects[dayDate][i].close_approach_data[0].miss_distance.kilometers)
    distanceArr[i] = distance;
    var size = (asteroids.near_earth_objects[dayDate][i].estimated_diameter.kilometers.estimated_diameter_max + asteroids.near_earth_objects[dayDate][i].estimated_diameter.kilometers.estimated_diameter_min) / 2;
    var velocity = asteroids.near_earth_objects[dayDate][i].close_approach_data[0].relative_velocity.kilometers_per_second;

    asteroidArray[i] = new Asteroid(distance, velocity * 10000, size * 20);

  }

  var maxdist = Math.max(...distanceArr)

  for (let i = 0; i < asteroids.element_count; i++) {
    var newdist = map(asteroidArray[i].distance, 20, maxdist, 20, height / 2 - 50)
    asteroidArray[i].distance = newdist
  }


}

function draw() {
  background(150);
  noStroke();
  fill(65, 105, 225);
  ellipse(width / 2, width / 2, 20, 20)

  for (let j = 0; j < asteroids.element_count; j++) {
    asteroidArray[j].show();
    asteroidArray[j].update();
  }
  moon.show();
  moon.update();
}