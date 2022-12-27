// Defining Global variables

var map;
var pos;
var marker;
var markersarr = [];
var reportMarkerArr = [];
var polyline = null;
var latlongarr = [];
var bounds;
var reportbounds;
var report;
var yelev;
var geocoder;

google.load("visualization", "1", { packages: ["corechart"] });

// Function which creates map
function initMap() {
  // Map options
  var options = {
    center: { lat: 9.087474, lng: 7.377978 },
    zoom: 15,
  };
  // New Map
  map = new google.maps.Map(document.getElementById("map3d"), options);

  // Map centered around the current location
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };

  // map.setCenter(pos);
  // });
  // }

  // Create an ElevationService.
  elevator = new google.maps.ElevationService();

  // Initializing Reverse Geocoding
  geocoder = new google.maps.Geocoder();
}

// Adding Markers on the map by clicking on the map
function addMarker(latLng) {
  document.getElementById("add0").value = "";
  document.getElementById("add1").value = "";
  marker = new google.maps.Marker({
    map: map,
    position: latLng,
    draggable: true,
    // icon can be added
  });
  // add listener to redraw the polyline when markers position change
  marker.addListener("dragend", function () {
    addAddress();
    // drawPolyline();
  });
  //extend the bounds to include each marker's position
  markersarr.push(marker);
  reportMarkerArr.push(marker);
}

// Adding Markers to the report map

function reportMarker() {
  document.querySelector(".popup").style.display = "block";
  polyarr = [];
  report = new google.maps.Map(document.getElementById("reportmap"), {
    center: { lat: 28.7041, lng: 77.1025 },
    zoom: 13,
  });
  reportbounds = new google.maps.LatLngBounds();
  markersarr.forEach(function (e) {
    pos = e.getPosition();
    polyarr.push(pos);
    marker = new google.maps.Marker({
      map: report,
      position: new google.maps.LatLng(pos.lat(), pos.lng()),
    });
    reportbounds.extend(marker.getPosition());
  });
  // adding polyline to the Map

  var reportpolyline = new google.maps.Polyline({
    map: report,
    path: polyarr,
    strokeOpacity: 0.4,
  });
  report.fitBounds(reportbounds);
  // function for screenshot called
  // takeshot();
  // document.querySelector("#reportmap").innerHTML =
  //   document.querySelector("#map3d").innerHTML;
  document.querySelector("#report_elevation_profile").innerHTML =
    document.querySelector("#chart").innerHTML;

  // Populating values in the Site A and Site B tables
  var nameA = document.getElementById("siteAName").value;
  var nameB = document.getElementById("siteBName").value;
  var adda = document.getElementById("add0").value;
  var addb = document.getElementById("add1").value;
  var hta = document.getElementById("aheight1").value;
  var htb = document.getElementById("aheight2").value;
  var coorda = document.getElementById("searchtowerA").value;
  var coordb = document.getElementById("searchtowerB").value;
  // Populating the details in the installation report.
  document.getElementById("reportSiteAName").innerHTML = nameA;
  document.getElementById("reportSiteBName").innerHTML = nameB;
  document.getElementById("reportAddressA").innerHTML = adda;
  document.getElementById("reportAddressB").innerHTML = addb;
  document.getElementById("reportCoordA").innerHTML = coorda + " ";
  document.getElementById("reportCoordB").innerHTML = coordb + " ";
  document.getElementById("reportHeightA").innerHTML = hta + " m";
  document.getElementById("reportHeightB").innerHTML = htb + " m";
  var htAddA = document.getElementById("reportAddressA").offsetHeight;
  var htAddB = document.getElementById("reportAddressB").offsetHeight;
  if (htAddA > htAddB) {
    var ht = (htAddA + 13.8).toString() + "px";
    console.log(typeof ht);
    document.getElementById("addHeightB").style.height = ht;
  } else {
    var ht = (htAddB + 13.8).toString() + "px";
    document.getElementById("addHeightA").style.height = ht;
  }
}

// to screenshot the div
function takeshot() {
  let photo = document.getElementById("map3d");
  // document.getElementById("reportmap").innerHTML = " ";
  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  html2canvas(photo, {
    useCORS: true,
    optimized: false,
    allowTaint: false,
    onrendered: function (canvas) {
      var dataURL = canvas.toDataURL("image/png");
      document.querySelector("#reportmap").attr("src", dataURL).show();
      document.querySelector("#reportmap").appendChild(canvas);
    },
  });
}

