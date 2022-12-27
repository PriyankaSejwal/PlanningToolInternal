// Global Variable
var address;

function buttonActive() {
  var inputCoord1 = document.getElementById("searchtowerA").value;
  var inputCoord2 = document.getElementById("searchtowerB").value;
  var buttonActivate = document.getElementById("latLongBtn");
  if (inputCoord1 == "" || inputCoord2 == "") {
    buttonActivate.disabled = true;
  } else {
    buttonActivate.disabled = false;
  }
}

// function validatePopulate() {
//   // Reverse geocoding for co-ords to address A
//   var coordA = document.querySelector("#searchtowerA");
//   var coord1 = coordA.value.split(",");
//   lat1 = parseFloat(coord1[0]);
//   long1 = parseFloat(coord1[1]);
//   geocoder.geocode({ location: { lat: lat1, lng: long1 } }).then((response) => {
//     if (response.results[0]) {
//       add1.value = response.results[0].formatted_address;
//     }
//     if (country.value == "nd") {
//       inputMarker();
//     } else {
//       validateAdd(lat1, long1, add1);
//     }
//   });
//   // Reverse geocoding for co-ords to address B
//   var coordB = document.querySelector("#searchtowerB");
//   var coord2 = coordB.value.split(",");
//   lat2 = parseFloat(coord2[0]);
//   long2 = parseFloat(coord2[1]);
//   geocoder.geocode({ location: { lat: lat2, lng: long2 } }).then((response) => {
//     if (response.results[0]) {
//       add2.value = response.results[0].formatted_address;
//     }
//     if (country.value == "nd") {
//       inputMarker();
//     } else {
//       validateAdd(lat2, long2, add2);
//     }
//   });
// }

// Second function Validate populate
function validatePopulate() {
  var coordA = document.querySelector("#searchtowerA").value;
  var coordB = document.querySelector("#searchtowerB").value;
  // converting the coordinate into decimal format
  part1 = coordA.split(/[^\d\w\.\-\ ]+/);
  partvalidation(part1);
  document.querySelector("#decimalA").value = lat + ", " + long;

  // Geocoding the co-ordinates and adding address to Site A address field
  geocoder
    .geocode({ location: { lat: parseFloat(lat), lng: parseFloat(long) } })
    .then((response) => {
      if (response.results[0]) {
        add1.value = response.results[0].formatted_address;
        console.log(response.results[0]);
      }
    });

  part2 = coordB.split(/[^\d\w\.\-\ ]+/);
  partvalidation(part2);
  document.querySelector("#decimalB").value = lat + ", " + long;
  // Geocoding the co-ordinates and adding address to Site A address field
  geocoder
    .geocode({ location: { lat: parseFloat(lat), lng: parseFloat(long) } })
    .then((response) => {
      if (response.results[0]) {
        add2.value = response.results[0].formatted_address;
      }
    });
  inputMarker();
}

// validation function which validates the parts of the coordinate
function partvalidation(parts) {
  console.log(parts.length);
  if (parts.length == 8) {
    lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    long = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
  } else if (parts.length == 4) {
    lat = ConvertDDToDecimal(parts[0], parts[1]);
    long = ConvertDDToDecimal(parts[2], parts[3]);
  } else if (parts.length == 2) {
    lat = parts[0];
    long = parts[1];
  } else {
    window.alert("Please enter in DMS or Decimal format");
  }
}
// function to convert dms to decimal
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);
  console.log(dd);
  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}
// function to convet dd to decimal
function ConvertDDToDecimal(degrees, direction) {
  var dd = degrees;
  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

//   function for rever geocoding
function reverseGeocoding(lat, long) {
  geocoder.geocode({ location: { lat: lat, lng: long } }).then((response) => {
    if (response.results[0]) {
      var address = response.results[0].formatted_address;
    }
    return address;
  });
}

// FUNCTIONS
function validateAdd(lata, longa, latb, longb) {
  var countrycode = country.value;
  console.log(country.value, lata, longa);
  for (var [key, value] of Object.entries(countryArr)) {
    if (key == countrycode) {
      countrycode = key;
      latL = parseFloat(value.split(",")[0]);
      latU = parseFloat(value.split(",")[1]);
      longL = parseFloat(value.split(",")[2]);
      longU = parseFloat(value.split(",")[3]);
      console.log(latL, latU, longL, longU);
      validateLatLong(lata, longa, latb, longb);
      break;
    } else if (countrycode == "nd") {
      drawPolyline();
    }
  }
}

function validateLatLong(lata, longa, latb, longb) {
  console.log(lata, longa);
  if (lata >= latL && lata <= latU && longa >= longL && longa <= longU) {
    if (latb >= latL && latb <= latU && longb >= longL && longb <= longU) {
      drawPolyline();
      console.log(`Lat long belongs to ${selectedctry}`);
    } else {
      alert(`Lat long of Site 2 does not belong to ${selectedctry}`);
    }
  } else {
    alert(`Lat long of Site 1 does not belong to ${selectedctry}`);
  }
}

function validateAddress(add) {
  if (add.value.includes(selectedctry)) {
    drawPolyline();
  } else {
    alert(`Address does not belong to ${selectedctry}`);
  }
}
