var myApp= angular.module("myApp",[]);

myApp.controller('myController',['$scope',function($scope){

	$scope.onSignIn=function(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}

	$scope.signOut=function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


	$scope.facebook= {
		username:"",
		email:""
	};

	$scope.onFBlogin=function(){
		FB.login(function(response){
			if (response.authResponse) {
				FB.api('/me','GET',{fields:'email, first_name, name, id, picture'},function(response){
					$scope.$apply(function(){
						$scope.facebook.username=response.name;
						$scope.facebook.email=response.email;
						$scope.fb_image=response.picture.data.url;
					});
				});

			}else{
				//error
			}

		} ,	{
			
			scope:'email,user_likes',
			return_scopes:true
		});
	}

}]);