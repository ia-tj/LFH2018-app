"use strict";

app.factory('api', function() {
  return {
	  getTopicos: function() {
		  return TOPIC_SAMPLES;
	  }
  };
});