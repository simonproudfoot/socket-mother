const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

var m = 2
function countdown() {
    var current = m--
    // if (m >= 0) {
    console.log(`Min: ${current}!`);
    io.emit("oneSecond", {
        minutes: current
    });
}

app.get("/", function (req, res) {
    res.send("<h1>I'm listening!</h1>")
})




setInterval(countdown, 60000)
io.on('connection', (socket) => {
    console.log('Socket server initiated')
    console.log('Counting down')
    // receive/reset when video finished
     
    socket.on('test', (message) => {
        io.emit("testReceived", {
            message: 'got'
        });
    }
    

    socket.on('resetTimer', (msg, active) => {
        working = true
        console.log('Received reset')
        clearInterval(countdown)
        m = 3;
        io.emit("oneSecond", {
            minutes: m
        });
        // setTimeout(() => {
        console.log('start again')
        setInterval(countdown, 60000) // start again
        working = false
    })

})


app.listen(process.env.PORT || 3001,  () => console.log("Server is running..."+process.env.PORT));
