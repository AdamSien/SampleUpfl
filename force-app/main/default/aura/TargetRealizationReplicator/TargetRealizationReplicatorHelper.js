({
    saveNewRecord : function(component, event){
        //map all clone fields
                               component.set("v.SimpleRecordSave.Start_Date__c",  component.find("StartDate").get("v.value"));
                               component.set("v.SimpleRecordSave.End_Date__c",  component.find("EndDate").get("v.value"));

                               component.set("v.SimpleRecordSave.Value_Distribution_Type__c", component.get("v.SimpleRecordLoad.Value_Distribution_Type__c"));
                               component.set("v.SimpleRecordSave.Value__c", component.get("v.SimpleRecordLoad.Value__c"));
                               component.set("v.SimpleRecordSave.Target__c", component.get("v.SimpleRecordLoad.Target__c"));
        component.find("RecordReplicatorSave").saveRecord(function(saveResult) {
//                          alert("I'M INSIDE!");
                          console.log("SIMPLE LOAD: " + JSON.stringify(component.get("v.SimpleRecordLoad")));
                          console.log("RECORD LOAD: " + JSON.stringify(component.get("v.RecordLoad")));
                          console.log("SIMPLE SAVE: " + JSON.stringify(component.get("v.SimpleRecordSave")));
                          if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                              // record is saved successfully
                              alert("SUCCESS!");
                              var resultsToast = $A.get("e.force:showToast");
                              resultsToast.setParams({
                                  "title": "Saved",
                                  "message": "The record was saved."
                              });
                              resultsToast.fire();
                              var recId = saveResult.recordId;
                                 var navEvt = $A.get("e.force:navigateToSObject");
                                     navEvt.setParams({
                                       "recordId": recId,
                                       "slideDevName": "related"
                                     });
                                     navEvt.fire();
                          } else {
                              alert("FAILED!");
                              console.log(JSON.stringify(saveResult.error));
                          }
                       });
    }
})