// Adding Markers on the map using the input values

function inputMarker() {
  clearOverlays();
  // markersarr = [];
  latlongarr = [];
  var site1 = document.getElementById("decimalA").value;
  var siteb = document.getElementById("decimalB").value;
  console.log("value of coord 1: ", site1);
  console.log("value of coord 2: ", siteb);
  if (site1 != "" && siteb != "") {
    var arr = document.getElementsByClassName("towerinput");
    if (arr.length == 2) {
      Array.from(arr).forEach(function (e) {
        latlongarr.push(e.value.split(","));
      });
      bounds = new google.maps.LatLngBounds();
      for (i = 0; i < latlongarr.length; i++) {
        marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(latlongarr[i][0], latlongarr[i][1]),
          draggable: true,
        });
        map.setZoom(12);
        bounds.extend(marker.getPosition());
        markersarr.push(marker);
        reportMarkerArr.push(marker);
        // Reading the values of lat long to feed to the validate function
        var inputlatA = parseFloat(site1.split(",")[0]);
        var inputlongA = parseFloat(site1.split(",")[1]);
        var inputlatB = parseFloat(siteb.split(",")[0]);
        var inputlongB = parseFloat(siteb.split(",")[1]);

        validateAdd(inputlatA, inputlongA, inputlatB, inputlongB);
        // drawPolyline();
        // add listener to redraw the polyline when markers position change
        marker.addListener("dragend", function () {
          addAddress();
          // drawPolyline();
        });
      }
      map.fitBounds(bounds);
    }
  }
}

// Second way with latA, latB, longA, longB
// function inputMarker() {
//   clearOverlays();
//   // markersarr = [];
//   latlongarr = [];
//   var site1 = document.getElementById("searchtowerA").value;
//   var siteb = document.getElementById("searchtowerB").value;
//   if (site1 != "" && siteb != "") {
//     bounds = new google.maps.LatLngBounds();
//     for (i = 0; i < 2; i++) {
//       marker = new google.maps.Marker({
//         map: map,
//         position: new google.maps.LatLng(
//           parseFloat(lat[i]),
//           parseFloat(long[i])
//         ),
//         draggable: true,
//       });
//       bounds.extend(marker.getPosition());
//       markersarr.push(marker);
//       reportMarkerArr.push(marker);
//       drawPolyline();
//       // add listener to redraw the polyline when markers position change
//       marker.addListener("dragend", function () {
//         addAddress();
//         // drawPolyline();
//       });
//     }
//     map.fitBounds(bounds);
//   }
// }

// function to clear the markers on the map
function clearOverlays() {
  for (var i = 0; i < markersarr.length; i++) {
    markersarr[i].setMap(null);
  }
  markersarr.length = 0;
}

