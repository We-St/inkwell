// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'inkwell-calendar', 'inkwell-donate', 'ionic-datepicker'])

.config(function($stateProvider, $urlRouterProvider, $compileProvider, ionicDatePickerProvider) {
  $stateProvider.state('calendar', {
    url: '/',
    templateUrl: 'components/calendar/calendar.html',
    controller: 'CalendarController'
  }).state('goals', {
    url: '/goals',
    templateUrl: 'components/goals/goals.html'
  }).state('donate', {
    url: '/donate',
    templateUrl: 'components/donate/donate.html',
    controller: 'DonationController'
  });
  $urlRouterProvider.otherwise('/');

  ionicDatePickerProvider.configDatePicker({
    inputDate: new Date(),
    setLabel: 'Select',
    closeLabel: 'Close',
    mondayFirst: true,
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    showTodayButton: false,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: true
  });

  $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile|data|content):|data:image\//);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(!window.cordova) {
      cordova = { file: {} }; // Prevent errors from happening on non-mobile browsers for testing.
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
