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

function scrollToPods() {
  document.querySelector('#pods').scrollIntoView(true);
}
function scrollToSolutions() {
  document.querySelector('#solutions').scrollIntoView(true);
}
function scrollToFAQ() {
  document.querySelector('#faq').scrollIntoView(true);
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
  e.addEventListener(
    'click',
    function addItem(event) {
      cartWrapper.classList.add('open_cart');
      const imageLink = event.target.parentElement.previousElementSibling.children[0].src;
      const itemTitle = event.target.parentElement.children[0].children[0].innerHTML;
      const itemPrice = event.target.parentElement.children[0].children[1].children[0].innerHTML;

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
            <p class="cart_item_text_price"><span>${itemPrice}</span><span class="grn cart_item_text_price">₴/шт</span></p>
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
    },
    true,
  );
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
function openCartForm() {
  if (cartFormWrapper.classList.contains('open_cart')) {
    cartFormWrapper.classList.remove('open_cart');
  } else {
    cartFormWrapper.classList.add('open_cart');
  }
}

const allItems = document.querySelector('.cart_items_wrapper');
const buttonInCart = document.querySelector('#button_in_cart');
const cartFormWrapper = document.querySelector('.cart_form');
const cartBins = document.querySelectorAll('.cart_item_bin');

buttonInCart.addEventListener('click', (event) => {
  event.preventDefault();
  const cartItems = document.querySelectorAll('.cart_item');
  const cartBins = document.querySelectorAll('.cart_item_bin');
  const itemsInfo = document.querySelectorAll('.cart_quantity_total_wrapper');
  const itemsimages = document.querySelectorAll('.cart_item_image');
  const itemTitles = document.querySelectorAll('.cart_item_text_name');
  const cartitemsText = document.querySelectorAll('.cart_item_text_available');
  const cartItemsPrice = document.querySelectorAll('.cart_item_text_price');
  const cartTitle = document.querySelector('.cart_title');
  const formWrapper = document.querySelector('.form_wrapper');
  cartItems.forEach((e) => {
    e.classList.add('cart_item_afterclick');
  });
  cartBins.forEach((e) => {
    e.classList.add('cart_item_display_none');
  });
  itemsInfo.forEach((e) => {
    e.classList.add('cart_item_display_none');
  });
  itemsimages.forEach((e) => {
    e.classList.add('cart_item_image_afterclick');
  });
  itemTitles.forEach((e) => {
    e.classList.add('cart_item_text_name_afterclick');
  });
  cartitemsText.forEach((e) => {
    e.classList.add('cart_item_text_available_afterclick');
  });
  cartItemsPrice.forEach((e) => {
    e.classList.add('cart_item_text_price_afterclick');
  });
  cartTitle.innerHTML = 'Оформлення замовлення';
  cartTitle.classList.add('cart_title_afterclick');
  itemsButtons.forEach((e) => {
    e.classList.add('no-click');
  });
  formWrapper.classList.add('make_visual');
});

const citySelect = document.querySelector('.cityselect');
const cityList = document.querySelector('.city_list');
let cityFinalList = [];
let output = '';
const delay = 400;
let timer;
let delivery;

citySelect.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(citySelect.value);
    cityFinalList = [];
    output = '';
    const formData = {
      apiKey: 'eb0efa8a715f3b6c7e99c866dff664bd',
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: `${citySelect.value}`,
        Limit: '150',
        Page: '1',
      },
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = 'https://api.novaposhta.ua/v2.0/json/';
    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        for (let i = 0; i < res.data[0].Addresses.length; i++) {
          if (citySelect.value == res.data[0].Addresses[i].Present) {
            delivery = res.data[0].Addresses[i].DeliveryCity;
            console.log(delivery);
            return false;
          } else {
            cityFinalList.push(res.data[0].Addresses[i].Present);
          }
        }
        console.log(cityFinalList),
          cityFinalList.forEach((elem) => {
            output += `<option value="${elem}">${elem}</option>`;
          });

        cityList.innerHTML = output;

        const postSelect = document.querySelector('.postselect');
        const postList = document.querySelector('.post_list');

        postSelect.addEventListener('input', () => {
          let timerw;
          let delayw = 400;
          clearTimeout(timerw);
          timerw = setTimeout(() => {
            // ЗАПИТ
            const formData = {
              apiKey: 'eb0efa8a715f3b6c7e99c866dff664bd',
              modelName: 'Address',
              calledMethod: 'getWarehouses',
              methodProperties: {
                CityRef: `${delivery}`,
                Limit: '2000',
                Page: '1',
              },
            };
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            };
            let warehouses = [];
            let outputw = '';
            const url = 'https://api.novaposhta.ua/v2.0/json/';
            fetch(url, options)
              .then((response) => response.json())
              .then((res) => {
                console.log(res);
                for (j = 0; j < res.data.length; j++) {
                  if (res.data[j].Description.replace(/"/g, '') == postSelect.value) {
                    warehouses = [];
                    break;
                  } else {
                    warehouses.push(res.data[j].Description.replace(/"/g, ''));
                  }
                }
                warehouses.forEach((item) => {
                  outputw += `<option value="${item}">${item}</option>`;
                });
                postList.innerHTML = outputw;
              });
            // ЗАПИТ
          }, delayw);
        });
      });
  }, delay);
});
const warehouseMarker = document.querySelector('#warehouse');
const courierMarker = document.querySelector('#courier');
const adressField = document.querySelector('#address');
const warehouseswrapper = document.querySelector('#warehouseswrapper');
if (warehouseMarker.checked) {
  adressField.classList.add('cart_item_display_none');
  warehouseswrapper.classList.remove('cart_item_display_none');
} else if (courierMarker.checked) {
  adressField.classList.remove('cart_item_display_none');
  warehouseswrapper.classList.add('cart_item_display_none');
}
function renderFormContent() {
  const warehouseMarker = document.querySelector('#warehouse');
  const courierMarker = document.querySelector('#courier');
  const adressField = document.querySelector('#address');
  const warehouseswrapper = document.querySelector('#warehouseswrapper');
  if (warehouseMarker.checked) {
    adressField.classList.remove('cart_item_display_none');
    warehouseswrapper.classList.add('cart_item_display_none');
  } else if (courierMarker.checked) {
    adressField.classList.add('cart_item_display_none');
    warehouseswrapper.classList.remove('cart_item_display_none');
  }
}
// const formData = {
//   apiKey: 'eb0efa8a715f3b6c7e99c866dff664bd',
//   modelName: 'Address',
//   calledMethod: 'searchSettlements',
//   methodProperties: {
//     CityName: `Львів`,
//     Limit: '150',
//     Page: '1',
//   },
// };
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(formData),
// };
// const url = 'https://api.novaposhta.ua/v2.0/json/';
// fetch(url, options)
//   .then((response) => response.json())
//   .then((res) => {
//     console.log(res);
//     res.data[0].Addresses.forEach((item) => {
//       if (item.Present == citySelect.value) {
//         console.log(item.DeliveryCity);
//       }
//     });
//   });