// This function adds the address for the co-ordinates
function addAddress() {
  var ctry = document.getElementById("ctryCode");
  var selectedctry = ctry.options[ctry.selectedIndex].innerHTML;
  var coordinates1 = {
    lat: parseFloat(markersarr[0].getPosition().lat().toFixed(6)),
    lng: parseFloat(markersarr[0].getPosition().lng().toFixed(6)),
  };
  var coordinates2 = {
    lat: parseFloat(markersarr[1].getPosition().lat().toFixed(6)),
    lng: parseFloat(markersarr[1].getPosition().lng().toFixed(6)),
  };

  // Populating the position of the markers in the input fields
  // Populating the input fields with the latitude longitude of the Marker.
  document.getElementById("searchtowerA").value =
    markersarr[0].getPosition().lat().toFixed(6) +
    "," +
    markersarr[0].getPosition().lng().toFixed(6);
  document.getElementById("searchtowerB").value =
    markersarr[1].getPosition().lat().toFixed(6) +
    "," +
    markersarr[1].getPosition().lng().toFixed(6);
  // value in the decimal hidden fields
  document.getElementById("decimalA").value =
    markersarr[0].getPosition().lat().toFixed(6) +
    "," +
    markersarr[0].getPosition().lng().toFixed(6);
  document.getElementById("decimalB").value =
    markersarr[1].getPosition().lat().toFixed(6) +
    "," +
    markersarr[1].getPosition().lng().toFixed(6);

  // Adding address to address 1
  geocoder.geocode({ location: coordinates1 }).then((response) => {
    if (response.results[0]) {
      if (ctry.value == "nd") {
        document.getElementById("add0").value =
          response.results[0].formatted_address;
      } else {
        if (response.results[0].formatted_address.includes(",")) {
          // To check for the country name
          if (response.results[0].formatted_address.includes(selectedctry)) {
            // Populating address to the address field A
            document.getElementById("add0").value =
              response.results[0].formatted_address;
          } else {
            alert(
              "The entered co-ordinate doesnot belong to the selected country."
            );
            clearOverlays();
            document.getElementById("searchtowerA").value = "";
          }
        } else {
          alert("Please try entering the address of the location.");
        }
      }
    }
  });

  // Adding address to address 2
  geocoder.geocode({ location: coordinates2 }).then((response) => {
    if (response.results[0]) {
      if (ctry.value == "nd") {
        document.getElementById("add1").value =
          response.results[0].formatted_address;
        drawPolyline();
      } else {
        // To check for the country name
        if (response.results[0].formatted_address.includes(",")) {
          if (response.results[0].formatted_address.includes(selectedctry)) {
            // Populating address to the address field B
            document.getElementById("add1").value =
              response.results[0].formatted_address;
            drawPolyline();
          } else {
            alert(
              "The entered co-ordinate doesnot belong to the selected country."
            );
            clearOverlays();
            document.getElementById("searchtowerB").value = "";
          }
        } else {
          alert("Please try entering the address of the location.");
        }
      }
    }
  });
}

// Function to draw polyline on the map
function drawPolyline() {
  // polyline.setMap(null);
  let markersPositionArr = [];
  markersarr.forEach(function (e) {
    markersPositionArr.push(e.getPosition());
  });

  // checking if polyline is not null
  if (polyline != null) {
    polyline.setMap(null);
  }

  // adding polyline to the Map
  polyline = new google.maps.Polyline({
    map: map,
    path: markersPositionArr,
    strokeOpacity: 0.8,
  });
  document.getElementById("reportbtn").disabled = false;
  document.getElementById("reportbtn").style.cursor = "pointer";

  if (markersPositionArr.length == 2) {
    hopazimuth();
    calcFresnel();
    calcTxPower();
    // calceirp();

    elevator
      .getElevationAlongPath({
        path: markersPositionArr,
        samples: 100,
      })
      .then(plotElevation)
      .catch((e) => {
        const chartDiv = document.getElementsByClassName("elevation-chart");
        // Show the error code inside the chartDiv.
        chartDiv.innerHTML =
          "Cannot show elevation: request failed because " + e;
      });
  }
  console.log("elevation called at 371");
}

function plotElevation({ results }) {
  yelev = [];
  for (i = 0; i < results.length; i++) {
    yelev.push(results[i].elevation);
  }
  elevationchart();
}

