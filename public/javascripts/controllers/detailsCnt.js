/**
 * Created by hel on 03.07.2016.
 */
so.controller('detailsCnt', function ($scope, Restangular, $uibModalInstance, detailsAbout) {

    $scope.spinner = true;
    $scope.error = null;
    $scope.myord = 'owner.display_name'

    if (detailsAbout.author)
        var url = 'search/advanced?order=desc&pagesize=30&sort=votes&user=' + detailsAbout.author + '&site=stackoverflow'

    else if (detailsAbout.tag)
        var url = 'search/advanced?order=desc&pagesize=30&sort=votes&tagged=' + detailsAbout.tag + '&site=stackoverflow'

    Restangular.one(url).get()
        .then(function (ans) {
            if (ans.plain())
                $scope.details = ans.plain();
            $scope.spinner = false;
        },
        function (error) {
            $scope.error = "Can't REST StackOverflow:  " + (error.data && error.data.error_message ? error.data.error_message : '')
            console.log(error)
            $scope.spinner = false;
        })

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
})
