var count = 0;
self.addEventListener("connect", function(e){
	count += 1;
	var port = e.ports[0];
	port.postMessage('Hello World! You are connection #' + count);

	self.addEventListener("message",function(event){
		port.postMessage('pong');
	});
},false);
