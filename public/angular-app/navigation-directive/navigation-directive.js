angular.module('meanhotel').directive('mhNavigation', mhNavigation);

function mhNavigation() {
	// body...
	return{
		restrict: 'E',
		templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
	};
}