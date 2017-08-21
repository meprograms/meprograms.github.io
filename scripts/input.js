var inputobject = function() {

}

var uix = new inputobject();
var pb = "";
var bool = true;
var uixreturn = [];
var temp = [];
var mphv = -1;
inputobject.prototype.input = function(ph, t) {
	mphv ++;
	temp.push(document.createElement("input"));
	document.body.appendChild(temp[mphv]);
 	temp[mphv].setAttribute("id", mphv)
	temp[mphv].setAttribute("placeholder", ph);
	uix.backinput(ph, t, mphv);
}
inputobject.prototype.backinput = function(ph, t, mph) {
	var loop = setInterval(function () {
		if(temp[mph].value != "") {
			if(bool) {
				bool = false;
				pb = temp[mph].value;
				var timer = setTimeout(function() {
					if(temp[mph].value == pb) {
						uixreturn.push(temp[mph].value);
						alert(temp[mph].value);
						clearInterval(loop);
					}
					else {
						bool = true;
					}
				}, t * 1000);
			}
		}
	}, 100);
}