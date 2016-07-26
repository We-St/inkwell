
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CalendarController',
    function($scope, $ionicModal, $ionicActionSheet, $ionicPopup, storageService) {

  $scope.currentDate = moment();

  $scope.tabs = [];
  for(var delta = -14; delta <= 7; delta++) {
    var date = moment($scope.currentDate).add(delta, 'days');
    $scope.tabs.push({
      date: date,
      text: date.date(), 
      subtext: date.format('ddd').toUpperCase(), 
      facts: []
    });
  }

  $scope.onSlideMove = function(data){
    var tab = $scope.tabs[data.index];
    $scope.currentDate = tab.date;

    storageService.getFactsByDate($scope.currentDate).then(function(facts) {
      tab.facts = facts || [];
      $scope.facts = tab.facts;
    }, function(error) {
      if (error.code === 1) { // File not found.
        tab.facts = [];
        $scope.facts = tab.facts;
      }
      tab.facts = [];
      $scope.facts = tab.facts;
    });
  };

  // Filled by the ion-slider directive.
  $scope.ui = { 
  	slideOptions: { },
		slider: null
	};

  $scope.$on('$ionicSlides.slideChangeEnd', function(event, data) {
  	console.log('Slide', data.activeIndex, $scope.ui.slider);
  });

  $scope.saveFact = function(fact) {
    var idx = $scope.facts.indexOf(fact);
    if (idx === -1) { // New activity.
      $scope.facts.push(fact);
    }
    storageService.writeFacts($scope.currentDate, $scope.facts);
  }.bind(this);

  $scope.deleteFact = function(fact) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Item',
      template: "Are you sure you want to delete this item?"
    });

    confirmPopup.then(function(res) {
      if (res) {
        var idx = $scope.facts.indexOf(fact);
        $scope.facts.splice(idx, 1);
        storageService.writeFacts($scope.currentDate, $scope.facts);
      }
    }.bind(this));
  }.bind(this);

  // Initialize modals.
  $scope.showActivityForm = function(fact) {
  	$scope.selectedFact = fact || {
      type: 'activity',
      date: $scope.currentDate
    };

    $scope.ui.activityModal = $ionicModal.fromTemplate(
      '<ion-modal-view>' + 
      '  <activity-form modal="ui.activityModal"' + 
      '                 activity="selectedFact"' +
      '                 save="saveFact(activity)">' +
      '  </activity-form>' +
      '</ion-modal-view>', {
      scope: $scope
    });
  	$scope.ui.activityModal.show();
  }.bind(this);

  $scope.showLocationForm = function(fact) {
    $scope.selectedFact = fact || {
      type: 'location',
      date: $scope.currentDate
    };

    $scope.ui.locationModal = $ionicModal.fromTemplate(
      '<ion-modal-view>' + 
      '  <location-form modal="ui.locationModal"' + 
      '                 location="selectedFact"' +
      '                 save="saveFact(location)">' +
      '  </location-form>' +
      '</ion-modal-view>', {
      scope: $scope
    });
    $scope.ui.locationModal.show();
  }.bind(this);

  $scope.showCounterForm = function(fact) {
    $scope.selectedFact = fact || {
      type: 'counter',
      value: 0,
      date: $scope.currentDate
    };

    $scope.ui.counterModal = $ionicModal.fromTemplate(
      '<ion-modal-view>' + 
      '  <counter-form modal="ui.counterModal"' + 
      '                counter="selectedFact"' +
      '                save="saveFact(counter)">' +
      '  </counter-form>' +
      '</ion-modal-view>', {
      scope: $scope
    });
    $scope.ui.counterModal.show();
  }.bind(this);

  $scope.showContextMenu = function(fact) {
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-edit"></i> Edit' },
        { text: '<i class="icon ion-trash-a"></i> Delete' },
      ],
      titleText: 'Actions for ' + fact.title,
      cancel: function() {
        return false;
      }.bind(this),
      buttonClicked: function(index) {
        if (index === 0) {
          switch (fact.type) {
            case 'activity':
              $scope.showActivityForm(fact);
              break;
            case 'location':
              $scope.showLoccationForm(fact);
              break;
            case 'counter':
              $scope.showCounterForm(fact);
              break;
          }
        } else if (index === 1) {
          $scope.deleteFact(fact);
        }
        return true;
      }.bind(this)
    });
  }.bind(this);

  $scope.changeCounterValue = function(counter, delta) {
    counter.value = parseInt(counter.value);
    counter.value += delta;
    $scope.saveFact(counter);
  }.bind(this);
});

