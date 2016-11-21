var app = angular.module('myApp', []);

app.service('service1', function($rootScope) {
    var info = {
        albumName: '',
        albumDesc: ''
    };
    
    function changeInfo(albumInfo) {
        info.albumName = albumInfo.albumName;
        info.albumDesc = albumInfo.albumDesc;
        $rootScope.$broadcast('service1:changeInfo');
        //console.log('changeInfo', albumInfo);
    }

    function getInfo() {
        return info;
    }

    return {
        changeInfo: changeInfo,
        getInfo: getInfo
    };
});

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
        templateUrl: 'templates/main.html'
    };
});

app.directive('myForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/form.html'
    };
});

app.directive('albumDescription', ['service1', '$rootScope', function(service1, $rootScope) {
    function link(scope) {
        $rootScope.$on('service1:changeInfo', function() {
            var info = service1.getInfo();
            scope.albumName = info.albumName;
            scope.albumDesc = info.albumDesc;
            scope.$applyAsync();
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'templates/description-tab.html',
        link: link
    };
}]);

app.directive('card', ['service1', function(service1) {
    
    function link(scope, element, attr) {
        element.on('mouseenter', function(event) {
            service1.changeInfo({
                albumName: scope.song.album,
                albumDesc: scope.song.albumDesc
            });
        });

        element.on('mouseleave', function(event) {
            service1.changeInfo({
                albumName: '',
                albumDesc: ''
            });
        });
    }


    return {
        restrict: 'E',
        templateUrl: 'templates/card.html',
        link: link
    };
}]);