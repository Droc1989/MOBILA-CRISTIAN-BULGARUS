(() => {
  'use strict';

  const canvas = document.querySelector('#room-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const photoInput = document.querySelector('#room-photo');
  const deleteButton = document.querySelector('#delete-furniture');
  const downloadButton = document.querySelector('#download-room');
  const status = document.querySelector('#planner-status');
  const frame = canvas.closest('.canvas-frame');
  const thumbs = [...document.querySelectorAll('.furniture-thumb')];

  const MAX_CANVAS_EDGE = 1800;
  const MIN_ITEM_SIZE = 70;
  let roomImage = null;
  let roomUrl = '';
  let items = [];
  let selected = null;
  let action = null;
  let pointerId = null;

  const furnitureImages = new Map();
  thumbs.forEach((button) => {
    const image = new Image();
    image.decoding = 'async';
    image.src = button.dataset.furniture;
    furnitureImages.set(button.dataset.furniture, image);
  });

  function setStatus(message) {
    status.textContent = message;
  }

  function updateControls() {
    deleteButton.disabled = !selected;
    downloadButton.disabled = !roomImage;
    frame.classList.toggle('has-photo', Boolean(roomImage));
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function toLocal(point, item) {
    const cos = Math.cos(-item.rotation);
    const sin = Math.sin(-item.rotation);
    const dx = point.x - item.x;
    const dy = point.y - item.y;
    return { x: dx * cos - dy * sin, y: dx * sin + dy * cos };
  }

  function uiSize() {
    return Math.max(12, Math.min(canvas.width, canvas.height) * 0.022);
  }

  function handlePositions(item) {
    const gap = uiSize() * 2.4;
    const rotatePoint = rotateLocalPoint(item, { x: 0, y: -item.h / 2 - gap });
    const resizePoint = rotateLocalPoint(item, { x: item.w / 2, y: item.h / 2 });
    return { rotate: rotatePoint, resize: resizePoint };
  }

  function rotateLocalPoint(item, local) {
    const cos = Math.cos(item.rotation);
    const sin = Math.sin(item.rotation);
    return { x: item.x + local.x * cos - local.y * sin, y: item.y + local.x * sin + local.y * cos };
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function drawSelection(item) {
    const size = uiSize();
    const gap = size * 2.4;
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.rotation);
    ctx.strokeStyle = '#c29a56';
    ctx.lineWidth = Math.max(3, size * 0.18);
    ctx.setLineDash([size * 0.65, size * 0.4]);
    ctx.strokeRect(-item.w / 2, -item.h / 2, item.w, item.h);
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(0, -item.h / 2);
    ctx.lineTo(0, -item.h / 2 - gap);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#2f211a';
    ctx.lineWidth = Math.max(2, size * 0.12);
    ctx.beginPath();
    ctx.arc(0, -item.h / 2 - gap, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#c29a56';
    ctx.beginPath();
    ctx.arc(0, -item.h / 2 - gap, size * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#2f211a';
    ctx.fillRect(item.w / 2 - size, item.h / 2 - size, size * 2, size * 2);
    ctx.strokeRect(item.w / 2 - size, item.h / 2 - size, size * 2, size * 2);
    ctx.fillStyle = '#c29a56';
    ctx.fillRect(item.w / 2 - size * 0.42, item.h / 2 - size * 0.42, size * 0.84, size * 0.84);
    ctx.restore();
  }

  function draw(showSelection = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (roomImage) ctx.drawImage(roomImage, 0, 0, canvas.width, canvas.height);
    else {
      ctx.fillStyle = '#eee5d8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    items.forEach((item) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.drawImage(item.image, -item.w / 2, -item.h / 2, item.w, item.h);
      ctx.restore();
    });
    if (showSelection && selected) drawSelection(selected);
  }

  function selectAt(point) {
    if (selected) {
      const handles = handlePositions(selected);
      const radius = uiSize() * 1.55;
      if (distance(point, handles.rotate) <= radius) return { item: selected, mode: 'rotate' };
      if (distance(point, handles.resize) <= radius) return { item: selected, mode: 'resize' };
    }
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index];
      const local = toLocal(point, item);
      if (Math.abs(local.x) <= item.w / 2 && Math.abs(local.y) <= item.h / 2) return { item, mode: 'move' };
    }
    return null;
  }

  function loadRoom(file) {
    if (!file || !file.type.startsWith('image/')) {
      setStatus('Alege o fotografie validă în format imagine.');
      return;
    }
    if (roomUrl) URL.revokeObjectURL(roomUrl);
    roomUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, MAX_CANVAS_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      roomImage = image;
      items = [];
      selected = null;
      action = null;
      updateControls();
      draw();
      setStatus('Fotografia este pregătită. Alege o piesă de mobilier.');
    };
    image.onerror = () => setStatus('Fotografia nu a putut fi deschisă. Încearcă o altă imagine.');
    image.src = roomUrl;
  }

  function addFurniture(button) {
    if (!roomImage) {
      setStatus('Încarcă mai întâi fotografia camerei.');
      photoInput.focus();
      return;
    }
    const image = furnitureImages.get(button.dataset.furniture);
    const insert = () => {
      const targetWidth = canvas.width * 0.34;
      const naturalRatio = image.naturalHeight / image.naturalWidth;
      const targetHeight = targetWidth * naturalRatio;
      const fit = Math.min(1, (canvas.height * 0.55) / targetHeight);
      const item = {
        image,
        name: button.dataset.name,
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: targetWidth * fit,
        h: targetHeight * fit,
        rotation: 0
      };
      items.push(item);
      selected = item;
      updateControls();
      draw();
      setStatus(`${item.name} a fost adăugată. Trage piesa pentru a o poziționa.`);
    };
    if (image.complete && image.naturalWidth) insert();
    else {
      image.addEventListener('load', insert, { once: true });
      image.addEventListener('error', () => setStatus('Piesa nu a putut fi încărcată.'), { once: true });
    }
  }

  function onPointerDown(event) {
    if (!roomImage) return;
    const point = canvasPoint(event);
    const hit = selectAt(point);
    selected = hit?.item || null;
    updateControls();
    if (!hit) {
      draw();
      return;
    }
    pointerId = event.pointerId;
    canvas.setPointerCapture(pointerId);
    const startDistance = Math.max(1, distance(point, { x: selected.x, y: selected.y }));
    action = {
      mode: hit.mode,
      start: point,
      startX: selected.x,
      startY: selected.y,
      startW: selected.w,
      startH: selected.h,
      startRotation: selected.rotation,
      startAngle: Math.atan2(point.y - selected.y, point.x - selected.x),
      startDistance
    };
    event.preventDefault();
    draw();
  }

  function onPointerMove(event) {
    if (!action || !selected || event.pointerId !== pointerId) return;
    const point = canvasPoint(event);
    if (action.mode === 'move') {
      selected.x = action.startX + point.x - action.start.x;
      selected.y = action.startY + point.y - action.start.y;
    } else if (action.mode === 'resize') {
      const scale = Math.max(MIN_ITEM_SIZE / Math.min(action.startW, action.startH), distance(point, selected) / action.startDistance);
      selected.w = action.startW * scale;
      selected.h = action.startH * scale;
    } else if (action.mode === 'rotate') {
      const angle = Math.atan2(point.y - selected.y, point.x - selected.x);
      selected.rotation = action.startRotation + angle - action.startAngle;
    }
    event.preventDefault();
    draw();
  }

  function endPointer(event) {
    if (event.pointerId !== pointerId) return;
    if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
    action = null;
    pointerId = null;
  }

  photoInput.addEventListener('change', () => {
    const [file] = photoInput.files;
    if (file) loadRoom(file);
    photoInput.value = '';
  });
  thumbs.forEach((button) => button.addEventListener('click', () => addFurniture(button)));
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);

  deleteButton.addEventListener('click', () => {
    if (!selected) return;
    const name = selected.name;
    items = items.filter((item) => item !== selected);
    selected = null;
    updateControls();
    draw();
    setStatus(`${name} a fost ștearsă din fotografie.`);
  });

  downloadButton.addEventListener('click', () => {
    if (!roomImage) return;
    draw(false);
    canvas.toBlob((blob) => {
      draw(true);
      if (!blob) {
        setStatus('Imaginea nu a putut fi exportată.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `camera-cu-mobila-${Date.now()}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('Imaginea PNG a fost descărcată fără chenarul de selecție.');
    }, 'image/png');
  });

  updateControls();
  draw();
})();
