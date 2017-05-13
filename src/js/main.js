/* EXAMPLE-01 SHARED WORKER


var worker = new SharedWorker('/src/js/sharedWorker.js');

worker.port.addEventListener("message", function(e) {
	var log = document.getElementById('log');
	log.textContent += '\n' + e.data;
});

worker.port.start();*/



/*
EXAMPLE-02 SHARED WORKER


var worker = new SharedWorker('/src/js/sharedWorker.js', 'core');

   // CONFIGURATION
   function configure(event) {
     if (event.data.substr(0, 4) != 'cfg ') return;
     var name = event.data.substr(4).split(' ', 1)[0];
     // update display to mention our name is name
     document.getElementsByTagName('h1')[0].textContent += ' ' + name;
     // no longer need this listener
     worker.port.removeEventListener('message', configure, false);
   }
   worker.port.addEventListener('message', configure, false);

   // MAP
   function paintMap(event) {
     if (event.data.substr(0, 4) != 'map ') return;
     var data = event.data.substr(4).split(',');
     // display tiles data[0] .. data[8]
     var canvas = document.getElementById('map');
     var context = canvas.getContext('2d');
     for (var y = 0; y < 3; y += 1) {
       for (var x = 0; x < 3; x += 1) {
         var tile = data[y * 3 + x];
         if (tile == '0')
           context.fillStyle = 'green';
         else 
           context.fillStyle = 'maroon';
         context.fillRect(x * 50, y * 50, 50, 50);
       }
     }
   }
   worker.port.addEventListener('message', paintMap, false);

   // PUBLIC CHAT
   function updatePublicChat(event) {
     if (event.data.substr(0, 4) != 'txt ') return;
     var name = event.data.substr(4).split(' ', 1)[0];
     var message = event.data.substr(4 + name.length + 1);
     // display "<name> message" in public chat
     var public = document.getElementById('public');
     var p = document.createElement('p');
     var n = document.createElement('button');
     n.textContent = '<' + name + '>';
     n.onclick = function () { worker.port.postMessage('msg ' + name); };
     p.appendChild(n);
     var m = document.createElement('span');
     m.textContent = message;
     p.appendChild(m);
     public.appendChild(p);
   }
   worker.port.addEventListener('message', updatePublicChat, false);

   // PRIVATE CHAT
   function startPrivateChat(event) {
     if (event.data.substr(0, 4) != 'msg ') return;
     var name = event.data.substr(4).split(' ', 1)[0];
     var port = event.ports[0];
     // display a private chat UI
     var ul = document.getElementById('private');
     var li = document.createElement('li');
     var h3 = document.createElement('h3');
     h3.textContent = 'Private chat with ' + name;
     li.appendChild(h3);
     var div = document.createElement('div');
     var addMessage = function(name, message) {
       var p = document.createElement('p');
       var n = document.createElement('strong');
       n.textContent = '<' + name + '>';
       p.appendChild(n);
       var t = document.createElement('span');
       t.textContent = message;
       p.appendChild(t);
       div.appendChild(p);
     };
     port.onmessage = function (event) {
       addMessage(name, event.data);
     };
     li.appendChild(div);
     var form = document.createElement('form');
     var p = document.createElement('p');
     var input = document.createElement('input');
     input.size = 50;
     p.appendChild(input);
     p.appendChild(document.createTextNode(' '));
     var button = document.createElement('button');
     button.textContent = 'Post';
     p.appendChild(button);
     form.onsubmit = function () {
       port.postMessage(input.value);
       addMessage('me', input.value);
       input.value = '';
       return false;
     };
     form.appendChild(p);
     li.appendChild(form);
     ul.appendChild(li);
   }
   worker.port.addEventListener('message', startPrivateChat, false);

   worker.port.start();*/