// ---------sliding images---------

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



// ----------sliding bar----------

const sliderCircle = document.querySelector('.slider-circle');
const sliderBar = document.querySelector('.slider-bar');
let isDragging = false;

sliderCircle.addEventListener('mousedown', (event) => {
  isDragging = true;
});

document.addEventListener('mouseup', (event) => {
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const sliderRect = sliderBar.getBoundingClientRect();
    let newPosition = event.clientX - sliderRect.left;
    newPosition = Math.max(newPosition, 0);
    newPosition = Math.min(newPosition, sliderRect.width);
    sliderCircle.style.right = `${sliderRect.width - newPosition}px`;
  }
});