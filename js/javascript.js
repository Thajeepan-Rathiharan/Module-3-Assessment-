// TO DO - make functions for: lightbox for images, images changing upon arrow buttons being clicked on, images rotating back to the first image, image number counter, burger menu on mobile devices, add image of product to cart with quantity counter, checkout button, text when product is added to cart, delete product icon, click on cart icon to open users cart and hide it by clicking on the cart icon again. // 

// Here is a variable to make the navigation menu on the mobile device have the ability to close and there will be slideshow thumbnails available on the desktop devices by an overlay. //
// Also buttons have been added to the pop up images with arrows that users can click on to go through the set of images. //
let thumbImagesDivs = Array.from(
    document.querySelectorAll(".product-images-wrapper .thumb-image")
  );
  let activeImage = document.querySelector(
    ".product-images-wrapper .preview-image"
  );
  let toggleMenu = document.querySelector(".header .toggle-menu");
  let mobileNavigation = document.querySelector(".header .mobile-navigation");
  let closeMobileNavigation = document.querySelector(
    ".header .mobile-navigation .close-menu"
  );
  let overlay = document.querySelector(".overlay");
  let nextBtn = document.querySelector(".preview-image-wrapper .arrows .next");
  let prevBtn = document.querySelector(".preview-image-wrapper .arrows .prev");
  let lightBoxWrapper = document.querySelector(".lightbox-wrapper");
  let lightBoxContent = lightBoxWrapper.querySelector(".lightbox-content");
  let currentIndex = 0;

// This function is what tells the browser what image to set as the thumbnail image next to the text above the 4 images on the preview set of images. //  
  function handleThumbsSrc() {
    thumbImagesDivs.forEach((thumb) => {
      // Get The Image
      let thumbImage = thumb.querySelector("img");
      // Set Original Image Source as Data Atrribute On The Thumb After Removing [-thumbnail] String.
      let setOriginalSrc = thumbImage
        .getAttribute("src")
        .replace("-thumbnail", "");
      // Set Original Image Source as Data Atrribute On The Thumb
      thumb.dataset.original = setOriginalSrc;
    });
  }
  handleThumbsSrc();
   
  // This function is to show the user the clicked thumbnail on the preview image wrapper. //
function showThumbsAsActive(thumbnails, previewActive) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        // Get Original Src Of the Thumb Image
        let getOriginalSrc = thumb.dataset.original;
        previewActive.setAttribute("src", getOriginalSrc);
        // Get The Index Of the Current Image
        currentIndex = thumbnails.indexOf(thumb);
        // Control Thumb styles
        removeClass(thumbnails, "active");
        thumb.classList.add("active");
      });
    });
  }
  showThumbsAsActive(thumbImagesDivs, activeImage);

  // This function is to set the active image. //
function showAsActive() {
    activeImage.src = thumbImagesDivs[currentIndex].dataset.original;
    // Control Thumb styles
    removeClass(thumbImagesDivs, "active");
    thumbImagesDivs[currentIndex].classList.add("active");
    imageNumber();
  }
  
  // This function is to show the next image(s). //
  function nextImage() {
    currentIndex++;
    if (currentIndex >= thumbImagesDivs.length) {
      currentIndex = 0;
    }
    showAsActive();
  }
  
  // This function is to show the previous image(s). //
  function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = thumbImagesDivs.length - 1;
    }
    showAsActive(activeImage);
  }

  // A function that counts what image the user is on out of the 4 images. //
function imageNumber() {
    let currentImage = document.querySelector(
      ".preview-image-wrapper .count .current"
    );
    let totalImage = document.querySelector(
      ".preview-image-wrapper .count .total"
    );
  
    currentImage.textContent = currentIndex + 1;
    totalImage.textContent = thumbImagesDivs.length;
  }
  imageNumber();

// Function for showing arrows on images. //  

