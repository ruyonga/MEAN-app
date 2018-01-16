         angular.module('meanhotel')
                .controller('HotelController', HotelController);

 function HotelController($route, hotelDataFactory, $routeParams, AuthFactory) {
                	// body...
                	var vm = this;
                 var id  = $routeParams.id;
                 vm.isSubmitted = false;

                	vm.title = 'MEAN Hotel App';
                	hotelDataFactory.hotelDisplay(id).then(function(response){
                		console.log(response);
                		vm.hotel = response;
                    vm.stars = _getStarRating(response.stars);
                	});

function _getStarRating(stars){
          console.log( new Array(stars))
          return new Array(stars)
          }

  vm.isLoggedIn = function(){
            if(AuthFactory.isLoggedIn){
              return true;
            }else{
              return false;
            }
          };



  vm.addReview = function(){
         var postData = {
                name :  vm.name,
                rating : vm.rating,
                review : vm.review
         };
    if(vm.reviewForm.$valid){
            hotelDataFactory.postReview(id, postData)
            .then(function(response){
              if(response.status === 200){
                 $route.reload();
              }

            }).catch(function(error){
                   console.log(error)
            })
         }else{
            vm.isSubmitted = true
         }
    }
}
        
