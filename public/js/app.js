console.log('app.js working');

$(function() {
    $('#logout').click(logout);
    $('#datetimepicker1').datetimepicker({step:10});
});

var logout = function() {
	$.ajax({
    		url: '/',
    		method: 'DELETE'
    	}).done();
};

