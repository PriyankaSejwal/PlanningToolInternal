function checkCountry(result) {
  var ctry = document.getElementById("ctryCode");
  var selectedctry = ctry.options[ctry.selectedIndex].innerHTML;
  var address = result.formatted_address;
  var value = address.split(",");
  var count = value.length;
  var country = value[count - 1];
  return country, selectedctry;
}
