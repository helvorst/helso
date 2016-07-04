/**
 * Created by hel on 03.07.2016.
 */
so.controller('searchCnt', function ($scope, Restangular, $timeout, $rootScope, $state, kbFocus) {

    kbFocus('focusSearch');

    $scope.doSearch = function () {
        $scope.warning = null;
        if ($scope.whatToSearch) {
            $state.go('results')
        }
        else {
            $scope.warning = "I can't do search until you fill the field above"
            $timeout(function () {
                $scope.warning = null;
            }, 5000)
        }
    }

})
