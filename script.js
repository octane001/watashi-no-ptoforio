const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Hide cursor on touch devices
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
  const handleMouseMove = throttle((e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  }, 16); // ~60fps

  window.addEventListener("mousemove", handleMouseMove);
} else {
  // Hide custom cursor on touch devices
  cursorDot.style.display = 'none';
  cursorOutline.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  } else {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  }
});