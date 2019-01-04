/**
 * Created by bbeli001 on 17.05.2018.
 */
({
    doInit : function(component, event, helper){

      var action = component.get("c.getPickListObjectsIntoList");

      action.setCallback(this, function(response) {
          var list = response.getReturnValue();
          component.set("v.objectsNamesValues", list);
      })
      $A.enqueueAction(action);
    },

    getPicklists : function(component, event, helper){
        var isNew = true;
        helper.getFieldsNames(component, event, isNew);
        helper.getDatesFields(component, event, isNew);
    },

    cancelDialog : function(component, helper) {

        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
            "scope": "Target__c"
        });
        homeEvt.fire();
    },

   saveRecord : function(component, event, helper) {
       var field_api_name = component.find("Field_API_Name__c").get("v.value");
       var description = component.find("Description__c").get("v.value");
       var object_api_name = component.find("Object_API_Name__c").get("v.value");
       var isActive = component.find("is_Active__c").get("v.value");
       var targetType = component.find("Target_Type__c").get("v.value");
       var name = component.find("targetName").get("v.value");
       var date_field_api_name = component.find("Date_Field_API_Name__c").get("v.value");

       console.log('field: ' + field_api_name);
       console.log('desc: ' + description);
       console.log('object: ' + object_api_name);
       console.log('isActive: ' + isActive);
       console.log('type: ' + targetType);
       console.log('targetName: ' + name);
       console.log('date: ' + date_field_api_name);

       var record = component.get("{!v.TargetRecord}");
       component.find("TargetRecordEditor").saveRecord(function(saveResult) {

           var resultsToast = $A.get("e.force:showToast");

                   if( ( field_api_name === null     || field_api_name === ""      || field_api_name === "Select Field API Name")   ||
                       (description === null         || description === "")                                                         ||
                       (object_api_name === null     || object_api_name === "")                                                     ||
                       (isActive === null            || isActive === "")                                                            ||
                       (targetType === null          || targetType === ""          || targetType === "Select Target Type")          ||
                       (name === null                || name === "" )                                                               ||
                       (date_field_api_name === null || date_field_api_name === "" || date_field_api_name === "Select Date Field API Name")) {
                       resultsToast.setParams({
                           "title": "Error",
                           "message": "Please fill all the required fields"
                       });
                       resultsToast.fire();
                       }else if(saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                        // record is saved successfully
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
                       } else if (saveResult.state === "INCOMPLETE") {
                           // handle the incomplete state
                           resultsToast.setParams({
                              "title": "Incomplete",
                              "message": "User is offline, device doesn't support drafts."
                          });
                          resultsToast.fire();

                       } else if (saveResult.state === "ERROR") {
                           // handle the incomplete state
                          resultsToast.setParams({
                             "title": "Error",
                             "message": "Problem saving record."
                         });
                         resultsToast.fire();
                           // handle the error state
                         console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                       } else {
                           console.log('Unknown problem, state: ' + saveResult.state +
                                       ', error: ' + JSON.stringify(saveResult.error));
                       }
                   });
   },

  recordUpdated: function(component, event, helper) {

       var resultsToast = $A.get("e.force:showToast");
       var changeType = event.getParams().changeType;

       if (changeType === "ERROR") {
           resultsToast.setParams({
              "title": "Error",
              "message": "Problem saving record."
           });
          resultsToast.fire();
          // handle the error state
          console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
      }else if (changeType === "CHANGED") {
        resultsToast.setParams({
                "title": "Changed!",
                "message": "Record succesfully changed."
        });
      }else if(changeType === "LOADED") {
        var isNew = false;
        helper.getFieldsNames(component, event, isNew);
        helper.getDatesFields(component, event, isNew);
        helper.getInfo(component, event);
      }
  }
})