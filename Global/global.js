document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  const header = document.querySelector('header');

  if (!canvas || !header) return;

  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = header.offsetWidth;
    height = canvas.height = header.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let mouse = { x: null, y: null, active: false };

  // Listen to mouse movement over the entire header area
  header.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  header.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const particleCount = 40;
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : width + Math.random() * 50;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseSpeedX = -(Math.random() * 0.4 + 0.1); // Slow drift right to left
      this.vx = this.baseSpeedX;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.color = Math.random() > 0.3 ? 'rgba(168, 85, 247, ' : 'rgba(192, 132, 252, ';
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
        // 1. Natural drift
        this.x += this.vx;
        this.y += this.vy;

        // 2. Cursor Attraction
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;

            if (distance < maxDistance) {
            const force = (1 - distance / maxDistance); 
            const speedMultiplier = force * 0.3;

            this.x += (dx / distance) * speedMultiplier;
            this.y += (dy / distance) * speedMultiplier;
            }
        }
    

        // 3. SAFETY BOUNDARY CHECK (Reset particle if it leaves ANY edge)
        if (
            this.x < -20 ||          // Gone too far Left
            this.x > width + 50 ||   // Pushed too far Right
            this.y < -20 ||          // Pushed off the Top
            this.y > height + 20     // Pushed off the Bottom
        ) {
            this.reset(false);
        }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConstellations() {
    const maxLineDist = 90;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLineDist) {
          const lineAlpha = (1 - dist / maxLineDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConstellations();
    requestAnimationFrame(animate);
  }

  animate();
});