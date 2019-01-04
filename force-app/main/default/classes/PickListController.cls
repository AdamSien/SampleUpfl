public with sharing class PickListController {
    @AuraEnabled
    public static List<String> getPickListObjectsIntoList(){
        String defaultString = 'Select Object API Name';
        List<String> result = new List<String>();
        Map<String, SObjectType> pickListObjectsList = Schema.getGlobalDescribe();

        for (SObjectType objectType : pickListObjectsList.values()) {
            String s = String.valueOf(objectType);
            result.add(s);
        }
        result.sort();
        result.add(0, defaultString);
        return result;
    }

    @AuraEnabled
    public static List<String> getPickListFieldsIntoList(String ObjectApiName){
        String defaultString = 'Select Field API Name';
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType ObjectSchema = schemaMap.get(ObjectApiName);
        Map<String, Schema.SObjectField> fieldMap = ObjectSchema.getDescribe().fields.getMap();
        List<String> result = new List<String>();
        for (SObjectField fieldName: fieldMap.values())
        {
            String s = String.valueOf(fieldName);
            result.add(s);
        }
        result.sort();
        result.add(0, defaultString);
        return result;
    }

    @AuraEnabled
    public static List<String> getPickListDatesIntoList(String ObjectApiName){
        String defaultString = 'Select Date Field API Name';
        List<String> result = new List<String>();
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType ObjectSchema = schemaMap.get(ObjectApiName);
        Map<String, Schema.SObjectField> fieldMap = ObjectSchema.getDescribe().fields.getMap();
        for (SObjectField fieldName: fieldMap.values())
        {
            String s = String.valueOf(fieldName.getDescribe().getType());
            if (s.equals('DATE') || s.equals('DATETIME')) {
                String field = String.valueOf(fieldName);
                result.add(field);
            }
        }
        result.sort();
        result.add(0, defaultString);
        return result;
    }
}