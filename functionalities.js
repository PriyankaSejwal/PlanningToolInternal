//  Window onload channel frequency populate
// window.addEventListener("load", function () {
//   var cf = document.querySelector("#channelFrequency");
//   cf.innerHTML = "";
//   var optarr = [5160, 5240, 5260, 5340, 5480, 5715, 5735, 5865];
//   createFreq(cf, optarr);
// });

// Channel bandwidth, frequency and eirp based on the country
var eirp1;
var eirp2;
var eirp3;
var eirp4;
var ccode;
function ctryChange() {
  // form for sidebar display block
  document.querySelector("#resetLink").style.visibility = "visible";
  document.querySelector(".sidebar-form").style.display = "block";
  var ctry = document.getElementById("ctryCode");
  selectedctry = ctry.options[ctry.selectedIndex].innerHTML;
  ccode = document.getElementById("ctryCode").value;
  var bw = document.getElementById("channelBandwidth");
  var cf = document.getElementById("channelFrequency");
  cf.innerHTML = "";

  var country_dict = {
    af: "34.555300, 69.207500, 36, 36, 36, 36",
    ai: "18.227230, -63.048988, 36, 36, 36, 36",
    ax: "60.178500, 19.915600, 36, 36, 36, 36",
    al: "41.327953, 19.819025, 36, 36, 36, 36",
    ad: "42.506317, 1.521835, 36, 36, 36, 36",
    at: "48.2082, 16.3738, 36, 36, 36, 36",
    au: "-35.2802, 149.131, 36, 36, 36, 36",
    be: " 51.260197, 4.402771, 36, 36, 36, 36",
    bi: "3.361260, 29.347916, 36, 36, 36, 36",
    br: "-15.793889, -47.882778, 26, 36, 36, 36",
    bt: "27.514200, 90.433600, 36, 36, 36, 36",
    bw: "-24.653257, 25.906792, 36, 36, 36, 36",
    ca: "45.424721, -75.695, 36, 36, 36, 36",
    ch: "46.204391, 6.143158, 36, 36, 36, 36",
    cn: "39.916668, 116.383331, 36, 36, 36, 36",
    cy: "35.185566, 33.382275, 36, 36, 36, 36",
    cz: "50.073658, 14.41854, 36, 36, 36, 36",
    cm: "3.848000, 11.502100, 36, 36, 36, 36",
    kh: "12.565700, 104.991000, 36, 36, 36, 36",
    td: "15.454200, 18.732200, 36, 36, 36, 36",
    de: "52.520008, 13.404954, 36, 36, 36, 36",
    dk: "55.676098, 12.568337, 36, 36, 36, 36",
    ee: "59.436962, 24.753574, 36, 36, 36, 36",
    es: "40.416775, -3.703790, 36, 36, 36, 36 ",
    et: "9.145000, 40.489700, 36, 36, 36, 36",
    fi: "60.192059, 24.945831, 36, 36, 36, 36",
    fk: "-51.591577, -58.741753, 36, 36, 36, 36",
    fo: "61.505070, -6.769180, 36, 36, 36, 36",
    fr: "48.864716, 2.349014, 36, 36, 36, 36",
    gb: "51.509865, -0.118092, 36, 36, 36, 36",
    ga: "0.390100, 9.454400, 36, 36, 36, 36",
    ge: "32.352722, -82.615333, 36, 36, 36, 36",
    gi: "36.140800, -5.353600, 36, 36, 36, 36",
    gl: "69.635416, -42.173691, 36, 36, 36, 36",
    gp: "16.270000, -61.520000, 36, 36, 36, 36",
    gg: "49.448196, -2.589490, 36, 36, 36, 36",
    hk: "22.370157, 114.123489, 36, 36, 36, 36",
    hu: "47.497913, 19.040236, 36, 36, 36, 36",
    ie: "53.350140, -6.266155, 36, 36, 36, 36",
    il: "31.771959, 35.217018, 36, 36, 36, 36",
    in: "28.7041, 77.1025, 53, 30, 30, 53",
    iq: "33.312805, 44.361488, 36, 36, 36, 36",
    is: "64.128288, -21.827774, 36, 36, 36, 36",
    it: " 41.902782, 12.496366, 36, 36, 36, 36",
    jp: "35.652832, 139.839478, 36, 36, 36, 36",
    je: "49.214439, -2.131250, 36, 36, 36, 36",
    kr: "37.532600, 127.024612, 36, 36, 36, 36",
    kw: "29.378586, 47.990341, 36, 36, 36, 36",
    li: "54.687157, 25.279652, 36, 36, 36, 36",
    lu: "49.611622, 6.131935, 36, 36, 36, 36",
    lv: "56.946285, 24.105078, 36, 36, 36, 36",
    yt: "-12.809645, 45.130741, 36, 36, 36, 36",
    md: "47.003670, 28.907089, 36, 36, 36, 36",
    me: "42.442574, 19.268646, 36, 36, 36, 36",
    ms: "16.741286, -62.200330, 36, 36, 36, 36",
    ng: "9.076479, 7.398574, 30, 30, 30, 36",
    nl: "52.370216, 4.895168, 36, 36, 36, 36",
    no: "59.911491, 10.757933, 36, 36, 36, 36",
    an: "12.170884, -68.256387, 36, 36, 36, 36",
    nc: "-21.703201, 166.067075, 36, 36, 36, 36",
    nz: "-36.848461, 174.763336, 36, 36, 36, 36",
    ph: "14.599512, 120.984222, 36, 36, 36, 36",
    pl: "52.237049, 21.017532, 36, 36, 36, 36",
    pt: "38.736946, -9.142685, 36, 36, 36, 36",
    se: "59.334591, 18.063240, 36, 36, 36, 36",
    sg: "1.290270, 103.851959, 36, 36, 36, 36",
    sh: "-15.965528, -5.711485, 36, 36, 36, 36",
    si: "46.056946, 14.505751, 36, 36, 36, 36",
    sk: "48.148598, 17.107748, 36, 36, 36, 36",
    sm: "43.942878, 12.460093, 36, 36, 36, 36",
    ws: "-13.655308, -172.460985, 36, 36, 36, 36",
    sa: "24.774265, 46.738586, 36, 36, 36, 36",
    rs: "44.787197, 20.457273, 36, 36, 36, 36",
    sn: "14.497400, -14.452400, 36, 36, 36, 36",
    sx: "18.075277, -63.060001, 36, 36, 36, 36",
    sr: "5.839398, -55.199089, 36, 36, 36, 36",
    tw: "25.105497, 121.597366, 36, 36, 36, 36",
    tg: "8.619500, 0.824800, 36, 36, 36, 36",
    tn: "36.806389, 10.181667, 36, 36, 36, 36",
    us: "38.9072, -77.0369, 30, 30, 30, 36",
    ae: "25.260303, 55.302921, 36, 36, 36, 36",
    ug: "50.450001, 30.523333, 36, 36, 36, 36",
    uz: "41.311081, 69.240562, 36, 36, 36, 36",
    mx: "19.432608, -99.133209, 36, 36, 36, 36",
    mq: "14.6415, -61.0242, 36, 36, 36, 36",
    mc: "43.7384, 7.4246, 36, 36, 36, 36",
    ma: "31.7917, -7.0926, 36, 36, 36, 36",
    ke: "-0.0236, 37.9062, 36, 36, 36, 36",
    jo: "31.963158, 35.930359, 36, 36, 36, 36",
    tz: "-6.776012, 34.178326, 36, 36, 36, 36",
    sy: "34.510414, 38.278336, 36, 36, 36, 36",
    pk: "30.3753, 69.3451, 36, 36, 36, 36",
    hn: "15.2000, -86.2419, 36, 36, 36, 36",
    mo: "22.1987, 113.5439, 36, 36, 36, 36",
    jm: "18.1096, -77.2975, 36, 36, 36, 36",
    ir: "34.42790, 53.6880, 36, 36, 36, 36",
    cu: "21.5218, -77.7812, 36, 36, 36, 36",
    bd: "23.6850, 90.3563, 36, 36, 36, 36",
    my: "4.2105, 101.9758, 36, 36, 36, 36",
    mv: "1.9028,73.2407, 36, 36, 36, 36",
    ht: "18.9712, -72.2852, 36, 36, 36, 36",
    cl: "-35.6751, -71.5430, 36, 36, 36, 36",
    bs: "25.0343, -77.3963, 36, 36, 36, 36",
    bh: "26.0667, 50.5577, 36, 36, 36, 36",
    bb: "13.1939, -59.5432, 36, 36, 36, 36",
    aw: "12.5211, -69.9683, 36, 36, 36, 36",
    ba: "43.9159, 18.6791, 36, 36, 36, 36",
    bg: "42.7339, 25.4858, 36, 36, 36, 36",
    bm: "32.3078, -64.7505, 36, 36, 36, 36",
    by: "53.7098, 27.9534, 36, 36, 36, 36",
    gf: "3.9339, -53.1258, 36, 36, 36, 36",
    gr: "39.0742, 21.8243, 36, 36, 36, 36",
    hr: "45.1000,15.2000, 36, 36, 36, 36",
    lt: "47.1410, 9.5209, 36, 36, 36, 36",
    mk: "41.6086, 21.7453, 36, 36, 36, 36",
    mr: "21.0079, -10.9408, 36, 36, 36, 36",
    mu: "-20.3484, 57.5522, 36, 36, 36, 36",
    om: "21.4735, 55.9754, 36, 36, 36, 36",
    za: "-30.5595, 22.9375, 36, 36, 36, 36",
    zm: "-13.1339, 27.8493, 36, 36, 36, 36",
    as: "-14.2710, -170.702042, 36, 36, 36, 36",
    az: "40.1431, 47.5769, 36, 36, 36, 36",
    co: "4.5709, -74.2973, 36, 36, 36, 36",
    cr: "9.7489, -83.7534, 36, 36, 36, 36",
    dm: "15.4150, -61.3710, 36, 36, 36, 36",
    do: "18.7357, -70.1627, 36, 36, 36, 36",
    ec: "-1.8312, -78.1834, 36, 36, 36, 36",
    lb: "33.8547, 35.8623, 36, 36, 36, 36",
    lk: "7.8731, 80.7718, 36, 36, 36, 36",
    mw: "-13.2543, 34.3015, 36, 36, 36, 36",
    ni: "12.8654, -85.2072, 36, 36, 36, 36",
    pe: "-9.1900, -75.0152, 36, 36, 36, 36",
    pr: "18.2208, -66.5901, 36, 36, 36, 36",
    uy: "-32.5228, -55.7658, 36, 36, 36, 36",
    ls: "-29.61000,28.2336, 36, 36, 36, 36",
    mt: "35.883824, 14.449113, 36, 36, 36, 36",
    tr: "38.669728, 35.562528, 36, 36, 36, 36",
    ro: "44.439663, 26.096303, 36, 36, 36, 36",
    re: "-20.878901, 55.448101, 36, 36, 36, 36",
    rw: "-2.429626, 29.882967, 36, 36, 36, 36",
    pa: "8.983333, -79.516670, 36, 36, 36, 36",
    ve: "10.50000, -66.916664, 36, 36, 36, 36",
    vn: "10.762622, 106.660172, 36, 36, 36, 36",
    va: "41.903879, 12.452083, 36, 36, 36, 36",
    ye: "15.552700, 48.516400, 36, 36, 36, 36",
    zw: "-17.824858, 31.053028, 36, 36, 36, 36",
    eg: "30.033333, 31.233334, 36, 36, 36, 36",
    atg: "17.060800, -61.796400, 36, 36, 36, 36",
    bol: "-19.02743, -65.23575, 36, 36, 36, 36",
    brn: "4.535300, 114.727700, 36, 36, 36, 36",
    bfa: "12.238300, -1.561600, 36, 36, 36, 36",
    cym: "19.313300, -81.254600, 36, 36, 36, 36",
    caf: "6.611100, 20.939400, 36, 36, 36, 36",
    slv: "13.794200, -88.896500, 36, 36, 36, 36",
    gha: "7.946500, -1.023200. 36, 36, 36, 36",
    grd: "12.116500, -61.679000, 36, 36, 36, 36",
    mhl: "7.054026, 171.228533, 36, 36, 36, 36",
    fsm: "6.887481, 158.215072, 36, 36, 36, 36",
    mng: "46.865108, 103.834784, 36, 36, 36, 36",
    plw: "7.34329, 134.480473, 36, 36, 36, 36",
    png: "-4.878879, 144.465474, 36, 36, 36, 36",
    pry: "-23.4380203, -58.4483065, 36, 36, 36, 36",
    uga: "1.370730, 32.303241, 36, 36, 36, 36",
    vut: "-15.449279, 167.595411, 36, 36, 36",
    cxr: "-10.479913, 105.636208, 36, 36, 36, 36",
    cok: "-21.23397, -159.77740, 36, 36, 36, 36",
    arg: "-39.379095, -67.404308, 36, 36, 36, 36",
    niu: "-19.041433, -169.848197, 36, 36, 36, 36",
    nfk: "-29.035295, 167.958574, 36, 36, 36, 36",
    tha: "15.722797, 101.248397, 36, 36, 36, 36",
    tto: "10.519040, -61.259015, 36, 36, 36, 36",
    tca: "21.765856, -71.768948, 36, 36, 36, 36",
    civ: "7.776445, -5.315987, 36, 36, 36, 36",
    spm: "47.037696, -56.312937, 36, 36, 36, 36",
    pyf: "-17.617203, -149.439397, 36, 36, 36, 36",
    atf: "-49.30763, 69.26353, 36, 36, 36, 36",
    imn: "54.216609, -4.528268, 36, 36, 36, 36",
    qat: "25.330913, 51.402376, 36, 36, 36, 36",
    npl: "27.71442, 85.31480, 36, 36, 36, 36",
    wlf: "-14.284364, -178.133370, 36, 36, 36, 36",
    cod: "-6.118660, 23.592697, 36, 36, 36, 36",
    lby: "29.159230, 16.142724, 36, 36, 36, 36",
    gum: "13.463861, 144.788829, 36, 36, 36 ,36",
    vgb: "18.435061, -64.612291, 36, 36, 36, 36",
    mnp: "15.208415, 145.734406, 36, 36, 36, 36",
    blz: "17.249485, -88.769931, 36, 36, 36, 36",
    arm: "40.227185, 44.503665, 36, 36, 36, 36",
    dji: "11.570029, 43.131281, 36, 36, 36, 36",
    kaz: "43.255363, 76.877534, 36, 36, 36, 36",
    kgz: "42.858935, 74.584096, 36, 36, 36, 36",
    kir: "1.976137, -157.386147, 36, 36, 36, 36",
    mdg: "-18.903702, 47.562924, 36, 36, 36, 36",
    mmr: "19.713322, 96.126327, 36, 36, 36, 36",
    ner: "13.532551, 2.136163, 36, 36, 36, 36",
    nru: "-0.528114, 166.922615, 36, 36, 36, 36",
    sdn: "15.594409, 32.557061, 36, 36, 36, 36",
    nd: "28.7041, 77.1025, 100, 100, 100, 100",
  };
  for (var [key, value] of Object.entries(country_dict)) {
    if (key == ccode) {
      var latt = parseFloat(value.split(",")[0]);
      var long = parseFloat(value.split(",")[1]);
      map.setCenter({ lat: latt, lng: long });
      map.setZoom(12);
      // country = key;
      eirp1 = parseFloat(value.split(",")[2]);
      eirp2 = parseFloat(value.split(",")[3]);
      eirp3 = parseFloat(value.split(",")[4]);
      eirp4 = parseFloat(value.split(",")[5]);
    }
  }

  // Resetting the previous;y entered information if any link was planned.
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

  // document.querySelector(".elevation-chart").style.display = "none";
  document.getElementById("chart").innerHTML = "";

  // Entering the Country details in the Installation Report
  document.getElementById("reportCountryA").innerHTML = document.getElementById(
    "reportCountryB"
  ).innerHTML = selectedctry;

  // IF CTRY IS NO COUNTRY
  if (ccode == "nd") {
    map.setZoom(5);
    document.getElementById("eirplevel").style.display = "none";
  } else {
    document.getElementById("eirplevel").style.display = "block";
  }

  // function to generate the frequency list
  populatefreq();
  // call function to know the max eirp value
  calceirp();
}

