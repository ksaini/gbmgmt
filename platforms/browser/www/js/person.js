function Person(title,name,mobile,age,addr,gender,email,p) {
	this.title = title;
	this.name = name;
	this.mobile = mobile;
	this.age = age || 0;
	this.addr = addr || '';
	this.gender = gender;
	this.email = email || '';
	this.isavtive =1;
	this.createdt = new Date();
	this.lastupdatedt = new Date();
	this.p = p; //pid
	this.did = localStorage.did;
				
	this.getInfo = function () {
		var basicInfo = '{"title" : "'+ this.title +'", "name" : "'+ this.name +'", "mobile" : "'+ this.mobile +'", "age" : "' + this.age +'" , "addr":"'+ this.addr +'", "gender":"'+ this.gender +'", "email":"'+ this.email +'", "p":"'+ this.p +'" , "did":"'+ this.did +'" }';
		return basicInfo;
	};
	this.saveRecord = function () {
			localStorage.removeItem('basicInfo');
			localStorage.basicInfo = this.getInfo();
			getData(localStorage.basicInfo,1,"savePatient.php",onSuccessP,onErrorP);
			//onSuccessP(137);
	};	
	
}
function onErrorP(){}
function Exmn(cid,teeth,details,note){
	this.id = cid;
	this.teeth = teeth || [];
	this.details = details|| '';
	this.note = note|| '';
	this.lastupdateddt = new Date();
	
	this.getInfo = function (cid) {
		var exmInfo = '{ "id" : "'+cid+'", "teeth":"'+ this.teeth +'", "details":"'+ this.details +'", "note":"'+ this.note+'" ';
		return exmInfo;
	};
	
	
	
	this.setInfo = function (cid){
		getData("SELECT * from d_exm_tbl where cid="+cid + " and did=" + localStorage.did, exmFillInfo);
		
	};
	this.save = function (){
		localStorage.removeItem('exmInfo');
		localStorage.exmInfo = this.getInfo();
		onSuccessE(1000);
	}
}