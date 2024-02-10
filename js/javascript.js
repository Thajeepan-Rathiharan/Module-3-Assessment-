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