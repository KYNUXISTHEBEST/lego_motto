// intro
var keypress = require('keypress');
var boost = require('movehub');

var hub;
var lock = false;
var timeout;

function na_drukken() {
  if (timeout)
    clearTimeout(timeout);

  timeout = setTimeout(function() {
    lock = false;
  }, 500);
}

function keyboard(_x, _key) {
  if (_key && _key.ctrl && _key.name == 'c') {
    console.log("bye bye");
    process.abort();
  }

  if (hub) {
    if (!lock) {
      lock = true;
      if (_key.name === "up") {
        // console.log("go to front");
        hub.motorAngle('A', 360, -50, na_drukken);
      }
      if (_key.name === "down") {
        // console.log("go to back");
        hub.motorAngle('A', 360, 50, na_drukken);
      }
    }

    if (_key.name === "right") {
      // console.log("go to right");
      hub.motorAngle('C', 360, -100, function(){
        na_drukken();
      });
    }
    if (_key.name === "left"){
      // console.log("go to left");
      hub.motorAngle('C', 360, 100, function(){
        na_drukken();
      });
    }
  }
}

boost.on('ble-ready', function(_status) {
  console.log('Blauwtand is', _status ? "wel" : "niet", "geconnecteerd.");
});

boost.on('hub-found', function(_details) {
  console.log('Woohoow, de motto is gevonden:', _details.uuid);

  boost.connect(_details.address, function(_err, _hub) {
    if (_err) {
      throw _err;
    }


    hub = _hub;

    hub.on('connect', function() {
      console.log('Motto verbonden he zeg');
    });


  });
});


console.log("let's start")
console.log("      ============================")
console.log("      |WELCOME TO THE KYANBOT ONE|")
console.log("      ============================")
// for (var i = 0; i < 3; i++) {
//   console.log("L")
//   console.log("O")
//   console.log("L")
// }

function kyan_bot() {
  console.log("      =========================================")
  console.log("      |THE KYANBOT ONE IS SEARCHING THE MOTO|")
  console.log("      =========================================")
  // now the bot needs to work
  console.log("[PREPARING THE KEYBOAAAAARDDDD...]")
  // here we setup the keyboard
  keypress(process.stdin);
  process.stdin.on('keypress', keyboard);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  //

  console.log("[PREPARING TO CONTROL THE MOTO...]")

}



kyan_bot();
