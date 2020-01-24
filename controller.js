
var app = angular.module("Myweather", ['googlechart','kendo.directives']); 
app.controller("myCtrl", function($scope,$http) {
	$scope.weekdays = new Array(7);
        $scope.weekdays[0] = "Sunday";
        $scope.weekdays[1] = "Monday";
        $scope.weekdays[2] = "Tuesday";
        $scope.weekdays[3] = "Wednesday";
        $scope.weekdays[4] = "Thursday";
        $scope.weekdays[5] = "Friday";
        $scope.weekdays[6] = "Saturday";
		$scope.inFavorites =false;
	    $scope.filterCountry=[]
	    $scope.filter=[]
	    $scope.expression=1;
	    $scope.favorites=[]
	    $scope.getOK=false
		var str1 = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=wWigGkJHaABNmxqoLP1HQofIK1a2iSs8&q=";
		
		
		
		$scope.complete=function(string){
		var str2 = str1.concat(string);
		 $scope.filter=[]
			$http.get(str2).then(function(response) {
      $scope.Countrys = response.data;
	 
  });
		}
		$scope.fillTextbox=function(key,LocalizedName){
			$scope.inFavorites =false;
			 document.getElementById("dash").click();
			$scope.country =LocalizedName
			$scope.countryName =LocalizedName
			$scope.Countrys=null;
			$scope.countryKey=key;
			$scope.countryindex='';
			var d;
			var n
			var str3 = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
			var str2 = str3.concat($scope.countryKey);
			var str4 = str2.concat("?apikey=wWigGkJHaABNmxqoLP1HQofIK1a2iSs8");
				$http.get(str4).then(function(response) {
                $scope.fiveDays = response.data.DailyForecasts;
				 $scope.getOK=true
				 angular.forEach($scope.fiveDays, function (value, key) {                
                 d = new Date(value.Date);
                 n = d.getDay()	
                 if(value.Day.Icon.toString().length == 1){
					 value.Day.Icon = '0'.concat(value.Day.Icon);
				 }
					 
				value.nameDate =  $scope.weekdays[n];
				
            });
			 str3 = "https://dataservice.accuweather.com/currentconditions/v1/";
			 str2 = str3.concat($scope.countryKey);
			 str4 = str2.concat("?apikey=wWigGkJHaABNmxqoLP1HQofIK1a2iSs8");
			$http.get(str4).then(function(response) {
                $scope.currentconditions = response.data;
				 if($scope.currentconditions[0].WeatherIcon.toString().length == 1){
					 $scope.currentconditions[0].WeatherIcon = '0'.concat($scope.currentconditions[0].WeatherIcon);
				 }
				angular.forEach($scope.favorites, function (value, key) {                
               if(value.countryKey == $scope.countryKey){
					$scope.inFavorites =true;
					$scope.countryindex = key;
				 }	
            });
			if($scope.inFavorites ==true){
				document.getElementById("heart").style.color = "red";
				 $scope.expression=2;
				 }
				 else{
					document.getElementById("heart").style.color = "white"; 
					 $scope.expression=1;
				 }
				
				
            });
				
	 
  });
		}
		$scope.fillTextbox("215854","Tel Aviv")
		
			$scope.addToFavorites=function(currentconditions){
			if($scope.inFavorites ==true){
				 $scope.inFavorites =false;
				angular.forEach($scope.favorites, function (value, key) {                
               if(value.countryKey == $scope.countryKey){
					
					$scope.countryindex = key;
				 }	
            });
				  $scope.favorites.splice($scope.countryindex, 1);
					document.getElementById("heart").style.color = "white"; 
					 $scope.expression=1;
				 }
				 else{
					 $scope.inFavorites =true;
					 document.getElementById("heart").style.color = "red"; 
					  $scope.expression=2;
			currentconditions.countryName =$scope.countryName
			currentconditions.countryKey =$scope.countryKey
			  $scope.favorites.push(currentconditions)
				 }
		}
  
  







});
