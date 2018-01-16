       angular.module('meanhotel')
              .controller('RegisterController', RegisterController);


        function RegisterController($http){
        	var vm = this;

        	vm.register = function(){
        		var user = {
        			username: vm.username,
        			password: vm.password,
        			name: vm.name
        		};

        		if(!vm.username || !vm.password){
        			vm.error = 'Please add a username and a password';
        		}else{
        			if(vm.password !== vm.passwordRepeat){
        				vm.error = 'passwords donot match';
        			}else{
        				$http.post('/api/users/register', user)
        				.then(function(result){
        					console.log(result);
        					vm.message = 'Successfull registration, please login'
        					vm.error = '';
        				})
        				.catch(function(error){
        					console.log(error)
        					vm.error = error;
        				})
        			}
        		}
        	}
        }

