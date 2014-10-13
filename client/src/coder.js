window.onload = function(){
  //Use this to test
  var testControls = [
                  {'groupId':"Affirm Deny", 'inputType': "radio", 'controlNames':["Affirm","Deny","Unrelated"] },
                  {'groupId':"Aux.", 'inputType': "checkbox", 'controlNames':["Uncertain","Implicit","Unclear"] },
                  {'groupId':"Misc!", 'inputType': "checkbox", 'controlNames':["Green Eggs","Ham","Sam", "I Am"] }
                  ];

  var testData = ["Sam","I am.", "I am Sam.", "Mmm, coffee.", "Foxes are spry.", "Foo!"];

  window.dataCoder = new DataCoder("data_container", "control_form");
  window.dataCoder.populate_controls(testControls);
  window.controlManager = new ControlManager();
  document.body.onkeydown = window.controlManager.handlePress.bind(window.controlManager);

  window.dataCoder.importData(testData);

};

//Handles the user input and non-standard interaction with the controls.
function ControlManager(){
  this.controlRow1 = [49, 50, 51, 52];
  this.controlRow2 = [81, 87, 69, 82];

  this.radio = function(){
    console.log("Foo!");
  };

  this.bar = function(){
    console.log("Bar!");
  };


  this.handlePress = function(e){
    var key = e.keyCode || e.which;
    var val = this.mappings[key];
    if(val){
      console.log("Found!");
      this.mappings[key].call();
    }else{
      console.log(val);
      console.log(key+" was not found.");
    }
  }

  this.keyTest = function(e){

    var key = e.keyCode || e.which;

    if(this.controlRow1.indexOf(key) != -1 || this.controlRow2.indexOf(key) != -1){
      console.log("You pressed: "+String.fromCharCode(key));
      }
  };

  //This needs to be below all functions.
  this.mappings = { 49: this.foo,
                    50: this.bar
                    };


}

//dataId is the DOM id of the div to display that data to be coded.
//controlId is the DOM id of the form which will contain the controls.
function DataCoder(dataId, controlId){
  this.dataContainer = document.getElementById(dataId);
  this.controlContainer = document.getElementById(controlId);
  //This will hold the data and its codes.
  this.dataItems = [];

  //Adds controls to the controlContainer form in groups.
  //Each group will
  //controlGroups is a list of objects representing groups of controls.
  //Format: { 'groupId': "Name of the category of controls",
  //          'inputType':(The input type: "radio" or "checkbox"),
  //          'controlNames': ["control1", "control2",...]
  //        };
  //
  this.populate_controls = function(controlGroups){
    
    //Store the coding scheme.
    this.codeScheme = controlGroups;

    for(var g = 0; g < controlGroups.length; g++){
      var curGroup = controlGroups[g];


      //Create DOM Elements
      var groupFieldset = document.createElement("FIELDSET");
      var legend = document.createElement("LEGEND");

      groupFieldset.id = curGroup.groupId.replace(/[^a-zA-Z ]/g, "").replace(" ","_") + "_fieldset";
      legend.innerHTML = curGroup.groupId;
      groupFieldset.appendChild(legend);


      //Populate the group DIV with controls.
      for(var c = 0; c < curGroup.controlNames.length; c++){
        //Create new DOM elements.
        var curInput = document.createElement("INPUT");
        var curLabel = document.createElement("LABEL");

        //Assign Attributes
        curInput.id = curGroup.controlNames[c].replace(/[^a-zA-Z ]/g, "").replace(" ","_") + "_input";
        curInput.value = curGroup.controlNames[c].replace(/[^a-zA-Z ]/g, "").replace(" ","_");

        //Make all of the options have the same DOM-name if they are radio buttons.
        if(curGroup.inputType == "radio"){
          curInput.name = curGroup.id +"_input";
        //Otherwise, make the DOM-name the same as the ID.
        }else{
          curInput.name = curInput.id;
        }

        curInput.type = curGroup.inputType;
        curLabel.innerHTML = curGroup.controlNames[c];
        curLabel.setAttribute("for", curInput.id);

        //Append to Div
        curLabel.appendChild(curInput);
        groupFieldset.appendChild(curLabel);
      }

      //Add to the DOM.
      this.controlContainer.appendChild(groupFieldset);
    }

  };

  this.importData = function(inputData){
    for(var i =0; i < inputData.length; i++){
      this.dataItems.push(new DataEntry(this.codeScheme, inputData[i]));
    }
  };

}

//A data entry for the given code scheme.
//Contains the provided item data.
function DataEntry(codeScheme, itemData){
  this.itemData = itemData;
  this.groups = {};

  for(var controlGroup in codeScheme){
    this.groups[controlGroup] = {};
    var curGroup = codeScheme[controlGroup];
    for(var c in curGroup["controlNames"]){
      var cName = curGroup["controlNames"][c];
        if(curGroup["inputType"] == "radio" || curGroup["inputType"] == "checkbox"){
          this.groups[controlGroup][cName] = false;
        }else{
          //////////////////////////////Add non-boolean support here.
        }
    }
  }
}



