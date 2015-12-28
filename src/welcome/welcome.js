$(document).ready(function() {

  $('#signup').validate({
    rules: {
      username: {
        required: true
      },
      email: {
        required: true
      },
      password: {
        required: true
      },
      passwordConfirmation: {
        required: true
      },
      over18: {
        required: true
      },
    },
  });

  $('#over18').on('click', checkForm);

  function checkForm() {
    $("#submit").prop("disabled", !($('#signup').valid()));
  }

});