// function to create new options in for the frequency dropdown
function createFreq(cf, optarr) {
  // cf.value = optarr[0];
  var array = [];
  for (i = 0; i < optarr.length; i += 2) {
    for (j = optarr[i]; j <= optarr[i + 1]; j += 5) {
      array.push(j);
    }
  }
  for (opt in array) {
    var newoption = document.createElement("option");
    newoption.innerHTML = array[opt];
    newoption.value = array[opt];
    cf.options.add(newoption);
  }
}

// Size of both the address fields in report pop up same
window.addEventListener("resize", function () {
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
});

// Function to display the antenna gain column when ion4le is selected as the radio
//  gets called when radio is changed
function selectedRadioA() {
  var r1 = document.getElementById("radio1");
  var gain1 = document.getElementById("antgain1");
  var loss1 = document.getElementById("cableLoss1");
  document.getElementById("antgain1").value = r1.value;
  var radioA = r1.options[r1.selectedIndex];
  var option_group = radioA.parentNode;
  var gain1alert = document.querySelector(".gain1Alert");
  var empty = document.querySelectorAll(".empty");
  console.log(radioA.innerHTML);
  // When external antenna sleected then removing and adding certain functionalities.
  if (option_group.label == "External Antenna") {
    extRadio(gain1, loss1, gain1alert, empty);
  } else {
    otherRadio(gain1, loss1, gain1alert);
    calcTxPower();
  }
}

