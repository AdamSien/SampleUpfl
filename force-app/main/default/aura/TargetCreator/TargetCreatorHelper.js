/**
 * Created by bbeli001 on 17.05.2018.
 */
({
    getFieldsNames : function (component, event){
        var action = component.get("c.getPickListFieldsIntoList");
        action.setParams({ ObjectApiName: component.find('Object_API_Name__c').get("v.value")});
              action.setCallback(this, function(response) {
                  var list = response.getReturnValue();
                  component.set("v.fieldsNamesValues", list);
              })
              $A.enqueueAction(action);
    },

    getDatesFields : function (component, event){
            var action = component.get("c.getPickListDatesIntoList");
            action.setParams({ ObjectApiName: component.find('Object_API_Name__c').get("v.value")});
                  action.setCallback(this, function(response) {
                      var list = response.getReturnValue();
                      component.set("v.dateFieldsValues", list);
                  })
                  $A.enqueueAction(action);
    }
})