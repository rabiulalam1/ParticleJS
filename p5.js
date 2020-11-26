let sketch = function (p) {
  const particles = [];

  p.setup = function () {
    p.createCanvas(window.innerWidth - 18, window.innerHeight);
    const particlesLength = Math.floor(window.innerWidth / 12);

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
      this.vel = p.createVector(p.random(-2, 2), p.random(-1, 1));
    }

    update() {
      this.pos.add(this.vel);
      this.edges();
    }

    draw() {
      p.noStroke();
      p.fill("#" + (((1 << 24) * Math.random()) | 0).toString(16));
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
        if (distance < 120) {
          p.stroke("rgba(255,255,255,0.1)");
          p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
  }
};
new p5(sketch, "container");