// Function to display the antenna gain column when ion4le is selected as the radio
//  gets called when radio is changed
function selectedRadioB() {
  var r2 = document.getElementById("radio2");
  var gain2 = document.getElementById("antgain2");
  var loss2 = document.getElementById("cableLoss2");
  document.getElementById("antgain2").value = r2.value;
  var radioB = r2.options[r2.selectedIndex];
  var option_group = radioB.parentNode;
  console.log(option_group.label);
  var gain2alert = document.querySelector(".gain2Alert");
  var empty = document.querySelectorAll(".empty");
  // When ext antenna selected adding certain functionalities.
  if (option_group.label == "External Antenna") {
    extRadio(gain2, loss2, gain2alert, empty);
  } else {
    otherRadio(gain2, loss2, gain2alert);
    calcTxPower();
  }
}

function extRadio(gain, loss, gainAlert, empty) {
  gain.value = " ";
  gain.disabled = false;
  gain.classList.add("extAnt");
  loss.disabled = false;
  loss.classList.add("extAnt");

  if (ccode == "nd") {
    gainAlert.style.display = "none";
  } else {
    gainAlert.style.display = "block";
  }
  for (i in empty) {
    console.log(empty[i].innerHTML);
    empty[i].innerHTML = "";
  }
}
function otherRadio(gain, loss, gainAlert) {
  gain.disabled = true;
  gain.classList.remove("extAnt");
  loss.disabled = true;
  loss.classList.remove("extAnt");
  gainAlert.style.display = "none";
}

