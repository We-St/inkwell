
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('LocationFormController',
    function($scope, $cordovaGeolocation) {

  $scope.cancel = function() {
    $scope.modal.hide();
  };

  // var options = { maximumAge: 3000, timeout: 300000, enableHighAccuracy: true };
  // navigator.geolocation.watchPosition(function(result) {
  //   console.info(result);
  // }, function(error) {
  //   console.error(JSON.stringify(error));
  // }, options);

  //$cordovaGeolocation.getCurrentPosition(options).then(function(position) {
  //  console.log("Current pos:", position);

    //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    // var mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // //Wait until the map is loaded
    // google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
    //   var marker = new google.maps.Marker({
    //     map: $scope.map,
    //     animation: google.maps.Animation.DROP,
    //     position: latLng
    //   });      
     
    //   var infoWindow = new google.maps.InfoWindow({
    //       content: "Here I am!"
    //   });
     
    //   google.maps.event.addListener(marker, 'click', function () {
    //       infoWindow.open($scope.map, marker);
    //   });
     
    // });
  //}, function(error) {
  //  console.error("Error in geolocation:", JSON.stringify(error));
  //});

});

calendarModule.directive('locationForm', function() {
  return {
    scope: {
      location: '=',
      modal: '=',
      save: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/location-form.html',
    controller: 'LocationFormController'
  }
});