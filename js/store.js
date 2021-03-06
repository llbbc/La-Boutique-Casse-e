//list onclick
function choicebar(option){
	if(option.innerHTML == "Book"){
		document.getElementById('search_button').innerHTML = "Book";
		document.getElementById('blueraylist').style.display = 'none';
		document.getElementById('booklist').style.display = 'block';
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
	}else if(option.innerHTML == "BlueRay"){
		document.getElementById('search_button').innerHTML = "BlueRay";	
		document.getElementById('booklist').style.display = 'none';
		document.getElementById('blueraylist').style.display = 'block';
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
	}
}



//http request
//booklist
var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";

function getBookList(){

	var list = new XMLHttpRequest();

	//var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+term;

	list.open("GET",uri,true);

	list.setRequestHeader("Accept","application/json");
	list.onreadystatechange = function(){
		if (list.readyState == 4 && list.status == 200) {
		//var booklist = document.getElementById("showtest");
		//booklist.innerHTML = xhr.responseText;
		var resp = JSON.parse(list.responseText);
		organizeBookList(resp);
		//console.log(1);
		}
	}
	list.send(null);
}

function organizeBookList(booklists){

	var tableContent = "<tr class='orderTitle'><td colspan='3'>booklists</td></tr>\n"
	for (var i = 0; i < booklists.length; ++i) {
		var books = booklists[i];

		var bookId = String(books.Id);
		var bookTitle = books.Title;
		var bookImg = 'http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/bookimg?id='+bookId;
		var imgTag = '<img src='+bookImg+'></img>';
		var buyuri = 'http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id='+String(bookId); 
		//var alink = String(<a href=buyuri></a>)

		var imgbuy = "<img src='img/buy_photos.jpg' id='img"+bookId+"' style='width:80%;height:15%'>"+"</img>";
		var alink = "<a href="+buyuri+">"+imgbuy+"</a>";
		
		if(i % 2 == 1){
			tableContent += "<tr class='orderOdd'>";
		} else{
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td>" + bookTitle + "</td><td>"+ imgTag+ "</td><td>"+alink+"</td></tr>\n";
	}
	document.getElementById('booklist').innerHTML = tableContent;
}

function run(){
	getBookList();
	getBlueRay();
}

//blueray
var uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
function getBlueRay(){

	var list = new XMLHttpRequest();

	//var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+term;

	list.open("GET",uri2,true);

	list.setRequestHeader("Accept","application/json");
	list.onreadystatechange = function(){
		if (list.readyState == 4 && list.status == 200) {
		//var booklist = document.getElementById("showtest");
		//booklist.innerHTML = list.responseText;
		var resp = JSON.parse(list.responseText);
		organizeBlueRay(resp);
		}
	}
	list.send(null);
}

function organizeBlueRay(bluerays){
	var tableContent = "<tr class='orderTitle' ><td colspan='3'>BlueRays</td></tr>\n";
	for (var i = 0; i < bluerays.length; ++i) {
		var imgbuy = "<img src='img/buy_photos.jpg' id='img"+blueId+"' style='width:80%;height:15%'>"+"</img>";
		var bluer = bluerays[i];
		var blueTitle = bluer.Title;
		var blueId = bluer.Id;
		var blueImg = 'http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brimg?id='+blueId;
		var imgTag = '<img src='+blueImg+'></img>'; 
		var bluebuy = "http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=" + blueId;
		var alink = "<a href="+bluebuy+">"+imgbuy+"</a>";
		if(i % 2 == 1){
			tableContent += "<tr class='orderOdd'>";
		} else{
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td>" + blueTitle + "</td><td>"  + imgTag +"</td><td>"  + alink +"</td></tr>\n";
	}
	document.getElementById('blueraylist').innerHTML = tableContent;
}

//filter
function filterlist(e){
	var textfield = document.getElementById(e).value;
	var option = document.getElementById('search_button').innerHTML;
	if( option== "Book "){
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+textfield;
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
		getBookList();	
	}else if (option == "BlueRay"){
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term="+textfield;
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
		getBlueRay();
	}

}

function filterlistblue(e){
	var textfield = document.getElementById(e).value;
	var option = document.getElementById('search_buttonblue').innerHTML;
	if( option== "Blueray"){
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term="+textfield;
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
		getBlueRay();
	}else if (option == "Book"){
		uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term="+textfield;
		uri2 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
		getBookList();	
	}
}

//form submissionx
var uri3 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/register";
function signup_in(){
	var xhttp = new XMLHttpRequest();
	var username = document.getElementById('username').value;
	var passwd = document.getElementById('password').value;
	var address = document.getElementById('address').value;
	var vars = {
		"Name":passwd,
		"Password":address,
		"Address":username
	}

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		  document.getElementById("success").innerHTML = xhttp.responseText;
		}
	}
	xhttp.open("POST", uri3, true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(vars));
	alert("Thanks for signing up");
}



//comments
var uri4 = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/comment?name=";
function comment_submit(){
	var xhttp = new XMLHttpRequest();
	var name = document.getElementById('nametext').value;
	var comment = document.getElementById('commenttext').value;
	var uri_4 = uri4 + name;
	xhttp.onreadystatechange = function() {
		showcomments();
	}
	xhttp.open("POST", uri_4, true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(comment));
	alert("Thanks for ur comment");	
}

function showcomments(){
	var xhr = new XMLHttpRequest();
	var uri = " http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
	xhr.open("GET",uri,true);
	xhr.setRequestHeader("Accept","application/xml");
	//xhr.responseType = "document";
	xhr.onreadystatechange = function(){

		if (xhr.readyState == 4 && xhr.status == 200) {
			var resp = xhr.responseText;
			document.getElementById('commentdis').innerHTML = resp;
		}
	}

	xhr.send(null);
}


//close service


