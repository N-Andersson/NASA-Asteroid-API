class Asteroid {

  constructor(distance, velocity, diameter) {
    this.distance = distance;
    this.velocity = velocity;
    this.diameter = diameter;

    this.angle = random(0, PI * 2)
    this.x = width / 2 + this.distance * cos(this.angle);
    this.y = height / 2 + this.distance * sin(this.angle);
    this.angVel = (this.velocity / this.distance) * (Math.round(Math.random()) * 2 - 1);

    this.history = [];
    this.index = 0;

  }

  show() {
    stroke(255);
    fill(255);
    ellipse(width / 2 + this.x, height / 2 + this.y, this.diameter, this.diameter);
  }

  update() {
    this.angle = this.angle + this.angVel;
    this.x = this.distance * cos(this.angle);
    this.y = this.distance * sin(this.angle);
    this.index++;

    if (this.index % 10 == 0) {
      var v = createVector(this.x, this.y)

      this.history.push(v)

      if (this.history.length > 10) {
        this.history.splice(0, 1)
      }
    }

    push();
    translate(width / 2, height / 2)
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      fill(255, 100 * i)
      ellipse(pos.x, pos.y, 1)

    }
    pop();
  }


}