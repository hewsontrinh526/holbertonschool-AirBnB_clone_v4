$(document).ready(function () {
  const checkedDict = {};

  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).prop('checked')) {
      const id = $(this).attr('data-id');
      const name = $(this).attr('data-name');
      checkedDict[id] = name;
    } else {
      const key = $(this).attr('data-id');
      delete checkedDict[key];
    }

    const amenList = [];
    $.each(checkedDict, function (key, val) {
      amenList.push(val);
    });
    const amenStr = amenList.join(', ');
    if (amenStr.length < 20) {
      $('.amenities h4').text(amenStr);
    } else {
      $('.amenities h4').text(amenStr.substring(0, 20) + '...');
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => checkStatus(data))
      .catch((error) => console.log('Error:', error));
  });

  function checkStatus(data) {
    console.log(data);
    console.log(data.status);
    const apiStatus = document.getElementById('api_status');
    if (data.status === 'OK') {
      apiStatus.classList.add('available');
    } else {
      apiStatus.classList.remove('available');
    }
  }

  const searchPlaces = () => {
    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => displayPlaces(data))
      .catch((error) => console.error('Error:', error));
  };

  const displayPlaces = (placesData) => {
    const placesSection = document.querySelector('section.places');

    for (const place of placesData) {
      const article = document.createElement('article');
      article.innerHTML = `
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night} per night</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
        </div>
        <div class="description">${place.description}</div>
      `;
      placesSection.appendChild(article);
    }
  };
  const button = document.querySelector('button');

  button.addEventListener('click', function () {
    const checkedAmenities = Object.keys(checkedDict);
    searchPlaces({ amenities: checkedAmenities });
  });
});
