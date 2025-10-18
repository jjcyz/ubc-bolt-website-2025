import React, { useEffect, useRef } from 'react';

const SpaceScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Store mount ref for cleanup
    const currentMount = mountRef.current;

    // Setup Intersection Observer to pause animation when not visible
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (currentMount) {
      observer.observe(currentMount);
    }

    const cleanupObserver = () => {
      if (currentMount) {
        observer.unobserve(currentMount);
      }
    };

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'crosshair';

    // Add canvas to DOM first so we can get dimensions
    mountRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Star data with realistic properties
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      brightness: number;      // For twinkling effect
      twinkleSpeed: number;    // How fast it twinkles
      twinklePhase: number;    // Current phase in twinkle cycle
      temperature: number;     // Star temperature for realistic colors
    }> = [];

    // Explosion particles
    const explosions: Array<{
      x: number;
      y: number;
      particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        maxLife: number;
        size: number;
        color: string;
      }>;
    }> = [];

    // Comets
    const comets: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      trail: Array<{ x: number; y: number; alpha: number }>;
    }> = [];

    // Nebula clouds
    const nebulaClouds: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      drift: number;
    }> = [];

    // Meteor shower state
    let meteorShowerActive = false;
    let meteorShowerTimer = 0;

    // Set canvas size based on container
    const resizeCanvas = () => {
      const container = mountRef.current;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Only proceed if container has valid dimensions
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;

          // Recreate stars with realistic properties
          if (stars.length === 0) {
            for (let i = 0; i < 300; i++) {
              const temp = Math.random();
              // Star temperature determines color (like real stars)
              let color;
              if (temp < 0.3) {
                color = '#9bb0ff'; // Blue giants (hot)
              } else if (temp < 0.6) {
                color = '#ffffff'; // White stars (medium)
              } else if (temp < 0.85) {
                color = '#fff4ea'; // Yellow-white (sun-like)
              } else {
                color = '#ffcc99'; // Orange-red (cooler)
              }

              const size = Math.random() * 2.5 + 0.5;
              stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 1000,
                size: size,
                color: color,
                speed: Math.random() * 2 + 0.5,
                brightness: Math.random() * 0.5 + 0.5, // 0.5-1.0 base brightness
                twinkleSpeed: Math.random() * 0.02 + 0.01, // Slow twinkle
                twinklePhase: Math.random() * Math.PI * 2,
                temperature: temp
              });
            }
          }

          // Create nebula clouds (subtle, minimal opacity for cleaner look)
          if (nebulaClouds.length === 0) {
            for (let i = 0; i < 3; i++) {
              nebulaClouds.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 200 + 150,
                color: Math.random() < 0.5 ? '#7c3aed' : '#8b5cf6', // Brighter purple tones
                alpha: Math.random() * 0.06 + 0.02, // Much lower opacity (was 0.15-0.20, now 0.02-0.08)
                drift: Math.random() * 0.2 - 0.1
              });
            }
          }
        }
      }
    };

    // Create explosion on click (reduced particle count for performance)
    const createExplosion = (clickX: number, clickY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clickX - rect.left;
      const y = clickY - rect.top;

      const particles = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 5 + 2;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: Math.random() * 60 + 40,
          size: Math.random() * 3 + 1,
          color: Math.random() < 0.4 ? '#ffffff' : Math.random() < 0.7 ? '#f0abfc' : '#c084fc' // Brighter explosion colors
        });
      }

      explosions.push({ x, y, particles });
    };

    // Spawn comet
    const spawnComet = () => {
      if (Math.random() < 0.01) { // Increased probability for more comets
        const fromTop = Math.random() < 0.5;
        comets.push({
          x: fromTop ? Math.random() * canvas.width : canvas.width,
          y: fromTop ? 0 : Math.random() * canvas.height,
          vx: -Math.random() * 4 - 3,
          vy: Math.random() * 3 + 1,
          size: Math.random() * 3 + 1.5,
          life: 0,
          trail: []
        });
      }
    };

    // Trigger meteor shower randomly
    const checkMeteorShower = () => {
      if (!meteorShowerActive && Math.random() < 0.0002) { // Very rare
        meteorShowerActive = true;
        meteorShowerTimer = 300; // 5 seconds at 60fps
      }

      if (meteorShowerActive) {
        meteorShowerTimer--;
        if (meteorShowerTimer <= 0) {
          meteorShowerActive = false;
        }
      }
    };

    // Initial resize with a small delay to ensure container is rendered
    setTimeout(() => {
      resizeCanvas();
    }, 100);

    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    // Animation
    let animationId: number;

    const animate = () => {
      // Skip animation if not visible (performance optimization)
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with deep space gradient (improved contrast and vibrancy)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#2d1b4e');  // Deeper vibrant purple center
      gradient.addColorStop(0.4, '#1a0b2e'); // Rich dark purple
      gradient.addColorStop(0.8, '#0d0618'); // Very dark purple-black
      gradient.addColorStop(1, '#000000');   // Pure black edges
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      nebulaClouds.forEach((cloud) => {
        cloud.x += cloud.drift;

        // Wrap around
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;

        const nebulaGradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        nebulaGradient.addColorStop(0, cloud.color + Math.floor(cloud.alpha * 255).toString(16).padStart(2, '0'));
        nebulaGradient.addColorStop(0.5, cloud.color + Math.floor(cloud.alpha * 128).toString(16).padStart(2, '0'));
        nebulaGradient.addColorStop(1, cloud.color + '00');

        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Check for meteor shower
      checkMeteorShower();

      // Spawn comets (more frequent during meteor shower)
      if (meteorShowerActive) {
        if (Math.random() < 0.1) spawnComet();
      } else {
        spawnComet();
      }

      // Update and draw comets
      comets.forEach((comet) => {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.life++;

        // Add to trail
        comet.trail.push({ x: comet.x, y: comet.y, alpha: 1 });
        if (comet.trail.length > 20) comet.trail.shift();

        // Draw trail with vibrant colors
        comet.trail.forEach((point, i) => {
          const alpha = (i / comet.trail.length) * 0.8;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#c084fc'; // Brighter purple
          ctx.beginPath();
          ctx.arc(point.x, point.y, comet.size * (i / comet.trail.length), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw comet head with vibrant gradient
        const cometGradient = ctx.createRadialGradient(
          comet.x, comet.y, 0,
          comet.x, comet.y, comet.size * 4
        );
        cometGradient.addColorStop(0, '#ffffff');
        cometGradient.addColorStop(0.3, '#f0abfc'); // Bright pink-purple
        cometGradient.addColorStop(0.6, '#c084fc'); // Bright purple
        cometGradient.addColorStop(1, '#a78bfa00'); // Transparent purple

        ctx.fillStyle = cometGradient;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Remove off-screen comets
      for (let i = comets.length - 1; i >= 0; i--) {
        if (comets[i].x < -100 || comets[i].y > canvas.height + 100 || comets[i].life > 200) {
          comets.splice(i, 1);
        }
      }

      // Update and draw explosions
      explosions.forEach((explosion) => {
        explosion.particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life++;
          particle.vx *= 0.98; // Friction
          particle.vy *= 0.98;

          const lifeRatio = particle.life / particle.maxLife;
          const alpha = 1 - lifeRatio;

          if (alpha > 0) {
            ctx.save();
            ctx.globalAlpha = alpha;

            // Glow
            const particleGradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size * 3
            );
            particleGradient.addColorStop(0, particle.color);
            particleGradient.addColorStop(0.5, particle.color + '80');
            particleGradient.addColorStop(1, particle.color + '00');

            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
            ctx.fill();

            // Center
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        });

        // Remove dead particles
        explosion.particles = explosion.particles.filter(p => p.life < p.maxLife);
      });

      // Remove empty explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        if (explosions[i].particles.length === 0) {
          explosions.splice(i, 1);
        }
      }

      // Update and draw hyperrealistic stars
      stars.forEach((star) => {
        // Move stars (faster during meteor shower)
        star.z -= star.speed * (meteorShowerActive ? 2 : 1);

        // Update twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7; // 0.4-1.0 range

        // Reset star if it goes too far back
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Calculate 3D position
        const x = (star.x - canvas.width / 2) * (200 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (200 / star.z) + canvas.height / 2;

        // Mouse parallax effect
        const parallaxX = (mouseX - 0.5) * 20;
        const parallaxY = (mouseY - 0.5) * 20;

        const finalX = x + parallaxX;
        const finalY = y + parallaxY;

        // Draw star
        if (finalX >= 0 && finalX <= canvas.width && finalY >= 0 && finalY <= canvas.height) {
          const depth = Math.max(0, 1 - star.z / 1000);
          const size = star.size * (200 / star.z);
          const brightness = star.brightness * twinkle * depth;

          ctx.save();
          ctx.globalAlpha = brightness;

          // Draw star cross/spike effect for brighter stars
          if (size > 1.5 && brightness > 0.6) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = brightness * 0.4;

            // Horizontal spike
            ctx.beginPath();
            ctx.moveTo(finalX - size * 4, finalY);
            ctx.lineTo(finalX + size * 4, finalY);
            ctx.stroke();

            // Vertical spike
            ctx.beginPath();
            ctx.moveTo(finalX, finalY - size * 4);
            ctx.lineTo(finalX, finalY + size * 4);
            ctx.stroke();
          }

          ctx.globalAlpha = brightness;

          // Outer glow
          const outerGlow = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, size * 4);
          outerGlow.addColorStop(0, star.color);
          outerGlow.addColorStop(0.2, star.color + 'AA');
          outerGlow.addColorStop(0.5, star.color + '40');
          outerGlow.addColorStop(1, star.color + '00');

          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(finalX, finalY, size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Inner glow (brighter core)
          const innerGlow = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, size * 1.5);
          innerGlow.addColorStop(0, '#ffffff');
          innerGlow.addColorStop(0.4, star.color);
          innerGlow.addColorStop(1, star.color + '00');

          ctx.fillStyle = innerGlow;
          ctx.beginPath();
          ctx.arc(finalX, finalY, size * 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright center point
          ctx.globalAlpha = brightness * 1.2;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(finalX, finalY, size * 0.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Click handler for explosions
    const handleClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Start animation
    animate();

    // Cleanup
    return () => {
      cleanupObserver();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (currentMount && canvas.parentNode) {
        currentMount.removeChild(canvas);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none bg-transparent overflow-hidden"
    />
  );
};

export default SpaceScene;
