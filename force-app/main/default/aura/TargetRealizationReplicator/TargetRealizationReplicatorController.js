({
    saveAndCreateRecord : function(component, event, helper) {
        helper.saveNewRecord(component,event);
    },

  cancelDialog : function(component, event, helper){
      var exitEvent =$A.get("e.force:closeQuickAction");
      exitEvent.fire();
  },

  recordUpdated : function(component, event, helper){
      var changeType = event.getParams().changeType;

      if (changeType === "ERROR") { /* handle error; do this first! */ }
      else if (changeType === "LOADED") {
      var action = component.get("c.getModifiedRecordValues");
      action.setParams({"recordId": component.get("v.recordId")});
            action.setCallback(this, function(response) {
                var list = response.getReturnValue();
                component.set("v.SimpleRecordLoad.Start_Date__c", list[0]);
                component.set("v.SimpleRecordLoad.End_Date__c", list[1]);
            })
            $A.enqueueAction(action);

            // Prepare a new record from template
           component.find("RecordReplicatorSave").getNewRecord(
               "Target_Realization__c", // sObject type (objectApiName)
               null,      // recordTypeId
               false,     // skip cache?
               $A.getCallback(function() {
                   var rec = component.get("v.RecordSave");
                   var error = component.get("v. recordError");
                   if(error || (rec === null)) {
                       console.log("Error initializing record template: " + error);
                       return;
                   }
                   console.log("Record template initialized: " + rec);
               })
           );
      }
      else if (changeType === "REMOVED") { /* handle record removal */ }
      else if (changeType === "CHANGED") {
        component.find("forceRecord").reloadRecord();
      }
  }
})