function elevationchart() {
  var dist = parseFloat(document.getElementById("linkDistance").innerHTML);
  var rad = parseFloat(document.getElementById("fresnelRadius").innerHTML); // minor axis radius fresnel radius
  var ht1 = parseFloat(document.getElementById("aheight1").value);
  var ht2 = parseFloat(document.getElementById("aheight2").value);
  rad = (rad * 60) / 100;
  // Populating report elevation for Site A and Site B
  document.getElementById("reportElevationA").innerHTML = yelev[0].toFixed(2);
  document.getElementById("reportElevationB").innerHTML = yelev[99].toFixed(2);

  // x-ticks array
  var tickarr = [];
  var tickSize = dist / 4;
  for (var i = 0; i <= dist; i += tickSize) {
    tickarr.push(i.toFixed(2));
  }

  //data array for the ellipse

  startX = 0;
  endX = dist * Math.pow(10, 3);
  startY = yelev[0] + ht1;
  endY = yelev[99] + ht2;
  // console.log(startY, endY);

  ellipsearray = [];

  // steps for the angle to make the ellipse
  var step = (2 * Math.PI) / 198;
  // Radius of the major axis
  var a =
    Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 0.5; // radius of major axis

  // angle of the rotation
  var w = Math.atan2(endY - startY, endX - startX);

  //for loop for 0 to 180 degree point of the ellipse
  for (i = 0; i <= Math.PI; i += step) {
    var xval = a * Math.cos(i);
    var yval = rad * Math.sin(i);
    var xnew = (startX + endX) / 2 + xval * Math.cos(w) - yval * Math.sin(w);
    var ynew = (startY + endY) / 2 + xval * Math.sin(w) + yval * Math.cos(w);
    ellipsearray.push([xnew / 1000, ynew]);
  }

  //for loop for 180 to 360 degree point of the ellipse
  ellipsearray2 = [];
  for (i = Math.PI; i <= 2 * Math.PI; i += step) {
    var xval = a * Math.cos(i);
    var yval = rad * Math.sin(i);
    var xnew = (startX + endX) / 2 + xval * Math.cos(w) - yval * Math.sin(w);
    var ynew = (startY + endY) / 2 + xval * Math.sin(w) + yval * Math.cos(w);
    ellipsearray2.push([xnew / 1000, ynew]);
  }

  // data array for the elevation
  arr = [];
  distarray = [];
  stepsize = (dist * Math.pow(10, 3)) / 99;
  for (i = 0; i < 100; i++) {
    distarray.push(ellipsearray2[i][0]);
  }

  //  Elevation data both x values and y values
  for (i = 0; i < 100; i++) {
    arr.push([distarray[i], yelev[i]]);
  }

  //  Checking for clear Line of Sight
  for (i = 0; i < yelev.length; i++) {
    if (ellipsearray2[i][1] > yelev[i]) {
      document.getElementById("los").innerHTML = "Yes";
      document.getElementById("reportlos").innerHTML = "Yes";
      document.getElementById("los").style.color = "Green";
      polyline.setOptions({ strokeColor: "Green" });
    } else {
      document.getElementById("los").innerHTML = "No";
      document.getElementById("reportlos").innerHTML = "No";
      document.getElementById("los").style.color = "Red";
      polyline.setOptions({ strokeColor: "Red" });
      break;
    }
  }

  //  Calculating the Antenna Tilt / Vertical Angle and populating them in the Link Installation Report
  vertical_angle = Math.atan((startY - endY) / dist);
  document.getElementById("reportTiltA").innerHTML =
    vertical_angle.toFixed(2) + " deg";
  document.getElementById("reportTiltB").innerHTML =
    -vertical_angle.toFixed(2) + " deg";

  // data 1 for the elevation
  var data = new google.visualization.DataTable();
  data.addColumn("number", "distance");
  data.addColumn("number", "line of sight");
  data.addRows(arr);

  // data 2 for half of the ellipse
  var data2 = new google.visualization.DataTable();
  data2.addColumn("number", "distance");
  data2.addColumn("number", "elevation");
  data2.addRows(ellipsearray);

  // data 3 for other half of the ellipse
  var data3 = new google.visualization.DataTable();
  data3.addColumn("number", "distance");
  data3.addColumn("number", "elevation");
  data3.addRows(ellipsearray2);

  // joined data for elevation and first half of ellipse
  var joinedData = google.visualization.data.join(
    data,
    data2,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  // joined data for above and second half of ellipse
  var joinedData2 = google.visualization.data.join(
    joinedData,
    data3,
    "full",
    [[0, 0]],
    [1, 2],
    [1]
  );

  // console.log(joinedData2);

  // chart options
  var options = {
    width: 400,
    height: 200,
    interpolateNulls: true,
    lineWidth: 1,
    colors: ["#037385", "#350964", "#350964"],
    hAxis: {
      title: "Distance (in Km) ",
      ticks: tickarr,
    },
    vAxis: {
      title: "Elevation (in m)",
    },
    legend: "none",
    seriesType: "line",
    series: { 0: { type: "area" } },
  };

  // Chart constructor for the main page of the website
  var chart = new google.visualization.ComboChart(
    document.getElementById("chart")
  );

  // drawing the Main chart
  chart.draw(joinedData2, options);

  // chart making visible, hids when cancel ptp pressed
  document.querySelector(".elevation-chart").style.display = "block";
}
