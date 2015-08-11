$(document).ready(function() {

  $('#over-18').change(function() {
    $('#submit').prop("disabled", !this.checked);
  }).change()

});