// function to convert the co-ordinates from degree to radian for calculations

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// function to convert radian to degree
// Converts from radians to degrees.
function rad2deg(rad) {
  return (rad * 180) / Math.PI;
}

//LINK DISTANCE AND AZIMUTH ANGLE
// function to calculate link distance, azimuth angle
function hopazimuth() {
  console.log("hopazimuth called");
  var arr = document.getElementsByClassName("towerinput");
  var latlongarr = [];
  Array.from(arr).forEach(function (e) {
    latlongarr.push(e.value.split(","));
  });
  var latA = latlongarr[0][0];
  var latB = latlongarr[1][0];
  var longA = latlongarr[0][1];
  var longB = latlongarr[1][1];
  var R = 6371; //Radius of the earth in km
  var deglat = deg2rad(latB - latA);
  var deglong = deg2rad(longB - longA);
  var deglat1 = deg2rad(latA);
  var deglat2 = deg2rad(latB);
  var deglong1 = deg2rad(longA);
  var deglong2 = deg2rad(longB);

  // Calculating hop distance/ link distance
  var a =
    Math.sin(deglat / 2) * Math.sin(deglat / 2) +
    Math.sin(deglong / 2) *
      Math.sin(deglong / 2) *
      Math.cos(deglat1) *
      Math.cos(deglat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = Math.round(R * c * 100) / 100; // Distance in km

  // Calculating azimuth angle
  var y = Math.sin(deglong2 - deglong1) * Math.cos(deglat2);
  var x =
    Math.cos(deglat1) * Math.sin(deglat2) -
    Math.sin(deglat1) * Math.cos(deglat2) * Math.cos(deglong2 - deglong1);
  var brng = Math.atan2(y, x);
  brng = rad2deg(brng);
  var anglea = Math.round((brng + 360) % 360);
  var angleb = Math.round((anglea - 180 + 360) % 360);
  // Populating the calculated values
  document.getElementById("linkDistance").innerHTML = distance;
  console.log(distance);
  document.getElementById("reportlinkdistance").innerHTML = distance;
  document.getElementById("reportHeadingA").innerHTML = anglea + " deg";
  document.getElementById("reportHeadingB").innerHTML = angleb + " deg";

  // fresneleirp();
}

// Function to populate the options into the channel frequency select query.
function populatefreq() {
  ctry = document.getElementById("ctryCode").value;
  var groupFCC3 = ["as", "az", "lk", "pr", "gum", "vgb", "mnp"];
  var groupAus = ["bh", "ca", "hk", "mv", "my", "nz", "vn"];
  var groupFCC1 = ["bb", "dm", "ve", "uy", "cn", "npl"];
  var groupETSI1 = [
    "af",
    "aw",
    "ai",
    "by",
    "bt",
    "kh",
    "cm",
    "td",
    "et",
    "ge",
    "gi",
    "gl",
    "gp",
    "iq",
    "kw",
    "ls",
    "mk",
    "mw",
    "mr",
    "nc",
    "om",
    "ws",
    "sn",
    "sr",
    "tg",
    "ye",
    "zw",
    "wlf",
    "kaz",
  ];
  var groupFCC17 = [
    "au",
    "bm",
    "bs",
    "co",
    "cl",
    "cr",
    "do",
    "ec",
    "ht",
    "hn",
    "lb",
    "ni",
    "mo",
    "pe",
    "tw",
    "bd",
    "br",
    "cu",
    "ir",
    "jm",
    "pa",
    "pk",
    "sg",
    "sy",
    "tz",
    "atg",
    "bol",
    "brn",
    "bfa",
    "cym",
    "caf",
    "slv",
    "gha",
    "grd",
    "mhl",
    "fsm",
    "mng",
    "plw",
    "png",
    "pry",
    "uga",
    "vut",
    "cxr",
    "cok",
    "arg",
    "niu",
    "nfk",
    "tha",
    "tto",
    "tca",
    "civ",
    "cod",
    "lby",
  ];
  var groupETSI13 = [
    "an",
    "ax",
    "al",
    "ad",
    "at",
    "be",
    "ba",
    "bw",
    "bg",
    "bi",
    "hr",
    "cy",
    "cz",
    "dk",
    "eg",
    "ee",
    "fk",
    "fo",
    "fi",
    "fr",
    "gf",
    "ga",
    "de",
    "gr",
    "gg",
    "va",
    "hu",
    "is",
    "ie",
    "il",
    "it",
    "je",
    "jo",
    "jp",
    "ke",
    "lv",
    "li",
    "lt",
    "lu",
    "mt",
    "mq",
    "mx",
    "yt",
    "md",
    "mc",
    "me",
    "ms",
    "ma",
    "mu",
    "nl",
    "no",
    "pl",
    "pt",
    "re",
    "ro",
    "rw",
    "sh",
    "sa",
    "rs",
    "sm",
    "sx",
    "sk",
    "si",
    "za",
    "es",
    "se",
    "ch",
    "tn",
    "tr",
    "ae",
    "uz",
    "zm",
    "ph",
    "ug",
    "blz",
    "spm",
    "pyf",
    "atf",
    "imn",
    "qat",
  ];
  var groupND = [
    "nd",
    "arm",
    "dji",
    "kgz",
    "kir",
    "mdg",
    "mmr",
    "ner",
    "nru",
    "sdn",
  ];
  var groupKorea = ["kr"];
  var s1 = document.getElementById("channelBandwidth");
  console.log("bandwidth value", s1.value);
  var s2 = document.getElementById("channelFrequency");
  s2.innerHTML = "";
  if (ctry == "in" || ctry == "gb") {
    if (s1.value == 10) {
      var arr = [5155, 5245, 5255, 5345, 5475, 5720, 5730, 5870];
    } else if (s1.value == 20) {
      var arr = [5160, 5240, 5260, 5340, 5480, 5715, 5735, 5865];
    } else if (s1.value == 40) {
      var arr = [5170, 5230, 5270, 5330, 5490, 5705, 5745, 5855];
    } else if (s1.value == 80) {
      var arr = [5190, 5210, 5290, 5310, 5510, 5685, 5765, 5835];
    } else if (s1.value == 160) {
      var arr = [5550, 5645];
    }
  } else if (ctry == "us") {
    document.getElementById("10mhz").disabled = true;
    if (s1.value == 20) {
      var arr = [5160, 5240, 5735, 5865];
    } else if (s1.value == 40) {
      var arr = [5170, 5230, 5745, 5855];
    } else if (s1.value == 80) {
      var arr = [5190, 5210, 5765, 5835];
    }
  } else if (ctry == "ng") {
    if (s1.value == 10) {
      var arr = [5255, 5345, 5635, 5655, 5730, 5845];
    } else if (s1.value == 20) {
      var arr = [5260, 5340, 5735, 5840];
    } else if (s1.value == 40) {
      var arr = [5270, 5330, 5745, 5830];
    } else if (s1.value == 80) {
      var arr = [5290, 5310, 5765, 5810];
    }
  } else if (groupAus.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5740, 5810];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5745, 5805];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5755, 5795];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5775, 5775];
    }
  } else if (groupFCC1.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5740, 5830];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5745, 5825];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5755, 5815];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5775, 5795];
    }
  } else if (groupFCC17.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5495, 5725, 5740, 5830];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5500, 5720, 5745, 5825];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5510, 5710, 5755, 5795];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5530, 5690, 5775, 5775];
    }
  } else if (groupFCC3.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5495, 5725, 5740, 5890];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5500, 5720, 5745, 5885];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5510, 5710, 5755, 5875];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5530, 5690, 5775, 5855];
    }
  } else if (groupKorea.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5495, 5625, 5740, 5810];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5500, 5620, 5745, 5805];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5510, 5610, 5755, 5795];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5530, 5590, 5775, 5775];
    }
  } else if (groupETSI1.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5495, 5705];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5500, 5700];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5510, 5670];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5530, 5610];
    }
  } else if (groupETSI13.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5175, 5325, 5495, 5705, 5740, 5870];
    } else if (s1.value == 20) {
      var arr = [5180, 5320, 5500, 5700, 5745, 5865];
    } else if (s1.value == 40) {
      var arr = [5190, 5310, 5510, 5670, 5755, 5835];
    } else if (s1.value == 80) {
      var arr = [5210, 5290, 5530, 5610, 5775, 5775];
    }
  } else if (groupND.includes(ctry)) {
    if (s1.value == 10) {
      var arr = [5155, 5825];
    } else if (s1.value == 20) {
      var arr = [5160, 5815];
    } else if (s1.value == 40) {
      var arr = [5170, 5805];
    } else if (s1.value == 80) {
      var arr = [5190, 5785];
    }
  }
  console.log(arr, arr.length);
  // function which generates freq list
  createFreq(s2, arr);
  calcFresnel();
  calceirp();
  // calcTxPower();
}

