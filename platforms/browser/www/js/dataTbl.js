var dataArray=new Array();
 var gender = "f";
var teeth = []; // array to store patient's examined teeth
var total =0; // variable to store total treatement cost at new case
var base_url = "http://greyboxerp.in/dentalappx/";


function getData(q,type,f,dSuccess,dError) {
	 
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				 dSuccess(req.responseText);
								
			} catch (e) {
				dError(req.responseText);
				console.log("Exception::-"+e.toString());
			}
		}
	};
	if(type==0){
		req.open("GET", base_url + "/"+f+"?" +  q, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send();
	}else{
		req.open("POST", base_url + "/" + f, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(sql);
	}
}
function getDropDownData(ddId,q) {
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//alert(req.responseText);
				var dataArray=JSON.parse(req.responseText);
				updateDD(dataArray,ddId);
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
		
	req.open("GET", base_url + "/dataTbl.php?" + sql, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
	
}
function updateDD(data,ddId){
	//Do DOM updates here
	
	
	var ddElement=document.getElementById(ddId);
	var ddData="";
	var flag =0;
	// This query requires atleaset 2 params, if 3 params are there store it in dummy attribute.
	// Thsi third param may be used later.
		if(data[0][Object.keys(data[0])[2]]!=null)
			flag=1;
			
	for (var i = 0; i < data.length; i++) {
		//alert(data[i][Object.keys(data[i])[0]]);
		if(flag)
			ddData +="<option id='"+data[i][Object.keys(data[i])[0]]+"' value='"+data[i][Object.keys(data[i])[0]]+"' due='"+data[i][Object.keys(data[i])[2]]+"' rcvd='"+data[i][Object.keys(data[i])[3]]+"'>" + data[i][Object.keys(data[i])[1]] + "</option>";
		else		
			ddData +="<option id='"+data[i][Object.keys(data[i])[0]]+"' value='"+data[i][Object.keys(data[i])[0]]+"'>" + data[i][Object.keys(data[i])[1]] + "</option>";
	}
	
	ddElement.innerHTML=ddData;
	_ddCallBack();
}

function loadExamination(){
	var obj = JSON.parse(exm);
	var txt = "";
	for (var key in obj){
		if(obj[key]==1)
			txt += "<option style='font-weight: bold;'>"+ key +"</option>";
		else
			txt += "<option style='marging-left:10px;'>"+ key +"</option>";
		}
	document.getElementById("examination").innerHTML = txt;  
}

function displayBasicInfo(){
	var details = JSON.parse(myJSON);
	document.getElementById("name").innerHTML = details["title"] + " " + details["name"];
	document.getElementById("mobile").innerHTML = details["mobile"];
	document.getElementById("age").innerHTML = details["age"];
	if(details["gender"] == "m")
		document.getElementById("gender").innerHTML = '<label class="gender" style="float: left;padding-right:5px;padding-left:5px;"><i class="fa fa-male" style="font-size:24px;color:#1DC7EA;"></i></label>';
	else
		document.getElementById("gender").innerHTML = '<label class="gender" style="float: left;padding-right:5px;padding-left:5px;"><i class="fa fa-female" style="font-size:24px;color:#F7A7C8;"></i></label>';
			
	document.getElementById("address").innerHTML = details["addr"];	
}

function examination(n){
		localStorage.isDirty=1;
			if(n==1){
				document.getElementById("part1").style.display = "none";
				document.getElementById("part2").style.display="block";
				document.getElementById("f1").style.display="none";
				document.getElementById("f2").style.display="block";
				//document.getElementById("f3").style.display="none";
			}
			else if(n==2){//go back to examination
				document.getElementById("part2").style.display="none";
				document.getElementById("part1").style.display="block";
				document.getElementById("f2").style.display="none";
				document.getElementById("f1").style.display="block";
				document.getElementById("f3").style.display="none";
			}
			else if(n==3){//go to treatement
				document.getElementById("part2").style.display="none";
				document.getElementById("part3").style.display="block";
				document.getElementById("f2").style.display="none";
				document.getElementById("f3").style.display="block";
				
			}
			
			else if(n==5){//go to Prescription
				document.getElementById("part3").style.display="none";
				document.getElementById("part4").style.display="block";
				document.getElementById("f3").style.display="none";
				document.getElementById("f4").style.display="block";
				
			}
			else if(n==6){//go to Review
				document.getElementById("part4").style.display="none";
				document.getElementById("part5").style.display="block";
				document.getElementById("f4").style.display="none";
				document.getElementById("f5").style.display="block";
				
			}
			
		}
	  	
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 

 function login(uname,pwd){
	 var sql = "uname=" + uname + "&pwd=" + pwd;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try{
				//alert(req.responseText);
				data = req.responseText;
				if(!data)
					document.getElementById("footer").innerHTML = "Username or Password not correct.<br> Please try again.";
				else if(data=='admin')
					window.location.href="index.html";
				else
					window.location.href="searchresult.html";
			}catch (e) {
					document.getElementById("footer").className = "bg-danger";
					document.getElementById("footer").innerHTML = "Username/Password not correct. Please try again.";
					console.log("Exception::-"+e.toString());
			}
		}
	};
	
	//var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/verifyUser.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(sql);
	
 }

