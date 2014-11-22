var React = require('react');
var Router = require('react-router')
var routes = require('./app/components/Routes');
var LinkActions = require('./app/actions/LinkActions');
var UserActions = require('./app/actions/UserActions');

var links = JSON.parse(document.getElementById('links-state').innerHTML);
var user = JSON.parse(document.getElementById('user-state').innerHTML);

LinkActions.loadLinks(links);
user && UserActions.loadUser(user);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});