function calcFresnel() {
  var f = document.getElementById("channelFrequency");
  var cf = parseFloat(f.options[f.selectedIndex].innerHTML);

  // Calculating fresnel zone radius
  var distance = parseFloat(document.getElementById("linkDistance").innerHTML);
  var fres = (17.32 * Math.sqrt(distance / ((4 * cf) / 1000))).toFixed(2);
  // var fres = (fres * 60) / 100;

  // Populating value of fresnel radius
  document.getElementById("fresnelRadius").innerHTML = fres;
  document.getElementById("reportfresradius").innerHTML = fres;
}

// EIRP VALUE
var maxtx;
var eirp;

// Function to calculate the eirp using the eirp reference table

function calceirp() {
  var ctry = document.getElementById("ctryCode").value;
  var bndwdth = parseFloat(document.getElementById("channelBandwidth").value);
  var f = document.getElementById("channelFrequency");
  // var cf = parseFloat(f.options[f.selectedIndex].innerHTML);
  var cf = document.getElementById("channelFrequency").value;
  console.log(cf);
  document.getElementById("reportbandwidth").innerHTML = bndwdth;
  document.getElementById("reportfrequency").innerHTML = cf;

  // Radio Options to hide for eirp 23

  var optgrp = document.getElementsByClassName("optGroup");
  var ext1 = document.getElementById("extA");
  var ext2 = document.getElementById("extB");

  // gain, loss, gain alert and empty

  gain1 = document.getElementById("antgain1");
  gain2 = document.getElementById("antgain2");

  loss1 = document.getElementById("cableLoss1");
  loss2 = document.getElementById("cableLoss2");

  gainalert1 = document.querySelector(".gain1Alert");
  gainalert2 = document.querySelector(".gain2Alert");

  empty = document.querySelectorAll(".empty");

  // variable storing the max supported tx power on the basis of our products
  var maxsupportedtx = 27;

  // EIRP based on freq w/o referring eirp table
  if (ctry == "in") {
    if (cf <= 5250 || cf >= 5725) {
      eirp = 53;
      maxtx = 30;
    } else if (cf > 5250 && cf < 5725) {
      eirp = 30;
      maxtx = 24;
    }
  } else if (ctry == "gb") {
    if (cf <= 5350) {
      eirp = 23;
      maxtx = 32;
    } else if (cf <= 5725) {
      eirp = 30;
      maxtx = 32;
    } else if (cf > 5725) {
      if (bndwdth == 10) {
        eirp = 33;
        maxtx = 27;
      } else {
        eirp = 36;
        maxtx = 30;
      }
    }
  } else if (ctry == "us") {
    if (cf <= 5250) {
      eirp = 30;
      maxtx = 24;
    } else if (cf >= 5725) {
      eirp = 36;
      maxtx = 30;
    }
  } else if (ctry == "ng") {
    if (cf < 5395) {
      eirp = 30;
      maxtx = 23;
    } else if (cf <= 5960) {
      eirp = 36;
      maxtx = 30;
    }
  } else {
    maxtx = 27;
    if (cf <= 5250) {
      eirp = eirp1;
    } else if (cf > 5250 && cf < 5400) {
      eirp = eirp2;
    } else if (cf >= 5470 && cf <= 5725) {
      eirp = eirp3;
    } else if (cf > 5725) {
      eirp = eirp4;
    }
  }

  // Max eirp 23
  if (eirp <= 23) {
    // ion4le selected for both radio fields
    ext1.selected = true;
    ext2.selected = true;
    // Rest other radio options hidden
    for (i = 0; i < optgrp.length; i++) {
      optgrp[i].hidden = true;
    }
    // function to make changes to gain and loss fields as per ext radio
    extRadio(gain1, loss1, gainalert1, empty);
    extRadio(gain2, loss2, gainalert2, empty);
  } else {
    // function to apply changes to ant gain field and cable loss field
    otherRadio(gain1, loss1, gainalert1);
    otherRadio(gain2, loss2, gainalert2);
    //   document.getElementById("defaultRadioA").selected = true;
    //   document.getElementById("defaultRadioB").selected = true;
    //   gain1.value = 25;
    //   gain2.value = 25;
    for (i = 0; i < optgrp.length; i++) {
      optgrp[i].hidden = false;
    }
  }
  // compares if the frequency based tx power is lower than the supported tx value of our radio.
  if (maxsupportedtx < maxtx) {
    maxtx = maxsupportedtx;
  }
  document.getElementById("eirpMax").value = eirp;
  // document.getElementById("maxEIRP").value = eirp;
  // document.getElementById("maxtransmitPower1").value = maxtx;
  // document.getElementById("maxtransmitPower2").value = maxtx;

  // function which calculates Max tx power based on eirp and antenna gain
  // deviceinfo();
  calcTxPower();
}

