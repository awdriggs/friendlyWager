var loginTemplate;
var userTemplate;

$(function() {
  loginTemplate = Handlebars.compile($('#login-template').html());
  userTemplate = Handlebars.compile($('#user-template').html());
  newPostTemplate = Handlebars.compile($('#new-post-template').html());

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
  $('#new-post').html(newPostTemplate(users))
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
    debugger;
    if (jqXHR.status === 404) {
      $('#session').html('Work In Progress');
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
  })
  .done(fetchAndRenderSession)
  .fail(function(response) {
    var err = response.responseJSON;
    alert(err.err + ' - ' + err.msg);
  });;
};

var logout = function() {
  $.ajax({
    url: '/sessions',
    method: 'DELETE',
  }).done(fetchAndRenderSession);
};

var createPost = function() {
  var content = $('#new-post-content').val();
  var userID = $('#user-id').val();

  $.post('/users/'+ userID +'/posts', {
    content: content
  }).done(function() {
    alert('Success!');
  }).error(function(response, stuff) {
    var err = response.responseJSON;
    alert(err.err + ' - ' + err.msg);
  });

  $('#new-post-content').val('');
};
