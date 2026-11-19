package exercises.exercise_01_java_basics.VariablesAndDataTypes;

import exercises.exercise_01_java_basics.JavaArrays.ArraysInJava;
import exercises.exercise_01_java_basics.MathClass.TheMathClass;
import exercises.exercise_01_java_basics.StringsAndStringMethods.StringAndStringMethods;
import exercises.exercise_01_java_basics.java_arraylist.ArrayListInJava;
import exercises.exercise_01_java_basics.java_conditional.JavaConditionalStatements;

public class Main {

    public void  main(String[] args){

        // programs from the dataTypes class
        DataTypes dataTypes = new DataTypes();
        // dataTypes.beginner();

        // programs from the Variables class
        Variables variables = new Variables();
        // variables.beginner();

        // programs from the StringsAndStringsMethods class
        StringAndStringMethods stringAndStringMethods = new StringAndStringMethods();
        // stringAndStringMethods.beginner();

        // programs from the TheMathClass
        TheMathClass theMathClass = new TheMathClass();
        // theMathClass.beginner();

        // Pragrams from the JavaArray class
        ArraysInJava arraysInJava = new ArraysInJava();
        // arraysInJava.beginner();

        ArrayListInJava arrayListInJava = new ArrayListInJava();
       // arrayListInJava.beginner();

        JavaConditionalStatements javaConditionalStatements = new JavaConditionalStatements();
        javaConditionalStatements.beginner();

    }
}
