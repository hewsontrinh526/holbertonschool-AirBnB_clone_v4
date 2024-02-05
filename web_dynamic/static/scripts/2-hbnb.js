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
});

document.addEventListener('DOMContentLoaded', function() {
  const url = "http://0.0.0.0:5001/api/v1/status/";
  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data.status === 'OK') {
      document.querySelector('div#api_status').classList.add('available');
    } else {
      document.querySelector('div#api_status').classList.remove('available');
    }
  })
  .catch(error => {
    console.error(error);
  })
});
