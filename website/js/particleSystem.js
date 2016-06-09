
angular.module( 'ps', [ 'ngRoute' ] )

.config( function( $routeProvider ) {
    $routeProvider.when( '/', {
        controller: 'Main',
        controllerAs: 'ctrl',
        templateUrl: 'views/main.html'
    });
}) 

.controller( 'Main', [ '$scope', function( $scope ) {
   $scope.testVar = "Test data working";
    
    this.launchAlert = function() {
        alert( "Alert Launched from Controller! - in Directive!" );
    }
}])

.directive( 'particleSystem', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/pstemplate.html',
        link: function( scope, ele, attrs ) {
            
        }
    }
});


