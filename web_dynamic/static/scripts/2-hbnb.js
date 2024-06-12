// Script execute only when DOM is loaded
$(document).ready(function () {
  const maxLength = 30;
  const amenityIdDict = {};

  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      amenityIdDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityIdDict[$(this).data('id')];
    }
  
    const amenityNames = Object.values(amenityIdDict).join(', ');
    const truncatedText =
      amenityNames.length > maxLength
        ? amenityNames.substring(0, maxLength) + '...'
        : amenityNames;
    $('.amenities').find('h4').text(truncatedText);
  });
  
  function checkApiStatus () {
    $.get('http://localhost:5001/api/v1/status/')
      .done(function (response) {
        if (response.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      })
      .fail(function () {
        $('#api_status').removeClass('available');
      });
  }
  
  checkApiStatus();
});
  