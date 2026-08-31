const heroSceneState = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  activated: false
};

function setupHeroPhotoScene() {
  const scene = document.getElementById('heroPhotoScene');
  const card = document.querySelector('.hero-photo-card');
  const photo = document.querySelector('.hero-photo');

  if (!scene || !card || !photo) return;

  const handlePointer = (event) => {
    const rect = card.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;

    heroSceneState.activated = true;
    heroSceneState.targetX = (localX - 0.5) * 18;
    heroSceneState.targetY = (localY - 0.5) * 16;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--mouse-x', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--mouse-y', `${(py * 100).toFixed(1)}%`);
  };

  const resetPointer = () => {
    heroSceneState.activated = false;
    heroSceneState.targetX = 0;
    heroSceneState.targetY = 0;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  };

  const animate = () => {
    heroSceneState.x += (heroSceneState.targetX - heroSceneState.x) * 0.08;
    heroSceneState.y += (heroSceneState.targetY - heroSceneState.y) * 0.08;

    const rotateY = heroSceneState.x * 0.7;
    const rotateX = heroSceneState.y * -0.6;
    const imageX = heroSceneState.x * -0.9;
    const imageY = heroSceneState.y * -0.7;

    card.style.transform = `translate3d(0, 0, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    photo.style.transform = `translate3d(${imageX}px, ${imageY}px, 0) scale(1.04)`;

    requestAnimationFrame(animate);
  };

  card.addEventListener('pointermove', handlePointer);
  card.addEventListener('pointerleave', resetPointer);
  window.addEventListener('blur', resetPointer);

  scene.classList.add('is-ready');
  card.style.setProperty('--mouse-x', '50%');
  card.style.setProperty('--mouse-y', '50%');
  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', () => {
  setupHeroPhotoScene();
});
