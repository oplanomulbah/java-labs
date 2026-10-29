package exercises.exercise_01_java_basics.MathClass;

public class TheMathClass {
    public  void beginner(){
        // Working with the java Math Class and its methods.

        // .abs method: The Math.abs() function returns the absolute value of the parameter passed to it.
        System.out.println("the absolute value of -10 is: "+ Math.abs(-10));
        System.out.println("the absolute value of 14 is: "+ Math.abs(14));

        // .ceil(): The Math.ceil() function rounds a floating point value up to the nearest integer value.
        System.out.println(Math.ceil(9.334));
        System.out.println(Math.ceil(4.234));

        // .floor: The Math.floor() function rounds a floating point value down to the nearest integer value.
        System.out.println(Math.floor(7.323));
        System.out.println(Math.floor(4.776));

        // .min: The Math.min() method returns the smallest of two values passed to it as parameter.
        System.out.println(Math.min(34,12));

        // .max: The Math.max() method returns the largest of two values passed to it as parameter.
        System.out.println(Math.max(100,20));

        // .round: The Math.round() method rounds a float or double to the nearest integer using normal math round rules (either up or down).
        System.out.println(Math.round(3.434));
        System.out.println(Math.round(4.534));

        // .random: The Math.random() method returns a random floating point number between 0 and 1
        System.out.println(Math.floor(Math.random() * 100D));


        // .pow: The Math.pow() function takes two parameters. The method returns the value of the first parameter raised to the power of the second parameter.
        System.out.println(Math.pow(10,2));

        // .sqrt: The Math.sqrt() method calculates the square root of the parameter given to it.
        System.out.println(Math.sqrt(9));
    }
}
