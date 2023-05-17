function heightUpdate() {
  var obstructionList = $("#obsUL").html();
  if (obstructionList == "") {
    elevationchartptp();
    // present in map.js
  } else {
    ObsChartWithHt();
    // present in obstruction.js
  }
}
