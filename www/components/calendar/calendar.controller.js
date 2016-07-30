
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CalendarController',
    function($scope, $ionicModal, $ionicActionSheet, $ionicPopup, storageService,
             activityTypes, activityIcons, activityColors) {

  $scope.currentDate = moment();

  $scope.tabs = [];
  for(var delta = -14; delta <= 7; delta++) {
    var date = moment($scope.currentDate).add(delta, 'days');
    $scope.tabs.push({
      date: date.toDate(),
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

  $scope.saveFact = function(fact) {
    var idx = $scope.facts.indexOf(fact);
    if (idx === -1) { // New activity.
      $scope.facts.push(fact);
    }
    storageService.writeFacts($scope.currentDate, $scope.facts);
  };

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
    });
  };

  // Initialize modals.
  $scope.showActivityForm = function(fact) {
  	$scope.selectedFact = fact || {
      type: 'activity',
      date: $scope.currentDate,
      type: activityTypes[0].id,
      icon: _.find(activityIcons, { id: activityTypes[0].icon }),
      color: _.find(activityColors, { id: activityTypes[0].color })
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
  };

  $scope.showContextMenu = function(fact) {
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-edit"></i> Edit' },
        { text: '<i class="icon ion-trash-a"></i> Delete' },
      ],
      titleText: 'Actions for ' + fact.title,
      cancel: function() {
        return false;
      },
      buttonClicked: function(index) {
        if (index === 0) {
          $scope.showActivityForm(fact);
        } else if (index === 1) {
          $scope.deleteFact(fact);
        }
        return true;
      }
    });
  };

  $scope.changeCounterValue = function(counter, delta) {
    counter.value = parseInt(counter.value);
    counter.value += delta;
    $scope.saveFact(counter);
  };
});

