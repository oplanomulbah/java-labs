package exercises.exercise_01_java_basics.JavaArrays;

public class ArraysInJava {

    public void beginner() {

        // Declearing an array in java
        int[] numbers;
        String[] names;
        double[] prices;
        char[] letters;
        boolean[] answers;

        // Array Initialization
        int[] numbers1 = {85, 90, 78, 92};
        String[] countries = {"Liberia", "Rwanda", "Ghana"};
        double[] stockPrices = {10.5, 20.75, 30.0};
        char[] grades = {'A', 'B', 'C', 'D'};


        // Example without an Array

        int student1 = 85;
        int student2 = 90;
        int student3 = 78;
        int student4 = 92;

        // Example with an Array
        int[] studentScores = {85, 90, 78, 92};
        for (int studentScore : studentScores) {
            System.out.println(studentScore);
        }
    }
}
