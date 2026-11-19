package exercises.exercise_01_java_basics.java_arraylist;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class ArrayListInJava {
    public  void  beginner(){

        // Declaring and Initializing an ArrayList

        // Arraylist of numbers
        ArrayList<Integer> numbers = new ArrayList<>();

        // the add method add an element to the list
        numbers.add(12);
        numbers.add(22);
        numbers.add(78);
        numbers.add(98);


        // Removing an element from the list.
        numbers.remove(0);


        ArrayList<String> students = new ArrayList<>(Arrays.asList("James", "Oplano","Richard"));
        System.out.println(students);

        // Arraylist of numbers
        ArrayList<String> countries = new ArrayList<>(Arrays.asList("Liberia", "Ghana", "Rwanda"));
        countries.add("Sierra Leone");
        countries.set(2, "South Sudan");
        System.out.println(countries.size());

        countries.forEach(country -> {
            System.out.println(country);
        });

        numbers.clear();

        System.out.println(countries);
        System.out.println(numbers);
//        System.out.println(numbers.get(0));
    }
}