// This function selects the image that shows the image when clicking on one of the 4 images below the previewed image. //
function cloneSlider() {
  lightBoxContent.innerHTML = "";
  let elementToClone = document.querySelector(".product-images-wrapper");
  let clonedElement = elementToClone.cloneNode(true);
  // Gets the preview image wrapper class here. //
  let previewImageWrapper = clonedElement.querySelector(
    ".preview-image-wrapper"
  );
  // Gets the arrows wrapper elements. //
  let arrowsWrapper = clonedElement.querySelector(".arrows");
  // Gets the thumbnails images wrapper elements. //
  let thumbsWrapper = clonedElement.querySelector(".thumbs-wrapper");

  // Remove ['.hide-for-desktop'] Class Of Arrows Div //
  arrowsWrapper.classList.remove("hide-for-desktop");

  // Remove ['.hide-for-mobile'] Class Of Thumbnails Images Div //
  thumbsWrapper.classList.remove("hide-for-mobile");

// Buttons for closing function. //

  // Adds a close button here. //
  previewImageWrapper.innerHTML += `
  <div class="close-lightbox">
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
      <title>close</title>
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#FFF"
        fill-rule="evenodd"
      />
    </svg>
  </div>
  `;

  // Declares the close button here. //
  let closeBtn = previewImageWrapper.querySelector(".close-lightbox");
  lightBoxContent.appendChild(clonedElement);

  // This function is to close the light box by making an [x] close icon. //
  closeBtn.addEventListener("click", closeLightBox);
  thumbImagesDivs = Array.from(
    document.querySelectorAll(".lightbox-content .thumb-image")
  );
  nextBtn = document.querySelector(".lightbox-content .arrows .next");
  prevBtn = document.querySelector(".lightbox-content .arrows .prev");
  activeImage = document.querySelector(".lightbox-content .preview-image");
  showThumbsAsActive(thumbImagesDivs, activeImage);
  nextBtn.addEventListener("click", () => {
    nextImage(activeImage);
  });
  prevBtn.addEventListener("click", () => {
    prevImage(activeImage);
  });
}

// The function here is to remove active classes. //
function removeClass(array, className) {
  array.forEach((element) => {
    element.classList.remove(className);
  });
}

// This function is to show the user an alert when the form is submitted when the user clicks the 'add to cart' button. //
function formAlert(message, status) {
  formValidation.textContent = message;
  formValidation.className = `form-alert ${status}`;
  addToCartForm.classList.add(`alert`);
  setTimeout(() => {
    addToCartForm.classList.remove("alert");
  }, 5000);
}

// Burger menu bar for mobile devices. //

// Function to open the mobile menu on mobile devices. //
function openMobileMenu() {
  mobileNavigation.classList.add("open");
}

// A function to close the mobile menu on mobile devices. //
function closeMobileMenu() {
  mobileNavigation.classList.remove("open");
}

// Function to open the overlay. //
function openOverlay() {
  overlay.classList.add("open");
}

// Function to close the overlay. //  
function closeOverlay() {
  overlay.classList.remove("open");
}

// This closes the overlay when the user clicks on the overlay layer. //
overlay.addEventListener("click", (e) => {
  if (e.currentTarget == e.target) closeOverlay(), closeMobileMenu();
});

// This event hides the lightBox on screens smaller than < 640px. //
window.addEventListener("resize", () => {
  if (window.innerWidth < 640) {
    closeLightBox();
  }
});

// The event here hides the 'MobileMenu' (burger menu) on screens bigger than > 1024px. //
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeMobileMenu();
  }
});

// Opens the lightBox when clicking on the active image for screens greater than >= (or equal to) 640px. //
activeImage.addEventListener("click", () => {
  if (window.innerWidth >= 640) {
    openLightBox();
    cloneSlider();
  } else {
    return false;
  }
});

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", prevImage);

toggleMenu.addEventListener("click", () => {
  openMobileMenu();
  openOverlay();
});

