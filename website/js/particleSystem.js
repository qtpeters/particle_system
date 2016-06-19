
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
            svg.addImage( 'images/sf1.png' );
            svg.addImage( 'images/sf2.png' );
            svg.populate( 10 );
            this.testAlert = function() {
                alert( "Test alert from directive " + 
                      "controller, defined elsewhere" );
            }

        this.ctrlVar = "Neat Controller Variable in the Button";
    }];
    
    var particleDirective = function() {
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
        var _images = [];
        var _imageElements = [];
        
        var _setRootElement = function( re ) {
            _rootElement = re[0].firstChild;
        };
        
        var _createSvg = function( width, height ) {
            if ( _rootElement ) {
                _svg = d3Lib.select( _rootElement ).append( 'svg' )[0][0];
                d3Lib.select( _svg )
                    .attr( 'style', "background-color: #F1FFFF")
                    .attr( 'width', width )
                    .attr( 'height', height );
                console.log( "TEST" );
            } else {
                throw Error( "Root element not set. " +
                            "SvgService needs an element to work with." )
            }
        }
        
        var _addImage = function( imagePath ) {
            _images.push( imagePath );
        }
        
        var _populate = function( numImages ) {
            var mult = 1;
            _images.forEach( function( _img ) {
                _imageElements.push( d3Lib.select( _svg )
                    .append( 'image' )
                    .attr( 'xlink:href', _img )
                    .attr( 'width', 30 )
                    .attr( 'x', 10 * mult )
                    .attr( 'y', 10 * mult )
                    .attr( 'height', 30 ) );
                mult += 2;
            });
        }
        
        var _animate = function() {
            
        }
        
        return {
            setRootElement: _setRootElement,
            create: _createSvg,
            addImage: _addImage,
            populate: _populate
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
    module.directive( 'particleSystem', particleDirective );
    
})();

