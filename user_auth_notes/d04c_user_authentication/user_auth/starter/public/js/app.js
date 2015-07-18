var loginTemplate;
var userTemplate;

$(function() {
  loginTemplate = Handlebars.compile($('#login-template').html());
  userTemplate = Handlebars.compile($('#user-template').html());

  fetchAndRenderUsers();
  fetchAndRenderSession();

  $('body').on('click', '#signup-button', signup);
  $('body').on('click', '#login-button', login);
  $('body').on('click', '#logout-button', logout);
  $('body').on('click', '#new-post-button', createPost);
});

var fetchAndRenderUsers = function() {
  $.get('/users').done(renderUsers);
};

var renderUsers = function(users) {
  $('#users').empty();
  users.forEach(renderUser);
};

var renderUser = function(user) {
  $('#users').append(
    $('<li>').append(user.username + ' ' + user.password_digest)
  );
};

var fetchAndRenderSession = function() {
  $.get('/current_user').done(function(user) {
    if (user) {
      $('#session').html(userTemplate(user));
    } else {
      $('#session').html(loginTemplate());
    }
  }).fail(function(jqXHR) {
    if (jqXHR.status === 404) {
      $('#session').html(loginTemplate());
    }
  });
};

var signup = function() {
  var username = $('#signup-username').val();
  var password = $('#signup-password').val();

  $.post('/users', {
    username: username,
    password: password
  }).done(fetchAndRenderUsers);
};

var login = function() {
  var username = $('#login-username').val();
  var password = $('#login-password').val();

  $.post('/sessions', {
    username: username,
    password: password
  }).done(fetchAndRenderSession).fail(function(response) {
    var err = response.responseJSON;
    alert(err.err + ' - ' + err.msg);
  });
};

var logout = function() {
  $.ajax({
    url: '/sessions',
    method: 'DELETE',
  }).done(fetchAndRenderSession);
};

var createPost = function() {
  var content = $('#new-post-content').val();

  $.post('/posts', {
    content: content
  }).done(function() {
    alert('Success!');
  }).fail(function(jqXHR) {
    if (jqXHR.status === 404) {
      alert('New post functionality coming soon');
    } else {
      var err = response.responseJSON;
      alert(err.err + ' - ' + err.msg);
    }
  });
};
