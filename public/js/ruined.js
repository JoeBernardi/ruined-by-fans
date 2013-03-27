var Ruined = {

	calculate: function() {				// uses the power of math to determine the various averages and such (move to backend)
			for(var i in Ruined.data) {
			var thisData = Ruined.data[i];
			var qualities = [];
			var awfulnesses = [];

			if(thisData.tagQuality) {
				qualities.push(thisData.tagQuality)
			}
			if(thisData.joeQuality) {
				qualities.push(thisData.joeQuality)
			}
			if(thisData.davidQuality) {
				qualities.push(thisData.davidQuality)
			}


			if(thisData.tagFans) {
				awfulnesses.push(thisData.tagFans)
			}
			if(thisData.joeFans) {
				awfulnesses.push(thisData.joeFans)
			}
			if(thisData.davidFans) {
				awfulnesses.push(thisData.davidFans)
			}


			var averageQuality = (eval(qualities.join('+')))/qualities.length
			var averageAwfulness = (eval(awfulnesses.join('+')))/awfulnesses.length
			var finalQuality = averageQuality - averageAwfulness;
			var degreeOfRuin = Math.abs(100-((finalQuality/averageQuality)*100))

			thisData.averageQuality = averageQuality
			thisData.averageAwfulness = averageAwfulness
			thisData.finalQuality = finalQuality
			thisData.degreeOfRuin = degreeOfRuin

			if(thisData.finalQuality > 0) {
				thisData.levelOfTragedy = thisData.averageQuality - thisData.finalQuality;
			}
			else {
				thisData.levelOfTragedy = 0;
			}
		}
	},

	getAParameter: function(parameter, sort) {		// returns array of each item and its specified parameter, optionally sorted highest to lowest.
		var params = [];
		for(var i in Ruined.data) {
			var tempObj = {}
			tempObj.name = Ruined.data[i].name;
			tempObj.Parameter = Ruined.data[i][parameter]
			params.push(tempObj)
		}
		if(sort) {
			function compare(a,b) {
			  if (a.Parameter < b.Parameter)
			     return -1;
			  if (a.Parameter > b.Parameter)
			    return 1;
			  return 0;
			}

			params.sort(compare);
		}
		return params;
	},


	sort: function(sortBy, ascending) {
		$('#items').isotope({ sortBy : sortBy, sortAscending: ascending });
		$("#headers .active").removeClass("active asc desc");
		$('#headers .' + sortBy).addClass("active");
		if(ascending) {
			$('#headers .' + sortBy).removeClass("desc").addClass("asc");			
		}
		else {
			$('#headers .' + sortBy).removeClass("asc").addClass("desc");			
		}
	},


	init: function() {

		// pull in the data via ajax and attach it to the object
		$.ajax({
		  url: '/data',
		  async: false,
		  dataType: 'json',
		  success: function (response) {
		  	Ruined.data = response;
		  }
		});

		// set everything up for sorting
		$('#items').isotope({
		  getSortData : {
		    name : function ( $elem ) {
		      return $elem.find('.name').text();
		    },
		    quality : function ( $elem ) {
		      return parseInt($elem.find('.quality').text());
		    },
		    fan : function ( $elem ) {
		      return parseInt($elem.find('.fan').text());
		    },
		    final : function ( $elem ) {
		      return parseInt($elem.find('.final').text());
		    },
		    tragedy : function ( $elem ) {
		      return parseInt($elem.find('.tragedy').text());
		    },
		    ruin : function ( $elem ) {
		      return parseInt($elem.find('.ruin').text());
		    }
		  }
		});

		$("#headers > div").click(function() {
			var sortBy = $(this).attr("data-sort");
			var ascending = true;
			if($(this).hasClass("asc")) {
				ascending = false;
			}
			Ruined.sort(sortBy, ascending)
		});

		Ruined.sort('name', true);
		Ruined.calculate(); 

	}

}

$(document).ready(function() {
	Ruined.init();
});


