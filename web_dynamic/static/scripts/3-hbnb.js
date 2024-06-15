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

  function checkApiStatus() {
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

  function loadPlaces() {
      $.ajax({
          url: 'http://localhost:5001/api/v1/places_search/',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({}),
          success: function (data) {
              const placesSection = $('section.places');
              placesSection.empty();
              data.forEach(function (place) {
                  const article = $('<article></article>');
                  const titleBox = $('<div class="title_box"></div>');
                  const title = $('<h2></h2>').text(place.name);
                  const priceByNight = $('<div class="price_by_night"></div>').text(`$${place.price_by_night}`);
                  titleBox.append(title).append(priceByNight);
                  
                  const info = $('<div class="information"></div>');
                  const maxGuest = $('<div class="max_guest"></div>').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
                  const numberRooms = $('<div class="number_rooms"></div>').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`);
                  const numberBathrooms = $('<div class="number_bathrooms"></div>').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);
                  info.append(maxGuest).append(numberRooms).append(numberBathrooms);

                  const description = $('<div class="description"></div>').html(place.description);

                  article.append(titleBox).append(info).append(description);
                  placesSection.append(article);
              });
          }
      });
  }

  checkApiStatus();
  loadPlaces();
});
