let sketch = function (p) {
  const particles = [];

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    const particlesLength = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < particlesLength; i++) {
      particles.push(new Particle());
    }
  };
  p.draw = function () {
    p.background(37, 41, 52);
    particles.map((particle, index) => {
      particle.update();
      particle.draw();
      particle.checkParticles(particles.slice(index));
    });
  };

  class Particle {
    constructor() {
      // Position
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      // Size
      this.size = 5;
      // Velocity
      this.vel = p.createVector(p.random(-3, 3), p.random(-2, 2));
    }

    update() {
      this.pos.add(this.vel);
      this.edges();
    }

    // draw() {
    //   p.noStroke();
    //
    //   p.circle(this.pos.x, this.pos.y, this.size);
    // }

    draw() {
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      p.noStroke();
      // p.fill("#" + (((1 << 24) * Math.random()) | 0).toString(16));
      p.fill(`rgba(${r},${g},${b},.8)`);
      p.circle(this.pos.x, this.pos.y, this.size);
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > p.width) {
        this.vel.x *= -1;
      }
      if (this.pos.y < 0 || this.pos.y > p.height) {
        this.vel.y *= -1;
      }
    }

    checkParticles(particles) {
      particles.map((particle) => {
        const distance = p.dist(
          this.pos.x,
          this.pos.y,
          particle.pos.x,
          particle.pos.y
        );
        if (distance < 100) {
          p.stroke('rgba(255,255,255,0.1)');
          p.line(this.pos.x, -100, particle.pos.x, particle.pos.y);
        }
      });
    }
  }
};
new p5(sketch, 'header');
