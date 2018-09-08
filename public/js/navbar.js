// Adapted from jQuery, from https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

var navContainer = document.getElementById("nav-container");
var oldWidth = getWidth();
var newWidth = getWidth();

// Remove container on page load if under 992px.
if (newWidth < 992) {
  navContainer.classList.remove("container");
  navContainer.classList.add("container-fluid");
}

window.addEventListener("resize", function() {
  newWidth = getWidth();
  if ((newWidth < 992 && oldWidth < 992) || (newWidth >= 992 && oldWidth >= 992)) {
    // Pass
  } else {
    // Else we passed the breakpoint
    if (newWidth - oldWidth < 0) {
      // If we have resized to over 992 pixels
      navContainer.classList.remove("container");
      navContainer.classList.add("container-fluid");
    } else {
      // Else we have resized to under 992 pixels
      navContainer.classList.remove("container-fluid");
      navContainer.classList.add("container");
    }
  }
  oldWidth = getWidth();
});
