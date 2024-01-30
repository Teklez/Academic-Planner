// Prevent navigating back and forward
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, null, window.location.href);
};