function sendSMS(mobile,msg){
	var param = "mobile="+ mobile + "&msg=" + msg;
	//alert(param);
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//document.getElementById('cn_'+mobile).innerHTML = 'Done';
				smsCallback(req.responseText);
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	//var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/sms.php?" + param, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
}
function selectF(){
	document.getElementById("male").classList.remove("selectedM");
	document.getElementById("female").classList.add("selectedF");
	gender = "f";
}
function selectM(){
	document.getElementById("female").classList.remove("selectedF");
	document.getElementById("male").classList.add("selectedM");
	gender = "m";
}
function loadCaseHistory(q){
	
	getData(q,0,"getCase.php",successLCH,errLCH);
}
function successLCH(data){
	try {	
		var d = JSON.parse(jsonEscape(data));
	    var exm = {"exm" : "","udate" : ""};
		
		//if(d["exm"][0])
		exm = d["exm"][0];
		
		var t = JSON.parse(jsonEscape(exm["exm"]));
		var ta = t["teeth"];//array of teeth :)
	
		// Deep copy of ta--> teeth
		// Teeth
		for (i = 0; i < ta.length; i++) {
			var th = document.getElementById(ta[i]);
			th.classList.add("slotselected");
			teeth.push(ta[i]);
		
		}
		// Examination & Note
		setSelectedIndex("examination",t["details"]);	
		document.getElementById("enote").value = t["note"];
		for(i=1;i< d["exm"].length; i++){
			document.getElementById("exm_history").innerHTML += "<p class='valtext'>Examination history on " + formatDate(d["exm"][i]["udate"]) + "</p>";
		
		}	
	} catch (e) {console.log("Exception::-"+e.toString());}
	
	
	// Fetch Treatement details
	
	var tmt = {"tmt":"[]","udate":""};
	var med = {"med": "[]"};
	try {
		if(d["tmt"][0])	
			tmt = d["tmt"][0];
		
		t = JSON.parse(tmt["tmt"]);
	
		fillTMT(t);
	   
		// Fetch Med details
		if(d["med"][0])
			med = d["med"][0];
			
		t = JSON.parse(med["med"]);
		fillMED(t);
	
		// create a JSON, it will be compared to casedetails
		var fetchDetails = {};
		fetchDetails["exm"] = jsonEscape(exm["exm"]); // Handel multiline with jsonEscape
		fetchDetails["tmt"] = tmt["tmt"];
		fetchDetails["med"] = med["med"];
		localStorage.fetchDetails = JSON.stringify(fetchDetails);
		viewSummary(fetchDetails);
	
	} catch (e) {
		console.log("Exception::-"+e.toString());
		document.getElementById("part5").style.display= "none";
		document.getElementById("part1").style.display= "block";
		}
}
function viewSummary(f){
	try{
		document.getElementById("f1").style.display= "none";
		document.getElementById("part5").style.display= "block";
		var e = JSON.parse(jsonEscape(f["exm"])); // jsonEscape to handel new line
		var t = JSON.parse(f["tmt"]);
		var m = JSON.parse(f["med"]);
		
		document.getElementById("r1").innerHTML = e["details"];
		document.getElementById("r2").innerHTML = e["teeth"].toString();
		document.getElementById("r3").innerHTML = e["note"];
		
		// fill treatement
		var txt = '';
		for (i = 0; i < t.length; i++) {
			txt += "<div class='row'><div class='col-xs-9'>" + t[i][0] + "</div><div class='col-xs-3'>" + t[i][1] + "</div></div>";
		}
		document.getElementById("r4").innerHTML = txt;
		
		// fill medecine
		txt = '';
		for (i = 0; i < m.length; i++) {
			txt += "<div class='row'><div class='col-xs-6'>" + m[i][0] + "</div><div class='col-xs-4'>" + m[i][1] + "</div><div class='col-xs-2'>" + m[i][2] + "</div></div>";
		}
		
		document.getElementById("r5").innerHTML = txt;
		
	} catch (e) {
		console.log("Exception::-"+e.toString());
	}
}
function fillTMT(t){

	//var total =0 ;
	for(var i=0; i < t.length; i++){
		var d = t[i];
		if(d[0] != "Total"){
			if(d[0].trim().length>0)
				document.getElementById("xx").innerHTML += "<li style='color: darkslateblue;' onclick='showDiscountTB("+mid+");'><span name='tname'>" + d[0] + "</span><span id='prid_"+mid+"' contenteditable=true style='width:50px' class='pull-right'>"+ d[1] +"</span></li>";
			else // for deleted treatements make display=none
				document.getElementById("xx").innerHTML += "<li style='color: darkslateblue;display:none;' onclick='showDiscountTB("+mid+");'><span name='tname'>" + d[0] + "</span><span id='prid_"+mid+"' contenteditable=true style='width:50px' class='pull-right'>"+ d[1] +"</span></li>";
		document.getElementById("seltreat").value = "";
	
		}
		
		mid++;
	
	}
	if(t.length >0){ // if treatement is empty
		document.getElementById("total").innerHTML = t[t.length-1][1];
		total = t[t.length-1][1];
	}
}
function fillMED(t){
	var mid = 1;
	for(var i=0; i < t.length; i++){
		var d = t[i];
		
		document.getElementById("yy").innerHTML += "<div class='row'  style='height:30px;'><div class='col-xs-6 med' id='med_"+mid+"' onclick='selectMed("+mid+");' contenteditable=true>" + d[0] + "</div><div class='col-xs-3'  onclick='selectFrequency("+mid+");' style='height:100%;'><p class='valtext' id='fid_"+mid+"'  style='font-size:10px;font-style: italic;'>"+d[1]+"</p></div><div class='col-xs-3' onclick='selectTenure("+mid+");'><p class='valtext' style='font-size:10px;font-style: italic;' id='tid_"+mid+"' >"+d[2]+"</p></div>" +"</li>";			
		mid++;
	}
	
}
	
