//check for mobile users

var isMobile = {
	    Android: function() {
		            return navigator.userAgent.match(/Android/i);
		        },
	    BlackBerry: function() {
		            return navigator.userAgent.match(/BlackBerry/i);
		        },
	    iOS: function() {
		            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		        },
	    Opera: function() {
		            return navigator.userAgent.match(/Opera Mini/i);
		        },
	    Windows: function() {
		            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
		        },
	    any: function() {
		            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		        }
};

if (isMobile.any()) {
    document.body.innerHTML = "<p>You are using a <a class='status'>mobile</a> version of {Paper Wars Online}</p><p>This is soon to be completely deprecated and we strongly suggest you to download our <a href=#''>app</a></p><p>Mobile check provided by <a href='http://detectmobilebrowsers.com/'>http://detectmobilebrowsers.com/</a></p><p>If you are here to check stats, <a href='#'>click here</a></p>";
}

//menu
var volume = document.getElementById('volume');
var join = document.getElementById("join");
var characters = document.getElementById('characters');
var shop = document.getElementById('shop');

//global vars
let sound = true;

//global functions
//clear form
function resetForm(form) {
    // clearing inputs
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i<inputs.length; i++) {
        switch (inputs[i].type) {
            // case 'hidden':
            case 'text':
                inputs[i].value = '';
                break;
            case 'radio':
            case 'checkbox':
                inputs[i].checked = false;   
        }
    }


    // clearing selects
    var selects = form.getElementsByTagName('select');
    for (var i = 0; i<selects.length; i++)
        selects[i].selectedIndex = 0;

    // clearing textarea
    var text= form.getElementsByTagName('textarea');
    for (var i = 0; i<text.length; i++)
        text[i].innerHTML= '';

    return false;
}

//volume for sound effects
volume.onclick = function () {
    if (sound) {
        volume.classList.remove('fa-volume-up');
        volume.classList.add('fa-volume-mute');
        sound = false;
    } else {
        volume.classList.remove('fa-volume-mute');
        volume.classList.add('fa-volume-up');
        sound = true;
    }
}

//crude way of changing the text
join.onmouseover = function () {
    join.innerHTML = '> Join main lobby <';
}

join.onmouseout = function () {
    join.innerHTML = 'Join main lobby';
}

characters.onmouseover = function () {
    characters.innerHTML = '> Characters <';
}

characters.onmouseout = function () {
    characters.innerHTML = 'Characters';
}
shop.onmouseover = function () {
    shop.innerHTML = '> Shop <';
}

shop.onmouseout = function () {
    shop.innerHTML = 'Shop';
}

join.onclick = function() {
    join.innerHTML = '--------------';
    if (sound) {
        var audio = new Audio('select.wav');
        audio.play();
    }
    setTimeout(function () {
        window.location.href = "../misc/loader/loader.html?redirect=lobby";
    }, 250)
}

characters.onclick = function() {
    characters.innerHTML = '----------';
    if (sound) {
        var audio = new Audio('select.wav');
        audio.play();
    }
    setTimeout(function () {
        window.location.href = "../misc/loader/loader.html?redirect=characters";
    }, 250)
}

shop.onclick = function() {
    shop.innerHTML = '----';
    if (sound) {
        var audio = new Audio('select.wav');
        audio.play();
    }
    setTimeout(function () {
        window.location.href = "../misc/loader/loader.html?redirect=shop";
    }, 250)
}




//side bar
document.getElementById('info').addEventListener('click', function () {
    if (sound) {
        var audio = new Audio('hover.wav');
        audio.play();
    }
    setTimeout(function () {
        window.location.href = "../misc/loader/loader.html?redirect=information";
    }, 250)
});

document.getElementById('user').addEventListener('click', function () {
    var signin = document.getElementById('userarea');
    if (sound) {
        var audio = new Audio('hover.wav');
        audio.play();
    }
    setTimeout(function () {
        if (signin.classList.contains('topout')) {
            signin.classList.remove('topout');
        }
        signin.style.display = 'block';
        signin.classList.add('topin');
    }, 250)

    //back button click
    document.getElementById('back').onclick = function () {
        signin.classList.remove('topin');
        signin.classList.add('topout');

        try {
            resetForm(signin);
                
            //clearing password
            var passwords = document.getElementById('password');
            passwords.value = '';
        }
        finally {
            return;
        }
    }
});

document.getElementById('settings').addEventListener('click', function() {
    if (sound) {
        var audio = new Audio('hover.wav');
        audio.play();
    }
});

document.getElementById('friends').addEventListener('click', function() {
    if (sound) {
        var audio = new Audio('hover.wav');
        audio.play();
    }
})


//socket
function joinedsite(bol, name, pass) {
    document.getElementById('status').innerHTML = `<a id='signed-in'>Signed in as ${name}</a><br><p id='sout'>Sign Out</p>`;
    document.getElementById('sout').addEventListener('click', function(event) {
        event.stopPropagation()
        alert('signed out')
    })

    //make sure to put this line after the user's credentials are verified AND AFTER THE SCREEN DISSAPPEARS LOL
    var signin = document.getElementById('userarea');

    signin.classList.remove('topin');
    signin.classList.add('topout');

    document.getElementById('signin').innerHTML = 'Player Stats';

    //socket.io
    const socket = io.connect();
    var sessionID;

    socket.on('connect', function () {
        sessionID = socket.id;

        socket.emit('connected-data', {
            name: name, password: pass
        });
    })

    if(bol) {
        alert('rememberd lol');
    } else {
        alert('not rememberd lol');
    }


    //server disconnect
    socket.on('sexit', function () {
        alert('Server has closed due to technical difficulties')
    })
}

//sign in 

function submitted() {
    var signin = document.getElementById('userarea');
    var rem = document.getElementById('rem');
    var username = document.getElementById('username').value;
    var password = document.getElementById('passworduser')
    var status = document.getElementById('statusform');
    
    if (username == '') {
        status.innerHTML = 'Both fields need to be filled in';

    } else if (password.value == '') {
        status.innerHTML = 'Both fields need to be filled in';
    } else {
        status.innerHTML = '';
        if (rem.checked) {
            joinedsite(true, username, password);

            resetForm(signin);
            
            //clearing password
            password.value = '';
            
        } else {
            joinedsite(false, username, password);

	        resetForm(signin);	

            //clearing password		
            password.value = '';
        }
    }  
}