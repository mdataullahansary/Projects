const btn = document.querySelector(".btn");
btn.addEventListener('mousemove', (event) => {
   const posX = event.offsetX;
   const posY = event.offsetY;
   btn.style.setProperty('--x-pos', `${posX}px`);
    btn.style.setProperty('--y-pos', `${posY}px`);

    
});

const num = Math.random;
    console.log(num)
