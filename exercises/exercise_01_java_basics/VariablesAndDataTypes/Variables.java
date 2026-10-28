package exercises.exercise_01_java_basics.VariablesAndDataTypes;

import java.util.Scanner;

public class Variables {
    public  void  beginner(){

        Scanner scanner = new Scanner(System.in);

        // Create a simple savings tracker that stores an initial balance, monthly deposit, and withdrawal amount.
        // Calculate the remaining balance
        double initialBalance = 100;
        double monthlyDeposit = 0;
        double withdrawalAmount = 0;


        System.out.println("Enter 1 to Deposit: ");
        System.out.println("Enter 2 to Withdraw: ");
        char operation = scanner.next().charAt(0);
        switch (operation){
            case '1':
                System.out.println("Enter the amount you want to deposit: ");
                monthlyDeposit = scanner.nextDouble();
                initialBalance += monthlyDeposit;
                System.out.println("You deposited the amount of " + monthlyDeposit + " and your current balance is " + initialBalance);
                break;
            case '2':
                System.out.println("Enter the amount you want to withdraw: ");
                monthlyDeposit = scanner.nextDouble();
                initialBalance += monthlyDeposit;
                System.out.println("You withdraw the amount of " + withdrawalAmount + " and your current balance is " + initialBalance);
                break;
            default:
                System.out.println("The option you choose is not available.");
                break;
        }



        // Build a rectangle calculator that stores length and width, then calculates area and perimeter.
        double length = 0.00;
        double width = 0.00;
        double area = 0.00;
        double perimeter = 0.00;


        System.out.print("Enter the length of the rectangle you wants to calculate: ");
        length = scanner.nextDouble();
        System.out.print("Enter the width of the rectangle you wants to calculate: ");
        width = scanner.nextDouble();

        System.out.print("Enter 1 ro calculate the Area and Enter 2 to calculate the Perimeter:");
        char calOperator = scanner.next().charAt(0);

        switch (calOperator){
            case '1':
                area = length * width;
                System.out.println("The area of the Rectangle is: " + area );
                break;
            case '2':
                perimeter = 2* (length + width);
                System.out.println("The perimeter of the Rectangle is: " + perimeter );
                break;
            default:
                System.out.println("Please select of of the two oprions");
        }

        scanner.close();





    }
}
