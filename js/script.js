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
const totalPrice = document.querySelector('.cart_total_amount');
const item = document.querySelector('.cart_item');
itemsButtons.forEach((e) => {
  e.addEventListener('click', (event) => {
    cartWrapper.classList.add('open_cart');
    const imageLink = event.target.parentElement.previousElementSibling.children[0].src;
    const itemTitle = event.target.parentElement.children[0].children[0].innerHTML;
    const itemPrice = event.target.parentElement.children[0].children[1].children[0].innerHTML;
    console.log(itemTitle);

    if (cartWrapper.innerHTML.includes(itemTitle)) {
      cartWrapper.classList.add('open_cart');
    } else {
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
          <div class="total_amount_wrapper">
            <p class="cart_item_text_price"><span>${itemPrice}</span><span class="grn cart_item_text_price">₴</span></p>
          </div>
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
      <div class="total_amount_wrapper">
      <span class="cart_item_price">${itemPrice}</span><span class="grn cart_item_price">₴</span>
      
    </div>
`;
      cartItemWrapper.appendChild(cartItem);

      const totalPrice = document.querySelector('.cart_total_amount');

      totalPrice.innerHTML = Number(totalPrice.innerHTML) + Number(itemPrice);

      const item = document.querySelector('.cart_item');
      cartSubIcon.innerHTML = Number(cartSubIcon.innerHTML) + 1;
      cartItemWrapper.contains(item)
        ? cartSubIcon.classList.add('cart_number_visual')
        : cartSubIcon.classList.remove('cart_number_visual');
    }
  });
});
const wrapper = document.querySelector('.cart_items_wrapper');

wrapper.addEventListener('click', function (e) {
  let quantity = Number(e.target.parentElement.children[1].innerHTML);

  if (e.target.classList.contains('cart_plus')) {
    quantity++;
    e.target.parentElement.children[1].innerHTML = quantity;
    e.target.parentElement.parentElement.children[1].children[0].innerHTML =
      Number(
        e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1]
          .children[2].children[0].children[0].innerHTML,
      ) * quantity;

    totalPrice.innerHTML =
      Number(totalPrice.innerHTML) +
      Number(
        e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1]
          .children[2].children[0].children[0].innerHTML,
      );
  } else if (e.target.classList.contains('cart_minus')) {
    if (quantity > 1) {
      quantity--;
      e.target.parentElement.children[1].innerHTML = quantity;
      e.target.parentElement.parentElement.children[1].children[0].innerHTML =
        Number(
          e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1]
            .children[2].children[0].children[0].innerHTML,
        ) * quantity;
      totalPrice.innerHTML =
        Number(totalPrice.innerHTML) -
        Number(
          e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1]
            .children[2].children[0].children[0].innerHTML,
        );
    }
  } else if (e.target.classList.contains('cart_item_bin')) {
    e.target.parentElement.parentElement.remove();
    cartSubIcon.innerHTML = Number(cartSubIcon.innerHTML) - 1;

    totalPrice.innerHTML =
      Number(totalPrice.innerHTML) -
      Number(e.target.parentElement.parentElement.children[1].children[1].children[0].innerHTML);
    wrapper.contains(item)
      ? cartSubIcon.classList.add('cart_number_visual')
      : cartSubIcon.classList.remove('cart_number_visual');
  }
});

// const minuses = document.querySelectorAll('.cart_minus');
// const pluses = document.querySelectorAll('.cart_plus');
// const quantities = document.querySelectorAll('.cart_quantity');
// console.log(minuses, pluses, quantities);

// pluses.forEach((e) => {
//   e.addEventListener('click', (event) => {
//     console.log(event.target.parentElement.children[1].innerHTML);
//   });
// });

// cartBins.forEach((e, i) => {
//   e.addEventListener('click', (event) => {
//     event.target.parentElement.parentElement.remove();
//     const item = document.querySelector('.cart_item');
//     cartItemWrapper.contains(item)
//       ? cartSubIcon.classList.add('cart_number_visual')
//       : cartSubIcon.classList.remove('cart_number_visual');
//   });
// });