// function to calculate the max transmit power based on eirp and antenna gain
function calcTxPower() {
  console.log("function called");
  var eirp = parseInt(document.getElementById("eirpMax").value);
  var antgainA = parseInt(document.getElementById("antgain1").value);
  var antgainB = parseInt(document.getElementById("antgain2").value);
  var cablelossA = parseInt(document.getElementById("cableLoss1").value);
  var cablelossB = parseInt(document.getElementById("cableLoss2").value);
  // var maxtxa = parseInt(document.getElementById("maxtransmitPower1").value);
  // var maxtxb = parseInt(document.getElementById("maxtransmitPower2").value);

  // Calculated tx power for A B sites
  var txa = eirp - antgainA + cablelossA;
  var txb = eirp - antgainB + cablelossB;

  if (txa < 3) {
    document.querySelector(".tx1Alert").style.display = "block";
  } else {
    document.querySelector(".tx1Alert").style.display = "none";
    // tx power for calculation
    if (maxtx < txa) {
      txa = maxtx;
    }
    document.getElementById("transmitPower1").value = txa;
    document.querySelector("#transmitPower1").max = txa;
  }

  if (txb < 3) {
    document.querySelector(".tx2Alert").style.display = "block";
  } else {
    document.querySelector(".tx2Alert").style.display = "none";
    if (maxtx < txb) {
      txb = maxtx;
    }
    document.getElementById("transmitPower2").value = txb;
    document.querySelector("#transmitPower2").max = txb;
    deviceinfo();
  }
}

// function to check the factor depending on the link distance
// function disfactor() {
//   var distance = parseFloat(document.getElementById("linkDistance").innerHTML);
//   if (distance <= 2) {
//     var distfac = 4;
//   } else if (distance <= 3) {
//     var distfac = 5;
//   } else if (distance <= 5) {
//     var distfac = 6;
//   } else if (distance <= 8) {
//     var distfac = 7;
//   } else {
//     var distfac = 8;
//   }
//   return parseFloat(distfac);
// }

// Qeury Selector for when user changes the tx power, checking whether tx falls in 3-27.

for (let i = 1; i <= 2; i++) {
  document
    .querySelector(`#transmitPower${i}`)
    .addEventListener("change", function () {
      var txpower = this.value;
      if (txpower < 3 || txpower > 27) {
        document.querySelector(`.tx${i}Alert2`).style.display = "block";
      } else {
        document.querySelector(`.tx${i}Alert2`).style.display = "none";
        deviceinfo();
      }
    });
}

// A function to calculate RSL based on the radio selected by the user

