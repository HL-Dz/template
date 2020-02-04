// SHOW THANKS BLOCK
let form = document.querySelector('.feedback__form')
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  let thanks = document.querySelector('.thanks');
  setTimeout(() => {
    thanks.style.display = 'block';
  }, 1000);
})


// VIDEO BLOCK
let video = document.querySelector('.video');
video.addEventListener('click', function (e) {

  video.classList.toggle('video__active');
})
