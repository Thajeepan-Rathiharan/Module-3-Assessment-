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