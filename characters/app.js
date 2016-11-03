var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = module.exports = koa();

var characters = [];

app.use(logger());

app.use(route.get('/', list));
app.use(route.get('/register', create));
app.use(route.get('/characters/:id', details));
app.use(route.get('/character/:id', remove));

var *list = function() {
  this.body = yield render('list', { characters: characters });
}

var *create = function() {
  this.body = yield render('new');
}

var *details = function(id) {
  var character = characters[id];
  if (!character) this.throw(404, 'Character is not registered yet :c');
  this.body = yield render('details', { character: character });
}

var *remove = function(id) {
  var target = characters[id];
  if (target) {
    this.body = yield render('remove', {character: charcter});
  }
}
