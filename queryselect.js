var clsBtn = document.querySelector("#closeSearch");
clsBtn.addEventListener("click", function () {
  document.querySelector("#search").style.display = "none";
});

var searchBtn = document.querySelector("#search-Click");
searchBtn.addEventListener("click", function () {
  document.querySelector("#search").style.display = "block";
});

var hamburgerMenu = document.querySelector(".togglemenus");
hamburgerMenu.addEventListener("click", function () {
  document.querySelector(".menuoutbox").classList.toggle("slide");
  document.querySelector(".mobile-patch").classList.toggle("show");
});

document.querySelector(".mobile-patch").addEventListener("click", function () {
  document.querySelector(".menuoutbox").classList.remove("slide");
  document.querySelector(".mobile-patch").classList.remove("show");
});

// To open the dropdown containing options of ptp ptmp
document.querySelector("#p2pp2mp").addEventListener("click", function () {
  document.querySelector(".pull-right").classList.toggle("open");
});
//  To go back to the selection menu of p2p p2mp
document.querySelector("#cancelp2p").addEventListener("click", function () {
  document.querySelector("#selectionPage").style.display = "block";
  document.querySelector("#ptpPage").style.display = "none";
  document.querySelector("#resetForm").reset();
  var reset = document.querySelectorAll(".resetTable");
  for (var i in reset) {
    reset[i].innerHTML = "";
  }
  initMap();
  clearOverlays();
  document.querySelector("#chart").innerHTML = "";
});

// To open the ptp calculator
document.querySelector(".ptp").addEventListener("click", function () {
  document.querySelector("#resetLink").style.visibility = "hidden";
  document.getElementById("selectionPage").style.display = "none";
  document.getElementById("ptpPage").style.display = "block";
  document.querySelector("#ctryCode").selectedIndex = 0;
  document.querySelector(".pull-right").classList.remove("open");
  map.addListener("click", function (e) {
    if (markersarr.length < 2) {
      addMarker(e.latLng);
    }
    addAddress();
  });
});

// PTMP calculator open
document.querySelector(".ptmp").addEventListener("click", function () {});

// For reset button to reset the fields for another link planning iwthiun the same country.
document.getElementById("resetLink").addEventListener("click", function () {
  document.querySelector("#resetForm").reset();
  clearOverlays();
  if (polyline != null) {
    polyline.setMap(null);
  }
  // Clearing the calculation table and hiding the elevation
  var reset = document.querySelectorAll(".resetTable");
  for (var i in reset) {
    reset[i].innerHTML = "";
  }

  //  Calling EIRP function to get the EIRP value lost during resetting the form.
  calceirp();

  // document.querySelector(".elevation-chart").style.display = "none";
  document.getElementById("chart").innerHTML = "";
});

// Event Listener on the antenna gain at A input to read the change of value.

document.getElementById("antgain1").addEventListener("change", function () {
  var antgain1 = document.getElementById("antgain1").value;
  var eirp = parseInt(document.getElementById("eirpMax").value);
  if (antgain1 > 0) {
    if (antgain1 < eirp) {
      var r1 = document.getElementById("radio1");
      r1.options[r1.selectedIndex].value = antgain1;
      // console.log(document.getElementById("radio1").value);
      document.querySelector(".gain1Alert").style.display = "none";
      calcTxPower();
    } else {
      antgain1 = 0;
      document.querySelector(".gain1Alert").style.display = "block";
    }
  } else {
    document.querySelector(".gain1Alert").style.display = "block";
  }
});

// Event Listener on the antenna gain at A input to read the change of value.

document.getElementById("antgain2").addEventListener("change", function () {
  var antgain2 = document.getElementById("antgain2").value;
  var eirp = parseInt(document.getElementById("eirpMax").value);
  if (antgain2 > 0) {
    if (antgain2 < eirp) {
      var r2 = document.getElementById("radio2");
      r2.options[r2.selectedIndex].value = antgain2;
      document.querySelector(".gain2Alert").style.display = "none";
      calcTxPower();
    } else {
      antgain2 = 0;
      document.querySelector(".gain2Alert").style.display = "block";
    }
  } else {
    document.querySelector(".gain2Alert").style.display = "block";
  }

  // calculateRSL();
});

// Report Button
document.querySelector("#reportbtn").addEventListener("click", function () {
  document.querySelector("#reportLinkName").value =
    document.querySelector("#linkName").value;

  document.querySelector(".header").style.display = "none";
});
// Report close button
document.getElementById("close-btn").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".header").style.display = "block";
});
