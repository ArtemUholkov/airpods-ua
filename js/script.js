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

const cartIcon = document.querySelector('.cart_icon');
const cartSidebar = document.querySelector('.cart');

function openCart() {
  if (cartSidebar.classList.contains('open_cart')) {
    cartSidebar.classList.remove('open_cart');
  } else {
    cartSidebar.classList.add('open_cart');
  }
}

const cartCloseX = document.querySelector('.cart_close_space');
function closeCart() {
  cartSidebar.classList.remove('open_cart');
}

const itemsButtons = document.querySelectorAll('.pods_button');
const cartSubIcon = document.querySelector('.cart_number');
const cartWrapper = document.querySelector('.cart');

itemsButtons.forEach((e) => {
  e.addEventListener('click', (event) => {
    cartSubIcon.classList.add('cart_number_visual');
    cartWrapper.classList.add('open_cart');
    const imageLink = event.target.parentElement.previousElementSibling.children[0].src;
    const itemTitle = event.target.parentElement.children[0].children[0].innerHTML;
    const itemPrice = event.target.parentElement.children[0].children[1].children[0].innerHTML;

    const cartItemWrapper = document.querySelector('.cart_items_wrapper');
    const cartItem = document.createElement(`div`);
    cartItem.classList.add('cart_item');
    cartItem.innerHTML = `
      
        <div class="cart_item_content_wrapper">
          <div class="cart_item_info">
            <img src="${imageLink}" alt="" class="cart_item_image" />
            <div class="cart_item_text">
              <p class="cart_item_text_name">${itemTitle}</p>
              <p class="cart_item_text_available">В наявності</p>
              <p class="cart_item_text_price">${itemPrice}₴/ шт</p>
            </div>
          </div>
          <img src="img/cart/bin.svg" alt="" class="cart_item_bin" />
        </div>
        <div class="cart_quantity_total_wrapper">
          <div class="cart_quantity_wrapper">
            <span class="cart_minus">-</span>
            <span class="cart_quantity">1</span>
            <span class="cart_plus">+</span>
          </div>
          <span class="cart_item_price">${itemPrice}₴</span>
        </div>
      
    `;
    cartItemWrapper.appendChild(cartItem);
    const cartBins = document.querySelectorAll('.cart_item_bin');
    cartBins.forEach((e) => {
      e.addEventListener('click', (event) => {
        event.target.parentElement.parentElement.remove();
      });
    });
    const totalPrice = document.querySelector('.cart_total_amount');
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + Number(itemPrice);
  });
});
