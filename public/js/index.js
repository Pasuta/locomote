$(document).ready(function() {

  $('.date-picker').datepicker({
    orientation: "top auto",
    autoclose: true
  });

  var tabs = {
    'tab-2' : $("#tab-2"),
    'tab-1' : $("#tab-1"),
    'tab0' : $("#tab0"),
    'tab1' : $("#tab1"),
    'tab2' : $("#tab2")
  };

  var loader = $("#loader");
  var resultsBlock = $("#resultsBlock");
  var form = $( "#flights" );

  form.submit(function( event ) {
    event.preventDefault();

    loader.removeClass('hidden');
    resultsBlock.addClass('hidden');

    $.ajax({
      type: "GET",
      url: '/api/search',
      data: form.serialize(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: successFunc,
      error: errorFunc
    });

    function successFunc(data, status) {
      if (!Object.keys(data).length) alert('empty response');
      else {
        renderSearchResults(data);
        resultsBlock.removeClass('hidden');
      }
      loader.addClass('hidden');

    }

    function errorFunc() {
      alert('error');
    }
  });

  function renderSearchResults(result) {

    for (var day in result) {
      if(result.hasOwnProperty(day)) {
        var dayData = result[day];
        var html = '';
        for (var i = 0; i < dayData.length; i++) {
          if (dayData[i].hasOwnProperty('error')) {
            html += dayData[i].error + '<br>';
          } else {
            html += buildFlightInfo(dayData[i], i);
          }
        }
        tabs['tab' + day].append(html);
      }
    }
  }

  function buildFlightInfo(flight, i) {
    var airline = ++i +'.) <b>airline</b>: ' + flight.airline.name + '. ';
    var plane = '<b>plane</b>: ' + flight.plane.fullName + '. ';
    var start = '<b>start</b>: ' + flight.start.countryName + '. ';
    var price = '<b>price</b>: <span style="color: darkred">' + flight.price + '</span>. <br>';
    start += flight.start.cityName + '. ';
    start += flight.start.airportName + '. ';
    start += '<b>' + flight.start.dateTime + '</b>.<br>';

    var finish = '<b>finish</b>: ' + flight.finish.countryName + '. ';
    finish += flight.finish.cityName + '. ';
    finish += flight.finish.airportName + '. ';
    finish += '<b>' + flight.finish.dateTime + '</b>.<br>';

    return '<p>' + airline + plane + price + start + finish +'</p><hr>';
  }

});
