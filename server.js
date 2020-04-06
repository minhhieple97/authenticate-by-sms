// Require express and create an instance of it
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require("./config.json");
const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYTczOGUyMWI5MWNlMjRmNDM0ODBmZTZmZWU0MjU4Yzg0ZGI0YzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FtcHVzLWp1bmlvci04ZDRhNiIsImF1ZCI6ImNhbXB1cy1qdW5pb3ItOGQ0YTYiLCJhdXRoX3RpbWUiOjE1ODYxODI0NzYsInVzZXJfaWQiOiJxc0l1clE3YWlVYTdRWG9uRHhWV2Y5THNZdWIyIiwic3ViIjoicXNJdXJRN2FpVWE3UVhvbkR4VldmOUxzWXViMiIsImlhdCI6MTU4NjE4MjQ3NiwiZXhwIjoxNTg2MTg2MDc2LCJwaG9uZV9udW1iZXIiOiIrODQ4ODk2NDQ3OTciLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4NDg4OTY0NDc5NyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.BMMQQruEn3oY8IcvZGhvLoREgbOVk6Sf7UcMWB2CWqQy-AMbqDjh6VEuf1K7D_rNmhBOtrAps_RKFS1Fs5m_BZmyo_5XqbQq4Jty2xI4eOF9FXGDB4TVIN2SatFth9-0Cz9KLa9dXtEvf2-xoun_IHOPNmzB61mbLhw3MLajAhx_qD3GQnHA4w-3ebHEolZuM_JFnijxNQt_jTx0kLtJ-ym6jJD7beKfqPkdrvneWNOiKZZbIUw4LxjYeLsiL9tqFuxQ1Cs0MM5kX6Vm1qNaECYA7AI4a5w5HgCcQsQELoBS3VaSj04gvkXZu_H2_WjqgyAgj9kTlHkY-XYNBNV1SQ`
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://campus-junior-8d4a6.firebaseio.com"
});
function checkAuth(req, res, next) {
        console.log("OK",Object.keys(admin.auth()))
        admin.auth().verifyIdToken(token)
            .then((data) => {
                console.log(data)
                next()
            }).catch(() => {
                res.status(403).send('Unauthorized')
            });
}
app.get('/', checkAuth, function (req, res) {
    res.send('<b>My</b> first express http server');
});

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});