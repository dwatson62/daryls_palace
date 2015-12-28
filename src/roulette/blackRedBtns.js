roulette.directive('ngBlackRedNumbers', function() {
  return {
    restrict: 'E',
    template: "<button ng-class='rltCtrl.blackOrRedBtn(<%= i %>, 0)' id='<%= i %>' ng-disabled='rltCtrl.disableButton()'' ng-click='rltCtrl.numberBet(<%= i %>)'><%= i %></button>"
  };
});
