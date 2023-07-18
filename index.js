// image shld automatically move every 5 seconds.

// Images should move to next and previous on click of arrows.
// select element to be clicked
const image = document.querySelector('.image-{#}');
// describe action to be carried out on the element.
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

// on click of next, image to move +1 (image classes are written as "image-#")
next.addEventListener('click', () => {
  // image should change to the next
});

// on click of previous, image to move -1
previous.addEventListener('click', () => {
  // image should change to the previous
});

// bottom navigation should be clickable and advance to particilar slide.
