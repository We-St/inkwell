var coreModule = angular.module('inkwell-core');

coreModule.directive('map', function($http) {
  return {
    scope: {
      lat: '=',
      long: '='
    },
    template: '<div class="map" data-tap-disabled="true"></div>',
    restrict: 'E',
    controller: function($scope) {
    },
    link: function($scope, $element, $attrs) {

      $http.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAIovQI2bbQrcLSwYKupmoGbby3uZvUXFI").then(function(response) {
        var latLng = new google.maps.LatLng(response.data.location.lat, response.data.location.lng);
        var mapOptions = {
          zoom: 8,
          center: latLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
        
        var map = new google.maps.Map($element[0].querySelector('.map'), mapOptions);
        google.maps.event.addListenerOnce(map, 'idle', function(){
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });
        });      
         
      }, function(error) {
        console.log(error.code);
      });

    }
  }
});