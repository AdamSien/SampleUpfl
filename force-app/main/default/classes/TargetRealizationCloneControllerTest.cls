/**
 * Created by bbeli001 on 21.05.2018.
 */

@IsTest
private class TargetRealizationCloneControllerTest {
    @IsTest
    static void testBehavior() {
        Target__c target = new Target__c(
                is_Active__c = true,
                Target_Type__c = 'Count',
                Date_Field_API_Name__c = 'CreatedDate',
                Object_API_Name__c = 'Opportunity',
                Field_API_Name__c = 'Amount',
                Description__c = 'Something',
                Name = 'TargetName');

        insert target;

        Target_Realization__c targetRealization = new Target_Realization__c(Start_Date__c = System.today(),
                End_Date__c = System.today().addDays(7),
                Value__c = 3,
                Value_Distribution_Type__c = 'Individual',
                Target__c = target.Id);
        insert targetRealization;
        List<String> result = TargetRealizationCloneController.getModifiedRecordValues(targetRealization.Id);
        Integer timeSpan = targetRealization.Start_Date__c.daysBetween(targetRealization.End_Date__c);

        System.assert(!result.isEmpty());
        System.assertEquals(result.get(0), String.valueOf(targetRealization.Start_Date__c.addDays(timeSpan)));
        System.assertEquals(result.get(1), String.valueOf(targetRealization.End_Date__c.addDays(timeSpan)));
    }
}