function deviceinfo() {
  var dist = parseFloat(document.getElementById("linkDistance").innerHTML);
  if (document.getElementById("linkDistance").innerHTML != "") {
    var bandwidth = parseFloat(
      document.getElementById("channelBandwidth").value
    );
    var f = document.getElementById("channelFrequency");
    var freq = parseFloat(f.options[f.selectedIndex].innerHTML);
    var loss1 = parseInt(document.getElementById("cableLoss1").value);
    var loss2 = parseInt(document.getElementById("cableLoss2").value);
    var eirp = parseInt(document.getElementById("eirpMax").value);
    var radio1 = parseInt(document.getElementById("radio1").value);
    var radio2 = parseInt(document.getElementById("radio2").value);
    var tx1 = parseInt(document.getElementById("transmitPower1").value);
    var tx2 = parseInt(document.getElementById("transmitPower2").value);
    var rsl1;
    var rsl2;

    if (bandwidth == 10) {
      var additional_loss = 0;
    } else if (bandwidth == 20) {
      var additional_loss = 0;
    } else if (bandwidth == 40) {
      var additional_loss = 2;
    } else if (bandwidth == 80) {
      var additional_loss = 3;
    }
    rsl1 =
      Math.round(
        (tx2 +
          radio1 +
          radio2 -
          loss1 -
          loss2 -
          additional_loss -
          (20 * Math.log10(dist) + 20 * Math.log10(freq / 1000) + 92.45)) *
          100
      ) / 100;

    rsl2 =
      Math.round(
        (tx1 +
          radio1 +
          radio2 -
          loss1 -
          loss2 -
          additional_loss -
          (20 * Math.log10(dist) + 20 * Math.log10(freq / 1000) + 92.45)) *
          100
      ) / 100;

    // RSL populated at main page and report
    document.getElementById("rsl1").innerHTML = rsl1;
    document.getElementById("rsl2").innerHTML = rsl2;
    // Report RSL
    document.getElementById("reportrsl1").innerHTML = rsl1;
    document.getElementById("reportrsl2").innerHTML = rsl2;

    // Cable loss populated at report
    document.getElementById("reportlossA").innerHTML = loss1;
    document.getElementById("reportlossB").innerHTML = loss2;

    // Antenna gain and transmit power populated at report
    document.getElementById("txA").innerHTML = tx1;
    document.getElementById("txB").innerHTML = tx2;
    document.getElementById("antGainA").innerHTML = radio1;
    document.getElementById("antGainB").innerHTML = radio2;
    selectTable();
  }
}

function calculateRSL() {
  if (document.getElementById("linkDistance").innerHTML != "") {
    var radio1 = parseInt(document.getElementById("radio1").value);
    var radio2 = parseInt(document.getElementById("radio2").value);
    // remove after checking
    // var radio1 = parseFloat(document.getElementById("antGain1").value);
    // var radio2 = parseFloat(document.getElementById("antGain2").value);

    var dist = parseFloat(document.getElementById("linkDistance").innerHTML);
    var bandwidth = parseFloat(
      document.getElementById("channelBandwidth").value
    );
    var f = document.getElementById("channelFrequency");
    var freq = parseFloat(f.options[f.selectedIndex].innerHTML);
    var loss1 = parseInt(document.getElementById("cableLoss1").value);
    var loss2 = parseInt(document.getElementById("cableLoss2").value);
    var eirp = parseInt(document.getElementById("eirpMax").value);
    var tx1 = parseInt(document.getElementById("transmitPower1").value);
    var tx2 = parseInt(document.getElementById("transmitPower2").value);
    var rsl1;
    var rsl2;

    if (bandwidth == 10) {
      var additional_loss = 0;
    } else if (bandwidth == 20) {
      var additional_loss = 0;
    } else if (bandwidth == 40) {
      var additional_loss = 2;
    } else {
      var additional_loss = 3;
    }
    rsl1 =
      Math.round(
        (tx2 +
          radio1 +
          radio2 -
          loss1 -
          loss2 -
          additional_loss -
          (20 * Math.log10(dist) + 20 * Math.log10(freq / 1000) + 92.45)) *
          100
      ) / 100;

    rsl2 =
      Math.round(
        (tx1 +
          radio1 +
          radio2 -
          loss1 -
          loss2 -
          additional_loss -
          (20 * Math.log10(dist) + 20 * Math.log10(freq / 1000) + 92.45)) *
          100
      ) / 100;

    // RSL populated at main page and report
    document.getElementById("rsl1").innerHTML = rsl1;
    document.getElementById("rsl2").innerHTML = rsl2;
    // Report RSL
    document.getElementById("reportrsl1").innerHTML = rsl1;
    document.getElementById("reportrsl2").innerHTML = rsl2;

    // Cable loss populated at report
    document.getElementById("reportlossA").innerHTML = loss1;
    document.getElementById("reportlossB").innerHTML = loss2;

    // Antenna gain and transmit power populated at report
    document.getElementById("txA").innerHTML = tx1;
    document.getElementById("txB").innerHTML = tx2;
    document.getElementById("antGainA").innerHTML = radio1;
    document.getElementById("antGainB").innerHTML = radio2;
    selectTable();
  }
}

// A function to calculate the link throughtput based on the bandwidth selected by the user

