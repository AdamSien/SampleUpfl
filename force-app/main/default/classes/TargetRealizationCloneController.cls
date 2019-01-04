/**
 * Created by bbeli001 on 21.05.2018.
 */

public with sharing class TargetRealizationCloneController {

    @AuraEnabled
    public static List<String> getModifiedRecordValues(String recordId){
        Target_Realization__c record = [SELECT Start_Date__c, End_Date__c, Value_Distribution_Type__c, Value__c, Target__c FROM Target_Realization__c WHERE Id = :recordId LIMIT 1];

        Integer timeSpan = record.Start_Date__c.daysBetween(record.End_Date__c);

        record.Start_Date__c = Date.valueOf(record.End_Date__c);
        record.End_Date__c = record.End_Date__c.addDays(timeSpan);

        List<String> result = new List<String>();
        result.add(String.valueOf(record.Start_Date__c));
        result.add(String.valueOf(record.End_Date__c));
        return result;
    }
}