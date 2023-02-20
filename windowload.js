document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector(".loader-wrapper").style.visibility = "visible";
    document.querySelector("body").style.visibility = "hidden";
  } else {
    document.querySelector(".loader-wrapper").style.visibility = "hidden";
    document.querySelector("body").style.visibility = "visible";
  }
};
