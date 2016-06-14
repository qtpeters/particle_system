
( function() {
    
    var mainController = [ '$scope', function( $scope ) {
       $scope.testVar = "Test data working";

        this.launchAlert = function() {
            alert( "Alert Launched from Controller! - in View!" );
        }
    }];
    
    var particleController = [ '$scope', '$element', '$attrs', 'SvgService', 
        function( $scope, $element, $attrs, svg ) {
        
            svg.setRootElement( $element );
            svg.create( 400, 400 );
            this.testAlert = function() {
                alert( "Test alert from directive " + 
                      "controller, defined elsewhere" );
            }

        this.ctrlVar = "Neat Controller Variable in the Button";
    }];
    
    var particleDir = function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/pstemplate.html',
            controller: 'ParticleController',
            controllerAs: 'pctrl',
            bindToController: true
        }
    };
    
    var svgSvc = function( d3Lib ) {
        
        var _rootElement;
        var _svg;
        
        var _setRootElement = function( re ) {
            _rootElement = re[0].firstChild;
        };
        
        var _createSvg = function( width, height ) {
            if ( _rootElement ) {
                _svg = d3Lib.select( _rootElement ).append( 'svg' );
            } else {
                throw Error( "Root element not set. " +
                            "SvgService needs an element to work with." )
            }
        }
        
        return {
            setRootElement: _setRootElement,
            create: _createSvg
        }
    };
    
    var config = function( $routeProvider ) {
        $routeProvider.when( '/', {
            controller: 'MainController',
            controllerAs: 'ctrl',
            templateUrl: 'views/main.html'
        });
    };
    
    var module = angular.module( 'ps', [ 'ngRoute', 'libs' ] );
    module.config( config );
    module.factory( 'SvgService', svgSvc );
    module.controller( 'MainController', mainController );
    module.controller( 'ParticleController', particleController );
    module.directive( 'particleSystem', particleDir );
    
})();