function errLCH(){}
function setSelectedIndex(s, v) {
	s = document.getElementById(s);
	
    for ( var i = 0; i < s.options.length; i++ ) {
        if ( s.options[i].value == v ) {
            s.options[i].selected = true;
            return;
        }
    }
}
function editprofile1(){
	var pid = getParameterByName("pid");
	if(localStorage.isDirty ==1)
		document.getElementById("forsave").style.display = "block";
	else
		window.location.href = 'add.html?pid='+pid;
}	

function editProfile(pid){
	getData("q=SELECT * from d_patient_tbl where did='"+localStorage.did+"' and pid='"+pid + "' ;",0,"dataTbl.php",fillProfile,errLCH);
}
function fillProfile(data){
	var d = JSON.parse(data);
	document.getElementById("cname").value = d[0]["pname"];
	document.getElementById("mobile").value = d[0]["cn1"];
	document.getElementById("age").value = d[0]["age"];
	if( d[0]["gender"] == "m")
		selectM();
	else
		selectF();
}
var tmpcid=0 // store cid tem for billing
function getBilling(pid,did,cid){
	tmpcid = cid;
	getData("q=SELECT tmt,udate,pid,did FROM d_tmt_tbl where pid='"+pid+"' and did='"+did+"' and cid="+cid+" order by cid desc,udate desc ;",0,"dataTbl.php",showBilling,errBill);
	
}
var total = 0;
function showBilling(data){
	var d = JSON.parse(data);
	var details = JSON.parse(d[0]["tmt"]); // Take the last billing
	var pid = d[0]["pid"];
	var did = d[0]["did"];
	var txt = "";
	for(var i=0; i < details.length-1;i++){
		txt += "<div class='valtext'>" + details[i][0] + "</div>";
	}
	document.getElementById("billing").innerHTML += txt;
	document.getElementById("btotal").innerHTML = details[details.length-1][0] + " : " + details[details.length-1][1] ;
	
	document.getElementById("bdefault").style.display="none";
	document.getElementById("bdetails").style.display="block";
	
	// Iterate through all billings and sum all receivables
	
	for(var i=0; i < d.length;i++){
		details = JSON.parse(d[i]["tmt"]);
		
		try{
			// there could be empty billing
			var b = parseInt(details[details.length-1][1]);
			if(isNaN(b))
				b =0;
			total = parseInt(total) + b;
			}
		catch(err) {}
		
	}
		
	getTrans(pid,did);	
}
function errBill(){}
function getTrans(pid,did){
	getData("q=SELECT cid,udate, amount,rem,flg FROM d_account_tbl where pid='"+pid+"' and did='"+did+"' group by id  order by udate desc ;",0,"dataTbl.php",showTrans,errBill);
}
function showTrans(data){
	// for no transactions handle excelption
	var d = [];
	try{
		d =JSON.parse(data);
	}catch (e){}
	
	var txt = "";
	var rcvd = 0;
	var waiver =0;
	for(var i=0; i < d.length;i++){
		if(d[i]["flg"] == 1)
			waiver = parseInt(waiver) + parseInt(d[i]["rem"]);
		
		txt += '<div class="row trbody"><span class="trans">' + formatDate(d[i]["udate"]) + '</span><span class="pull-right" style="padding-right:15px;"><i class="fa fa-rupee " ></i>' + d[i]["amount"] + "</span></div>";
		
		if(d[i]["cid"] == tmpcid)
		{ // calculate received only if it is in given/last case
			rcvd =  parseInt(rcvd) + parseInt(d[i]["amount"]);
			
		}	
	}
	document.getElementById("tdetails").innerHTML = txt;
	document.getElementById("tdefault").style.display="none";
	document.getElementById("tdetails").style.display="block";
	
	var ctotal = document.getElementById("btotal").innerHTML; //total due for last case
	ctotal = ctotal.split(":")[1];
	ctotal = ctotal.trim();
	if(ctotal)
		ctotal = parseInt(ctotal);
	else
		ctotal = 0;
	
	document.getElementById("rcvd").innerHTML = "Received: " + rcvd;
	document.getElementById("bal").innerHTML = "Balance: " + (ctotal - rcvd - waiver);
	document.getElementById("bwaiver").innerHTML = "Waiver: " + waiver;
	
	if( (ctotal - rcvd - waiver)>= 0){
		document.getElementById("topay").value = (ctotal - rcvd - waiver);
		document.getElementById("topay_h").value = (ctotal - rcvd - waiver);
	}	
	
}
function viewcases(){
	   var pid = getParameterByName("pid");
	   if(localStorage.isDirty ==1)
			document.getElementById("forsave").style.display = "block";
		else
			window.location.href = 'history.html?pid='+pid;
	}
function gotoschedule(){
	var pid = getParameterByName("pid");
	window.location.href = 'appointment.html?pid='+pid;
}	
function formatDate(dt){
	try{
		var dateObj = new Date(dt);
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();

		newdate =  getM(month) + " " + day + ", " + year;
		return newdate;
	} catch(e){return dt;}
}

function getM(m){
 if(m > 12)
	m =  m- 12;
 if(m==1)
 	return "Jan";
 else if(m==2)
    return "Feb";
 else if(m==3)
    return "Mar"; 
 else if(m==4)
    return "Apr";  
 else if(m==5)
    return "May"; 
 else if(m==6)
    return "Jun";   
 else if(m==7)
    return "Jul"; 
 else if(m==8)
    return "Aug";  
 else if(m==9)
    return "Sep";  
 else if(m==10)
    return "Oct"; 
 else if(m==11)
    return "Nov";
 else if(m==12)
    return "Dec";     

}
function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}
function jsonEscape(str)  {
    var str=str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
	return str;

}
function callapp(n){
	document.location.href = 'tel:+91'+ $(n).text();
}