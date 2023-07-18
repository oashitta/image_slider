const track = document.querySelector('.carousel__track');

// this is making all the li's in the carousel.track class and putting them in an array
const slides = Array.from(track.children);

const previousButton = document.querySelector('.carousel__button--left');

const nextButton = document.querySelector('.carousel__button--right');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

// provides the dimensions of the element.
// const slideSize = slides[0].getBoundingClientRect();
// const slideWidth = slideSize.width;
const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange the slides side by side - bad way
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

// better approach to addint slides side by side, as it would automatically do the calculation for you. - good way
// slides.forEach((slide, index) => {
//   slide.style.left = slideWidth * index + 'px';
// });

// can write it as a function declaration for clarity - better way
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// function to control slide changes
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    previousButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    previousButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    previousButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

// on click of left icon move slide to left
previousButton.addEventListener('click', (event) => {
  const currentSlide = track.querySelector('.current-slide');
  console.log(currentSlide); //by console logging this, you can see all the properties of the element.
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const previousDot = currentDot.previousElementSibling;
  const previousIndex = slides.findIndex((slide) => slide === previousSlide);

  moveToSlide(track, currentSlide, previousSlide);
  updateDots(currentDot, previousDot);
  hideShowArrows(slides, previousButton, nextButton, previousIndex);
});

// on click of right icon, move slide to right
nextButton.addEventListener('click', (event) => {
  const currentSlide = track.querySelector('.current-slide');
  // console.log(currentSlide);
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, previousButton, nextButton, nextIndex);
});

// add set interval
// image should change after every 4 seconds
// need a function to call every 4 seconds which changes the frame.
const startSlideShowInterval = function () {
  return setInterval(() => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling || dots[0];
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, previousButton, nextButton, nextIndex);
  }, 4000);
};

let intervalId = startSlideShowInterval();

// const intervalId = setInterval(() => {
//   const currentSlide = track.querySelector('.current-slide');
//   const nextSlide = currentSlide.nextElementSibling || slides[0];
//   const currentDot = dotsNav.querySelector('.current-slide');
//   const nextDot = currentDot.nextElementSibling || dots[0];
//   const nextIndex = slides.findIndex((slide) => slide === nextSlide);

//   moveToSlide(track, currentSlide, nextSlide);
//   updateDots(currentDot, nextDot);
//   hideShowArrows(slides, previousButton, nextButton, nextIndex);
// }, 2000);

// Function to clear the interval when the previous button is clicked
// previousButton.addEventListener('click', (event) => {
//   clearInterval(intervalId);
// });

track.addEventListener('mouseenter', (event) => {
  clearInterval(intervalId);
});
track.addEventListener('mouseleave', (event) => {
  intervalId = startSlideShowInterval();
});

// on click of nav indicators, move to that slide
dotsNav.addEventListener('click', (e) => {
  // to find out what indicator was clickced
  const targetDot = e.target.closest('button');
  // console.log('default test when not a button');
  if (!targetDot) return;
  // console.log('clicked a button');
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  // to return the index of the dot clicked on.
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  console.log(targetIndex);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

  hideShowArrows(slides, previousButton, nextButton, targetIndex);
});
