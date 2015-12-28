roulette.directive('ngSpinHistory', function() {
  return {
    restrict: 'E',
    template: "<div class='history'><h3>Spin History: </h3><div id='past-spins' ng-repeat='pastSpins in rltCtrl.pastSpins | orderBy:"-"'><li>{{pastSpins.number}} {{pastSpins.colour}}</li></div><br></div>"
  };
});
