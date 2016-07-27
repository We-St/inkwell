var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('ImagesFormController',
  function($scope, $cordovaCamera) {

    $scope.cancel = function() {
      $scope.modal.hide();
    };


    // Initialize modals.
    $scope.ui = {};

    // var options = {
    //   quality: 50,
    //   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //   encodingType: Camera.EncodingType.JPEG,
    //   targetWidth: 100,
    //   targetHeight: 100,
    //   popoverOptions: CameraPopoverOptions,
    //   correctOrientation:true
    // };

    // $cordovaCamera.getPicture(options).then(function(imageData) {
    //   var image = document.getElementById('myImage');
    //   image.src = "data:image/jpeg;base64," + imageData;
    // }, function(err) {
    //   // error
    // });

    plugins.imagePicker.getPictures(function(results) {
      for (var x in results) {
        console.log(JSON.stringify(results[x]));
      }
    }, function(error) {
      console.log(error);
    }, {
      maximumImagesCount: 100,
      width: 800
    })


  });

calendarModule.directive('imagesForm', function() {
  return {
    scope: {
      images: '=',
      modal: '=',
      save: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/images-form.html',
    controller: 'ImagesFormController'
  }
});