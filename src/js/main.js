var worker = new SharedWorker('src/js/sharedWorker.js');

worker.port.addEventListener("message", function(e) {
	var log = document.getElementById('log');
	log.textContent += '\n' + e.data;
});

worker.port.start();