package exercises.exercise_01_java_basics.VariablesAndDataTypes;

public class DataTypes {
 public void  beginner(){

    //  working with primitive types
    int age = 12;
    double discount = 12.99;
    float price = 45;
    char grade = 'A';
    boolean isAdmin = true;

    // Create variables to store a student's full name, age, height in meters, and whether the
     // student is enrolled in a university.
     String fullName = "Oplano James Mulbah";
     double height = 5.8;
     boolean isEnrolled = true;
     System.out.println("Hello my name is " + fullName + " and I my height is " + height + "meters and I am currently enrolled " + isEnrolled );

     // Create a simple product record containing a product name, product code, price, stock quantity, and availability status
     String productName = "MacBook Pro 2022";
     double productPrice = 1900.99;
     String productCode = "MAC_234k";
     int stock = 120;
     boolean isAvailable = true;

     System.out.println("This " + productName +" with the code of " + productCode + " is selling for the price of " + productPrice  + " and there are " + stock + " in stock right now." );



 };
}
