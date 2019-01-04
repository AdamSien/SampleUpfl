/**
 * Created by bbeli001 on 08.05.2018.
 */

@IsTest
private class PickListControllerTest {

    @IsTest
    static void getPickListObjectsIntoListTest(){
        List<String> result = PickListController.getPickListObjectsIntoList();
        System.assert(!result.isEmpty());
        String s = 'Contact';
        System.assert(result.contains(s));
    }

    @IsTest
    static void getPickListFieldsIntoListTest(){
        List<String> fields = PickListController.getPickListFieldsIntoList('Contact');
        String id = 'Id';
        System.assert(!fields.isEmpty());
        System.assert(fields.contains(id));
    }

    @IsTest
    static void getPickListDatesIntoListTest(){
        List<String> dates = PickListController.getPickListDatesIntoList('Contact');
        System.assert(!dates.isEmpty());
        String dateField = 'CreatedDate';
        System.assert(dates.contains(dateField));
    }
}