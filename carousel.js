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

// on click of right icon, move slide to right
nextButton.addEventListener('click', (event) => {
  const currentSlide = track.querySelector('.current-slide');
  console.log(currentSlide);
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;
  // console.log(amountToMove);
  // move to next slide
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
});

// on click of left icon move slide to left
// on click of nav indicators, move to that slide
