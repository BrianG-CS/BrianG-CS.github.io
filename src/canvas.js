
draw: function draw() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgb(15, 77, 99)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
  }
}

