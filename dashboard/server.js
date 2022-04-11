const express = require('express')
const fs = require('fs')
const {join} = require('path')
const path = require('path')
const passport = require("passport");
const http = require('http')
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const discord = require("discord.js");
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({clientId: 'e44f16d7cd6144e0a06018c951b7cc11', clientSecret: '119bed4af8bf440a8b831e45b1b2327d', redirectUri: 'https://shark.haco.tw/callback'});
const app = express();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

module.exports = async function (client) {
	const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}views`);

	passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

	passport.use(new Strategy({
    clientID: "949772996216750171",
    clientSecret: process.env['SECRET'],
    callbackURL: `https://shark.haco.tw/callback`,
    scope: ["identify", "email", "connections", "guilds", "guilds.join"]
  },
	(accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));
	
  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
    resave: false,
    saveUninitialized: false,
  }));

	app.use(passport.initialize());
  app.use(passport.session());
	app.locals.domain = "https://shark.haco.tw".split("//")[1];
	app.engine("ejs", ejs.renderFile);
	app.set("view engine", "ejs");
	app.set('views', path.join(__dirname, 'views'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

	const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

	const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

	app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });

	app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

	
	app.get("/dc", (req, res) => {
	  res.redirect('https://discord.gg/RtsckgRjqJ')
	})
	app.get("/discord", (req, res) => {
	  res.redirect('https://discord.gg/RtsckgRjqJ')
	})
	app.get("/support", (req, res) => {
	  res.redirect('https://discord.gg/RtsckgRjqJ')
	})
	app.get("/invite", (req,res) => {
	  res.redirect('https://discord.com/api/oauth2/authorize?client_id=949772996216750171&permissions=8&scope=bot%20applications.commands')
	})
	app.get("/addbot", (req,res) => {
	  res.redirect('https://discord.com/api/oauth2/authorize?client_id=949772996216750171&permissions=8&scope=bot%20applications.commands')
	})
	app.get("/", (req, res) => {
	  let image = client.user.avatarURL({ format: "png", dynamic: true, size: 64 })
	  renderTemplate(res, req, "index.ejs", {client: client,image, alert: null, error: null});
	})
	app.get('/callback', function(req, res) { 
	  let code  = req.query['code'];
		console.log(`https://shark.haco.tw/callback?code=${code}`)
	  spotifyApi.authorizationCodeGrant(code)
	   .then(function(data) {
			// console.log('The token expires in ' + data.body['expires_in']);
   //  	console.log('The access token is ' + data.body['access_token']);
   //  	console.log('The refresh token is ' + data.body['refresh_token']);
	    spotifyApi.setAccessToken(data.body['access_token']);
	    spotifyApi.setRefreshToken(data.body['refresh_token']);
	    res.redirect('/');
	   }, function(err) {
	    console.log('Something went wrong!', err);
	   });
	});
	
	var server = http.createServer(app);
	server.listen(80, () => client.log("Web Server Start On Port 80 And 443", "\x1B[1;34m"));
}



