


//Ticker
var symbol = "GOOG"; //default symbol to be search
var ticker = new Worker('ticker.js');

var select = function (newSymbol){
	ticker.postMessage(newSymbol);
}

//Searcher
var searcher = new Worker('searcher.js');

var search = function(query){
	searcher.postMessage(query);
}








document.getElementById('dataToBeSearch').addEventListener("input", function(){
	search(this.value);
},false);