function selectTable() {
  var r1 = document.getElementById("radio1");
  var radioName1 = r1.options[r1.selectedIndex].innerHTML;
  r2 = document.getElementById("radio2");
  var radioName2 = r2.options[r2.selectedIndex].innerHTML;
  var rsl1 = parseFloat(document.getElementById("rsl1").innerHTML);
  var rsl2 = parseFloat(document.getElementById("rsl2").innerHTML);

  var val = document.getElementById("channelBandwidth").value;
  var refertable;

  if (val == 10) {
    refertable = document.getElementById("throughput10MHz");
    var snr_1 = Math.round((rsl1 + 89) * 100) / 100;
    var snr_2 = Math.round((rsl2 + 89) * 100) / 100;
  } else if (val == 20) {
    refertable = document.getElementById("throughput20MHz");
    var snr_1 = Math.round((rsl1 + 89) * 100) / 100;
    var snr_2 = Math.round((rsl2 + 89) * 100) / 100;
  } else if (val == 40) {
    refertable = document.getElementById("throughput40MHz");
    var snr_1 = Math.round((rsl1 + 86) * 100) / 100;
    var snr_2 = Math.round((rsl2 + 86) * 100) / 100;
  } else if (val == 80) {
    refertable = document.getElementById("throughput80MHz");
    var snr_1 = Math.round((rsl1 + 83) * 100) / 100;
    var snr_2 = Math.round((rsl2 + 83) * 100) / 100;
  } else if (val == 160) {
    refertable = document.getElementById("throughput160MHz");
    var snr_1 = Math.round((rsl1 + 90) * 100) / 100;
    var snr_2 = Math.round((rsl2 + 90) * 100) / 100;
  }
  // Fade Margin Calculation
  var fademargin1 =
    Math.round((rsl1 - refertable.rows[1].cells.item(0).innerHTML) * 100) / 100;
  var fademargin2 =
    Math.round((rsl2 - refertable.rows[1].cells.item(0).innerHTML) * 100) / 100;

  document.getElementById("snr1").innerHTML = snr_1;
  document.getElementById("snr2").innerHTML = snr_2;
  // Populating the values in the Report
  document.getElementById("reportsnr1").innerHTML = snr_1;
  document.getElementById("reportsnr2").innerHTML = snr_2;
  document.getElementById("fadeMargin1").innerHTML = fademargin1;
  document.getElementById("fadeMargin2").innerHTML = fademargin2;
  document.getElementById("reportRadioA").innerHTML = radioName1;
  document.getElementById("reportRadioB").innerHTML = radioName2;

  var rowlength = refertable.rows.length;
  for (i = 1; i <= rowlength; i++) {
    var min = refertable.rows[i].cells.item(0).innerHTML;
    var max = refertable.rows[i].cells.item(1).innerHTML;
    if (rsl1 >= min && rsl1 <= max) {
      document.getElementById("mcs1").innerHTML =
        refertable.rows[i].cells.item(2).innerHTML + " ";
      document.getElementById("modulation1").innerHTML =
        refertable.rows[i].cells.item(3).innerHTML;
      refertable.rows[i].cells.item(3).innerHTML;
      document.getElementById("fec1").innerHTML =
        "FEC " + refertable.rows[i].cells.item(4).innerHTML;
      // form.fecA.value = refertable.rows[i].cells.item(4).innerHTML;
      // form.fecB.value = refertable.rows[i].cells.item(4).innerHTML;
      document.getElementById("linkRate1").innerHTML =
        refertable.rows[i].cells.item(5).innerHTML + " ";
      document.getElementById("throughput").innerHTML =
        refertable.rows[i].cells.item(6).innerHTML;
      if (radioName1.includes("CPE") || radioName2.includes("CPE")) {
        if (document.querySelector("#throughput").innerHTML > 300) {
          console.log("more than 300");
          document.querySelector("#throughput").innerHTML = 300;
        }
      }
      document.getElementById("reportthroughput").innerHTML =
        document.querySelector("#throughput").innerHTML;
      break;
    } else if (rsl1 < min) {
      break;
    } else {
      continue;
    }
  }
  for (i = 1; i <= rowlength; i++) {
    var min = refertable.rows[i].cells.item(0).innerHTML;
    var max = refertable.rows[i].cells.item(1).innerHTML;
    if (rsl2 >= min && rsl2 <= max) {
      document.getElementById("mcs2").innerHTML =
        refertable.rows[i].cells.item(2).innerHTML + " ";
      document.getElementById("modulation2").innerHTML =
        refertable.rows[i].cells.item(3).innerHTML;
      refertable.rows[i].cells.item(3).innerHTML;
      document.getElementById("fec2").innerHTML =
        "FEC " + refertable.rows[i].cells.item(4).innerHTML;
      // form.fecA.value = refertable.rows[i].cells.item(4).innerHTML;
      // form.fecB.value = refertable.rows[i].cells.item(4).innerHTML;
      document.getElementById("linkRate2").innerHTML =
        refertable.rows[i].cells.item(5).innerHTML + " ";
      document.getElementById("throughput").innerHTML =
        refertable.rows[i].cells.item(6).innerHTML;
      if (radioName1.includes("CPE") || radioName2.includes("CPE")) {
        if (document.querySelector("#throughput").innerHTML > 300) {
          console.log("more than 300");
          document.querySelector("#throughput").innerHTML = 300;
        }
      }
      document.getElementById("reportthroughput").innerHTML =
        document.querySelector("#throughput").innerHTML;
      break;
    } else if (rsl2 < min) {
      break;
    } else {
      continue;
    }
  }
  availability();
}

// Function to calculate LINK AVAILABILITY
function availability() {
  var anthta = parseFloat(document.getElementById("aheight1").value);
  var anthtb = parseFloat(document.getElementById("aheight2").value);
  var min_antht = Math.min(anthta, anthtb);
  var linkdist = parseFloat(document.getElementById("linkDistance").innerHTML);
  var path_inclination = Math.abs((anthta - anthtb) / linkdist);
  var f = document.getElementById("channelFrequency");
  var freq = parseFloat(f.options[f.selectedIndex].innerHTML);
  var flat_fade_margin1 = parseFloat(
    document.getElementById("fadeMargin1").innerHTML
  );
  var flat_fade_margin2 = parseFloat(
    document.getElementById("fadeMargin2").innerHTML
  );
  var flat_fade_margin = Math.min(flat_fade_margin1, flat_fade_margin2);
  // Availability as per Sir's Tool
  // var geoclimatic_factor = 0.00003647539;
  // var fading_occurance_factor =
  //   (geoclimatic_factor *
  //     linkdist ** 3.1 *
  //     (1 + path_inclination) ** -1.29 *
  //     (freq / 1000) ** 0.8 *
  //     10 ** (-0.00089 * min_antht - flat_fade_margin / 10)) /
  //   100;
  // var fade_depth = 25 + 1.2 * Math.log10(fading_occurance_factor);
  // var flat_fade_exceeded_in_WM = 1 - (1 - 2 * fading_occurance_factor);
  // var link_availability_due_to_multipath = (1 - flat_fade_exceeded_in_WM) * 100;

  // Availability as per ITU R P 530
  var terrain_fac = 4;
  var climate_fac = 0.5;
  var outageDueToFading =
    terrain_fac *
    climate_fac *
    6 *
    Math.pow(10, -7) *
    (freq / 1000) *
    Math.pow(linkdist, 3) *
    Math.pow(10, -(flat_fade_margin / 10));

  var linkAvailability = 100 * (1 - 2 * outageDueToFading);
  console.log("fading occurance factor", linkAvailability);
  // console.log("link Availability: ", link_availability_due_to_multipath);

  // To be deleted
  // console.log(path_inclination);
  // console.log(flat_fade_margin);
  // console.log(fading_occurance_factor);
  // console.log(fade_depth);
  // console.log(flat_fade_exceeded_in_WM);
  // console.log(link_availability_due_to_multipath);

  //  populating the link availability column with the value calculated
  document.getElementById("reportlinkAvailability").innerHTML =
    linkAvailability.toFixed(4) + " ";
  document.getElementById("linkAvailability").innerHTML =
    linkAvailability.toFixed(4);
}
