/**
 * Created by hel on 01.07.2016.
 */
so = angular.module('so', ['restangular', 'ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'keyboard'])



so.controller('soCnt', function ($scope, Restangular, $timeout, $state) {
    $state.go('search')

})







