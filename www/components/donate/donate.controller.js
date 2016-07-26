var donationModule = angular.module('inkwell-donate');

donationModule.controller('DonationController', function($scope){

  $scope.tabs = [
    {"text" : "26", subtext: "TUE"},
    {"text" : "27", subtext: "WED"},
    {"text" : "28", subtext: "THU"},
    {"text" : "29", subtext: "FRI"},
    {"text" : "30", subtext: "SAT"},
    {"text" : "31", subtext: "SUN"},
    {"text" : "1", subtext: "MON"},
    {"text" : "2", subtext: "TUE"},
    {"text" : "3", subtext: "WED"},
    {"text" : "4", subtext: "THU"},
    {"text" : "5", subtext: "FRI"},
  ];
  $scope.onSlideMove = function(data){
        //alert("You have selected " + data.index + " tab");
  };
});