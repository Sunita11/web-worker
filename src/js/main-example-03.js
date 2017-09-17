function getWorkerObject() {
	try {
		if(window.Worker) return window.Worker;
			else return undefined;
	} catch(e) {
		return undefined
	}
}

function isInt(val) {
	var checkFloat = parseFloat(val),
		checkInt = parseInt(val);
	if(checkInt === checkInt) return checkInt;
		else return NaN;
}

function clearDisp() {
	document.getElementById('pageResults').innerHTML = '';
	document.getElementById('message').innerHTML = '';
	document.getElementById('message').className = '';
}

function startSearch() {
	var textVal = document.getElementById('startingInteger').value,
	intVal = isInt(textVal);

	clearDisp();
	if(isNaN(intVal)) {
		dispError(textVal + ' is not an integer.');
		document.getElementById('startingInteger').select();
		return false;
	}

	document.getElementById('primeStart').textContent = intVal;
	worker.postMessage({value: intVal + 1}); //start with next integer
	document.getElementById('startingInteger').select();
	return false;
}

function dispMessage(msg) {
	var m = document.getElementById('message');
	m.className = 'message';
	if(m.textContent.length > 0) {
		m.innerHTML += "<br/>" + msg;
	}else {
		m.innerHTML = msg;
	}
}

function dispError(errorMessage) {
	element('pageResults').innerHTML = 
		'<p class="error">' + errorMessage + '</p>\n';
}
function workerCallBack(event) {
	var value = (event.data.value) ? event.data.value : undefined;
    var errorMessage = (event.data.errorMessage) ? event.data.errorMessage : undefined;
	if(errorMessage) {
		dispError(errorMessage);
		document.getElementById('primeResult').textContent = 'None';
	} else {
		document.getElementById('primeResult').textContent = value;
	}
}

function init () {
	var oWorker = null;
	if(!(oWorker = getWorkerObject())) {
		dispMessage('Web Worker is not supported in this browser');
	}

	worker = new oWorker('/src/js/workerFindPrime.js');
	worker.addEventListener('message',workerCallBack, false);
}
window.onload = function() {
	init();
}