closeMobileNavigation.addEventListener("click", () => {
  closeMobileMenu();
  closeOverlay();
});


// Cart features //

// Variables for the cart features. //
let cart = document.querySelector(".cart");
let cartcontent = document.querySelector(".cart-content");
let cartList = document.querySelector(".cart-content .cart-list");
let inCart = document.querySelector(".cart .in-cart");

let addToCartForm = document.querySelector(".add-to-cart-form");
let formValidation = document.querySelector(".add-to-cart-form .form-alert");
let checkOutBtn = document.querySelector(".cart-list-wrapper .checkout-btn");
let productQuantity = document.querySelector(
  ".add-to-cart-form .product-quantity-num"
);
let plusBtn = document.querySelector(".add-to-cart-form .plus");
let minusBtn = document.querySelector(".add-to-cart-form .minus");

// Function to add items to the cart and shows the price of the item too. //
function addToCart() {
  addToCartForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let getProductQuantity = productQuantity.textContent;
    if (getProductQuantity != 0) {
      let productTitle = document.querySelector(
        ".product-details-wrapper .product-title"
      ).textContent;
      // First uses the thumbnail image as the product image once added in the cart. //
      let productThumb = thumbImagesDivs[0]
        .querySelector("img")
        .getAttribute("src");
      // productThumb = productThumb.querySelector("img").src; //
      let productPrice = document
        .querySelector(".product-details-wrapper .current-price")
        .textContent.replace("$", "");
      let totalPrice = "$" + parseInt(getProductQuantity * productPrice);
      if (cartList.childElementCount == 0) {
        checkOutBtn.style.display = "block";
        cartList.innerHTML = "";
      }
      cartList.innerHTML += `
      <div class="cart-item">
        <div class="item-image">
          <img
            src=${productThumb}
            alt="Product Image"
          />
        </div>
        <div class="item-info">
          <h4 class="item-title">
            ${productTitle}
          </h4>
          <p class="item-price-wrapper">
            <span class="item-price">${productPrice}</span>
            <span class="item-count">x ${getProductQuantity}</span>
            <span class="total-price">${totalPrice}</span>
          </p>
        </div>
        <div class="item-delete">
          <img
            src="img/icon-delete.svg"
            alt="Delete Product"
          />
        </div>
      </div>
      `; // The above HTML set up is a template literal. It's used to define the HTML structure within the JavaScript code, which takes place when the function is in play, which in this case is when an item is added to the cart and the template literal adds the image thumbnail and its price. //
      deleteFromCart();
      inCartCount();
      formAlert(`Product has been added to your cart successfully`, "success");
    } else {
      formAlert(`Can't add negative value`, "fail");
    }
  });
}
addToCart();

// This funcion enables the cart products to be counted quantity wise. //
function inCartCount() {
  let productsCount = cartList.childElementCount;
  inCart.textContent = productsCount;
  if (productsCount == 0) {
    cart.classList.remove("show-count");
    cart.classList.add("empty");
    checkOutBtn.style.display = "none";
    cartList.textContent = "Your cart is empty";
  } else {
    cart.classList.add("show-count");
    cart.classList.remove("empty");
  }
}
inCartCount();

// The function here is to enable the user to delete products in their cart. //
function deleteFromCart() {
  cartcontent.querySelectorAll(".cart-item").forEach((product) => {
    product.addEventListener("click", (e) => {
      if (!e.target.closest(".item-delete")) return;
      product.remove();
      inCartCount();
    });
  });
}

cart.addEventListener("click", (e) => {
  let cartIcon = e.target.closest(".cart-icon");
  cartIcon ? cart.classList.toggle("open") : "";
});

// This event handles how many items will be added via the plus [+] and minus [-] buttons. //
plusBtn.addEventListener("click", () => {
  productQuantity.textContent++;
});

minusBtn.addEventListener("click", () => {
  if (productQuantity.textContent != 0) productQuantity.textContent--;
});