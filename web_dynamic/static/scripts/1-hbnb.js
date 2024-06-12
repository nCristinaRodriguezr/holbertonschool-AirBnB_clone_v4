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
});
  