var Ruined = {

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

	explain: function() {
		$("body").addClass("explaining");
		
		$("#container").animate({
  			left: '-150%'
  		}, 'fast', function() {
  			$("#whats-all-this").show();
  			$("#container").hide();
  			$("#whats-all-this").animate({
  				right: '50%'
  			}, 'slow', function() {
  				$("#back-to-list").fadeIn("fast");
  			});
  		});
	},

	unexplain: function() {
		$("body").removeClass("explaining");
		$("#back-to-list").fadeOut("fast");

		$("#whats-all-this").animate({
  			right: '-150%'
  		}, 'fast', function() {
  			$("#container").show();
  			$("#whats-all-this").hide();
  			$("#container").animate({
  				left: '0%'
  			}, 'slow', function() {
  				
  			});
  		});
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
		      return parseFloat($elem.find('.quality').text());
		    },
		    fan : function ( $elem ) {
		      return parseFloat($elem.find('.fan').text());
		    },
		    final : function ( $elem ) {
		      return parseFloat($elem.find('.final').text());
		    },
		    tragedy : function ( $elem ) {
		      return parseFloat($elem.find('.tragedy').text());
		    },
		    ruin : function ( $elem ) {
		      return parseFloat($elem.find('.ruin').text());
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

		$("#explanation").click(function() {
			if(!$("body").hasClass("explaining")) {
				Ruined.explain();
			}
			else {
				Ruined.unexplain();
			}
		})

		$("#back-to-list").click(function() {
			Ruined.unexplain();
		})

		Ruined.sort('name', true);

	}

}

$(document).ready(function() {
	Ruined.init();
});


