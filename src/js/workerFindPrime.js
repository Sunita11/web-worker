self.addEventListener('message',handleMessage,false);

function handleMessage(event) {
	var n = event.data.value;
	if(isNaN(n) || !isFinite(n)) {
		postMessage({errorMessage: 'not a number', value: NaN});
		return;
	}

	while(true) {
		if(!is12(n)) {
			postMessage({errorMessage: 'Number too big', value: NaN});
			break;
		}

		if(isPrime(n)) {
			postMessage({value: n});
			break;
		}
		else ++n;
	}
}


function isPrime(num) {
	if (num % 1 || num < 2) return false; 
	if(num == leastFactor(num)) return true;
	return false;
}

function is12(num) {
	return (num < 99999999999);
}

function leastFactor(num) {
	if(isNaN(num) || !isFinite(num)) return NaN;
	if(num==0) return 0;
	if (num % 1 || num * num < 2) return 1;
	if(num%2 == 0 ) return 2;
	if(num%3 == 0 ) return 3;
	if(num%5 == 0 ) return 5;

	var q, m= Math.sqrt(num);
	for(i=7;i<=m;i+=30) {
		 if ( (q = num / i)        == Math.floor(q) ) return i;
       if ( (q = num / (i + 4))  == Math.floor(q) ) return i + 4;
       if ( (q = num / (i + 6))  == Math.floor(q) ) return i + 6;
       if ( (q = num / (i + 10)) == Math.floor(q) ) return i + 10;
       if ( (q = num / (i + 12)) == Math.floor(q) ) return i + 12;
       if ( (q = num / (i + 16)) == Math.floor(q) ) return i + 16;
       if ( (q = num / (i + 22)) == Math.floor(q) ) return i + 22;
       if ( (q = num / (i + 24)) == Math.floor(q) ) return i + 24;
	}

	return num;
}