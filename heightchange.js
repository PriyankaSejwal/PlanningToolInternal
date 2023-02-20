function heightUpdate() {
  var obstructionList = $("#obsUL").html();
  if (obstructionList == "") {
    elevationchart();
    // present in map.js
  } else {
    ObsChartWithHt();
    // present in obstruction.js
  }
}
