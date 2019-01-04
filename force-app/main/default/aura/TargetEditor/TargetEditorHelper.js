/**
 * Created by bbeli001 on 17.05.2018.
 */
({
    getFieldsNames : function (component, event, isNew){
        var action = component.get("c.getPickListFieldsIntoList");
        action.setParams({ ObjectApiName: component.find('Object_API_Name__c').get("v.value")});
              action.setCallback(this, function(response) {
                  var list = response.getReturnValue();
                  var pickedValue;
                  if(isNew === false){
                    var record = component.get("v.SimpleTargetRecord");
                    list.shift();
                    list.unshift(record.Field_API_Name__c);
                    component.set("v.fieldsNamesValues", list);
                  }else{
                    component.set("v.fieldsNamesValues", list);
                  }
              })
              $A.enqueueAction(action);
    },

    getDatesFields : function (component, event, isNew){
            var action = component.get("c.getPickListDatesIntoList");
            action.setParams({ ObjectApiName: component.find('Object_API_Name__c').get("v.value")});
                  action.setCallback(this, function(response) {
                      var list = response.getReturnValue();
                      if(isNew === false){
                          var record = component.get("v.SimpleTargetRecord");
                          list.shift();
                          list.unshift(record.Date_Field_API_Name__c);
                          component.set("v.dateFieldsValues", list);
                        }else{
                          component.set("v.dateFieldsValues", list);
                        }
                      })
                  $A.enqueueAction(action);
    },

    getObjectsNames : function (component, event){
      var action = component.get("c.getPickListObjectsIntoList");

            action.setCallback(this, function(response) {
                var list = response.getReturnValue();
                var record = component.get("v.SimpleTargetRecord");
                list.shift();
                list.unshift(record.Object_API_Name__c);
                component.set("v.objectsNamesValues", list);
            })
            $A.enqueueAction(action);
    },

    getInfo : function (component, event){
        console.log('simple: ' + JSON.stringify(component.get("v.SimpleTargetRecord")));
        console.log('record: ' + JSON.stringify(component.get("v.TargetRecord")));
        console.log(component.find("Object_API_Name__c").get("v.value"));
    }
})