const width = window.innerWidth;
const height = window.innerHeight;

let asteroids;
let asteroidArray = [];

// Change sizeRel to "zoom" or scale the canvas. By increasing more asteroids can be shown
let sizeRel = 2000;
let velocityRel = 1 / 10;

//Moon- and earth data in km or km/s
let moonDist = 384400;
let moonVel = 1.022;
let moonDia = 3474;

let earthDia = 12742;


// TODO: Implement a slider which controls the scale of the earth and asteroids
// Must be done manually through sizeRel now 
//let slider;

//Loads asteroid data from the API 
function preload() {
  const url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=YK0rMhNeklhf0FXVLmAeBSQMeDatKhpoiQtnwEJK';
  asteroids = loadJSON(url);
}

//Finds today's date and converts it to an appropriate string to use in the traversing of JSON file
function findDate() {
  var date = new Date();
  res = date.toISOString();
  isoDate = res.substring(0, 10);
  return isoDate;
}

//Sets up the canvas and creats
function setup() {
  createCanvas(width, height);
  dayDate = findDate();
  moon = new Asteroid(moonDist / sizeRel, moonVel * velocityRel, moonDia / sizeRel);


  //Traverses through the JSON file and retreives distance, size and velocity of the asteroids
  //Creates new asteroids and saves them in an array
  for (let i = 0; i < asteroids.element_count; i++) {
    var distance = parseInt(asteroids.near_earth_objects[dayDate][i].close_approach_data[0].miss_distance.kilometers)
    var size = (asteroids.near_earth_objects[dayDate][i].estimated_diameter.kilometers.estimated_diameter_max + asteroids.near_earth_objects[dayDate][i].estimated_diameter.kilometers.estimated_diameter_min);
    var velocity = asteroids.near_earth_objects[dayDate][i].close_approach_data[0].relative_velocity.kilometers_per_second;
    asteroidArray[i] = new Asteroid(distance / sizeRel, velocity * velocityRel, size / sizeRel);
  }
  //More slider settings
  /* slider = createSlider(2000, 10000, 2000, 2000);
  slider.position(window.innerWidth - 250, windowHeight - 150);
  slider.style('width', '200px');
  slider.style('height', '150px');
 */
}

function draw() {
  //Slider for changing the scale level through sizeRel
  /* let val = slider.value();
  sizeRel = val; */
  background(30);
  fill(0, 60, 255);
  noStroke();
  ellipse(width / 2, height / 2, 12742 / sizeRel)

  for (let j = 0; j < asteroids.element_count; j++) {
    asteroidArray[j].show();
    asteroidArray[j].update();
  }
  moon.show();
  moon.update();
}