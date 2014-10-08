window.onload = function(){

//Use this to test
var testControls = [
                {'groupId':"Affirm Deny", 'inputType': "radio", 'controlNames':["Affirm","Deny","Unrelated"] },
                {'groupId':"Aux.", 'inputType': "checkbox", 'controlNames':["Uncertain","Implicit","Unclear"] },
                {'groupId':"Misc!", 'inputType': "checkbox", 'controlNames':["Green Eggs","Ham","Sam", "I Am"] }
                ];

window.dataCoder = new dataCoder("data_container", "control_form");
window.dataCoder.populate_controls(testControls);
};


//dataId is the DOM id of the div to display that data to be coded.
//controlId is the DOM id of the form which will contain the controls.
function dataCoder(dataId, controlId){
  this.dataContainer = document.getElementById(dataId);
  this.controlContainer = document.getElementById(controlId);



  //Adds controls to the controlContainer form in groups.
  //Each group will
  //controlGroups is a list of objects representing groups of controls.
  //Format: { 'groupId': "Name of the category of controls",
  //          'inputType':(The input type: "radio" or "checkbox"),
  //          'controlNames': ["control1", "control2",...]
  //        };
  //
  this.populate_controls = function(controlGroups){

    for(var g = 0; g < controlGroups.length; g++){
      var curGroup = controlGroups[g];
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

}
