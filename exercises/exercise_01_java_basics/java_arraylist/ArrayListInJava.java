package exercises.exercise_01_java_basics.java_arraylist;

import java.util.ArrayList;

public class ArrayListInJava {
    public  void  beginner(){
        // Arraylist of numbers
        ArrayList<Integer> numbers = new ArrayList<>();

        // the add method add an element to the list
        numbers.add(12);
        numbers.add(22);
        numbers.add(78);
        numbers.add(98);


        // Removing an element from the list.
        numbers.remove(0);




        System.out.println(numbers);
        System.out.println(numbers.get(0));
    }
}
