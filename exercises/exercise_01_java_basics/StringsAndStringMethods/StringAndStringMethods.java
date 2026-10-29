package exercises.exercise_01_java_basics.StringsAndStringMethods;

public class StringAndStringMethods {
    public void beginner(){
        // How do we create a string?
        String name = "Oplano";
        String country = new String("Liberia");


        // Working with commonly used string methods


        // 🔍 Inspection & Search
        // .length() -> Give us the length of the string
        System.out.println("The length of the name string is: " + name.length());

        // • isEmpty(): Returns true if the string length is 0.
        System.out.println("Is the name string empty: " + name.isEmpty());

        // • isBlank(): Returns true if the string is empty or contains only whitespace characters (Java 11+).
        System.out.println("Is the name string blank: " + name.isBlank());

        // • charAt(int index): Returns the char value at the specified index.
        System.out.println("The char at index 3 in the name string is: " + name.charAt(3));

        // • indexOf(String str): Returns the index of the first occurrence of the specified substring, or -1 if not found.
        System.out.println("The indexOf the letter l in the name string is: " + name.indexOf("l"));

        // • lastIndexOf(String str): Returns the index of the last occurrence of the specified substring
        System.out.println("The indexOf the letter l in the name string is: " + name.indexOf("a"));

        // .substring() -> Returns the substring of a string beginning from and end at to-1;
        System.out.println("The substring of the country string from 1 to 3 is: " + country.substring(2,5));

    }
}
