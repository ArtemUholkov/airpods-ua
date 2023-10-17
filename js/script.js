AOS.init();

const burger = document.querySelector('#burger');
const popup = document.querySelector('#popup');
const popupSlide = document.querySelector('#popupSlide');
const sliderItem = document.querySelectorAll('.our_requirements_content_item');
const sliderPhoto = document.querySelector('.our_requirements_img');
const body = document.body;
const casualLogo = document.querySelector('.logo-white');
const colorLogo = document.querySelector('.logo-color');

burger.addEventListener('click', burgerHandler);
popup.addEventListener('click', (e) => {
  burgerHandler(e);
});

sliderItem.forEach((e) => {
  e.addEventListener('click', () => {
    setImage(e, sliderItem);
  });
});

function burgerHandler(e) {
  if (popup.classList.contains('open')) {
    popup.classList.add('close');
    body.classList.remove('noscroll');
    popupSlide.classList.add('slideout');
    casualLogo.classList.remove('logo-hide');
    colorLogo.classList.add('logo-hide');
    setTimeout(() => {
      casualLogo.classList.remove('logo-hide');
      colorLogo.classList.add('logo-hide');
      // colorLogo.classList.remove('logo-hide');
      // casualLogo.classList.add('logo-hide');
    }, 270);
    setTimeout(() => {
      popup.classList.remove('close');
      popup.classList.remove('open');
      popupSlide.classList.remove('slideout');
      popupSlide.classList.remove('slidein');
    }, 270);
  } else {
    body.classList.add('noscroll');
    popup.classList.add('open');
    popupSlide.classList.add('slidein');
    setTimeout(() => {
      //   casualLogo.classList.remove('logo-hide');
      // colorLogo.classList.add('logo-hide');
      colorLogo.classList.remove('logo-hide');
      casualLogo.classList.add('logo-hide');
    }, 270);
  }
  burger.classList.toggle('active');
}

function scrollToNumbers() {
  document.querySelector('#numbers').scrollIntoView(true);
}
function scrollToSolutions() {
  document.querySelector('#solutions').scrollIntoView(true);
}
function scrollToProcess() {
  document.querySelector('#process').scrollIntoView(true);
}
function scrollToReviews() {
  document.querySelector('#reviews').scrollIntoView(true);
}
function scrollToTeam() {
  document.querySelector('#team').scrollIntoView(true);
}
function scrollToSub() {
  document.querySelector('#sub').scrollIntoView(true);
}
let copiedText = document.querySelectorAll('#trythis');
copiedText.forEach((elem) => elem.addEventListener('click', () => copyText(elem)));
console.log(colorLogo);

// Moves
function ball(name) {
  // DOM Object
  this.name = name;
  this.obj = document.getElementById(name);
  console.log(this);
  // Size
  this.size = {
    x: this.obj.offsetWidth,
    y: this.obj.offsetHeight,
  };
  // Parent size
  this.sizeParent = {
    x: this.obj.offsetParent.offsetWidth,
    y: this.obj.offsetParent.offsetHeight,
  };
  // Minimum position
  this.posMin = {
    x: this.size.x / 2,
    y: this.size.y / 2,
  };
  // Maximum position
  this.posMax = {
    x: this.sizeParent.x - this.size.x / 2,
    y: this.sizeParent.y - this.size.y / 2,
  };
  // Actual position
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  this.pos = {
    x: randomIntFromInterval(this.size.x, this.sizeParent.x),
    y: randomIntFromInterval(this.size.y, this.sizeParent.y),
  };
  // Actual speed
  this.speed = {
    x: 0,
    y: 0,
  };
  // Update time
  var time = new Date().getTime() / 1000;

  // Move to new position
  this.move = function (x, y) {
    // Limit
    this.pos.x = Math.min(this.posMax.x, Math.max(this.posMin.x, x));
    this.pos.y = Math.min(this.posMax.y, Math.max(this.posMax.y, y));
    // Updated
    time = new Date().getTime() / 1000;
  };

  // Paint
  this.paint = function () {
    // Bounce calculation
    // pos= current position
    // min= minimum position
    // max= maximum position
    // move= movement
    // Return new postion and bounce=true if bounced
    var bounced;
    function bounce(pos, min, max, move) {
      var range = max - min;
      // Normalize to [-2*range .. +2*range]
      if (move < 0) {
        move = -(-move % (2 * range));
      } else {
        move = move % (2 * range);
      }
      // New position without bounces
      var npos = pos + move;
      // Bounce on min side
      if (pos - min < -move && -move < range) {
        bounced = true;
        return 2 * min - npos;
      }
      // Bounce on max side
      if (max - pos < move && move < range) {
        bounced = true;
        return 2 * max - npos;
      }
      // No bounce, or even number of bounces
      bounced = false;
      return (npos + 2 * range) % (2 * range);
    }

    // Delta t
    var now = new Date().getTime() / 1000;
    var dt = now - time;
    time = now;
    // Move
    this.pos.x = bounce(this.pos.x, this.posMin.x, this.posMax.x, this.speed.x * dt);
    if (bounced) {
      this.speed.x = -this.speed.x;
    }
    this.pos.y = bounce(this.pos.y, this.posMin.y, this.posMax.y, this.speed.y * dt);
    if (bounced) {
      this.speed.y = -this.speed.y;
    }

    // Move
    this.obj.style.left = this.pos.x - this.size.x / 2 + 'px';
    this.obj.style.top = this.pos.y - this.size.y / 2 + 'px';
  };
}

// Balls
// var redball = new ball('redball');
// var greenball = new ball('greenball');
// var blueball = new ball('blueball');
var wball = new ball('wball');
var eball = new ball('eball');
var rball = new ball('rball');
var tball = new ball('tball');
var balls = [wball, eball, rball, tball];

// Random speed
function randomSpeed(i) {
  balls[i].speed.x = 100;
  balls[i].speed.y = 100;
}

// Initial speed
for (var i = 0; i < balls.length; i++) {
  randomSpeed(i);
}

// Play
window.setInterval(function () {
  randomSpeed(Math.floor(3 * Math.random()));
}, 100000);

// Paint
window.setInterval(function () {
  // redball.paint();
  // greenball.paint();
  // blueball.paint();
  wball.paint();
  eball.paint();
  rball.paint();
  tball.paint();
}, 10);
// console.log(document.querySelector('#redball'));
// $(document).ready(function () {
//   $('html,body').scrollTop(0);
// });
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 50) {
    $('.header').addClass('active');
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $('.header').removeClass('active');
  }
});

function thankyou() {
  setTimeout(() => {
    window.location.href = 'thankyou.html';
  }, 2000);
}
