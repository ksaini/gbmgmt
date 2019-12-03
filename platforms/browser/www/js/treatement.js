
function autocomplete(inp, arr,splt) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
	  
	  inp.setAttribute("price",0);
	  
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          
          /*insert a input field that will hold the current array item's value:*/
		  if(splt==1){
			 b.innerHTML += arr[i].substr(val.length).split(":")[0]; 
			 b.innerHTML += "<input type='hidden' price="+arr[i].split(":")[1]+" value='" + arr[i].split(":")[0] + "'>";
		  }
		  else{
			  b.innerHTML += arr[i].substr(val.length).split(":")[0];
			  b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";	
		  }  
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
			  inp.value = this.getElementsByTagName("input")[0].value;
			  if(splt==1){
				inp.setAttribute("price",this.getElementsByTagName("input")[0].getAttribute("price"));
			  }
			 
				  
			  //alert(inp.getAttribute("price"));
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
   inp.addEventListener("click", function(e) {	  
	if(splt==0)// disable prescription specific toolbars
	  {
		  document.getElementById("toolbar2").style.display = "none";
		  document.getElementById("toolbar3").style.display = "none";
		  document.getElementById("toolbar4").style.display = "none";
	  }
   });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
	
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the treatement names in the world:*/
//var treatements = ["Advance Surgical Procedure:350","Consultation:200","Crown Cementation:200","Crown MLS:220","Crown Sirconia::290","Crown Zirconia:300","Crowns:590","Dental Implant:1900","Dentures:1200","Fillings:600","Fluoride Treatment:700","Bridge:330"];

//var medicines = ["Cappol 350mg","Cappol 250mg","Dolo 500mg","Dolo -S 500mg","Dolo 600mg","Glycodine 100ug - S","Medicine x1 200","Acypser 300 DX","Acypser 300 SX"];

/*initiate the autocomplete function on the "myInput" element, and pass along the treatements array as possible autocomplete values:*/
//autocomplete(document.getElementById("seltreat"), treatements,1);
//autocomplete(document.getElementById("selmed"), medicines,0);
