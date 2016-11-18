var app = angular.module('myApp', []);

app.controller('LibraryController', ['$http', function($http) {
    var library = this;
    library.songs = [];
    library.newSong = {};

    $http.get('./songs.json').success(function(data) {
        library.songs = data;
    });

    library.addSong = function() {
        library.songs.push(library.newSong);

        library.newSong = {};
    };

}]);

app.directive('main', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/main.html',
        controller: function($scope) {
            $scope.albumName = "asd";
            
            this.getName = function() {
                return $scope.albumName;
            };

            this.setName = function(name) {
                $scope.albumName = name;
            };
        },
        controllerAs: "MainController"
    };
});

app.directive('myForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/form.html'
    };
});

app.directive('albumDescription', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/description-tab.html'
    };
});

app.directive('card', function() {
    
    function link(scope, element, attr, ctrl) {
        element.on('click', function(event) {
            console.log(scope, ctrl);   
            ctrl.setName(scope.song.album);       
        });
    }


    return {
        restrict: 'E',
        require: '^^main',
        templateUrl: 'templates/card.html',
        link: link
    };
});