package exercises.exercise_01_java_basics.StringsAndStringMethods;

import java.util.Locale;

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

        // • contains(CharSequence s): Returns true if the string contains the specified sequence of characters.
        System.out.println(name.contains("n"));

        // • startsWith(String prefix) / endsWith(String suffix): Checks if the string starts or ends with the specified prefix or suffix.
        System.out.println(name.startsWith("p"));
        System.out.println(name.endsWith("o"));



        // 🛠️ Extraction & Modification

        // • substring(int beginIndex, int endIndex): Extracts a specific section of the string starting from beginIndex up to (but not including) endIndex.
        System.out.println("The substring of the country string from 1 to 3 is: " + country.substring(2,5));

        // • concat(String str): Appends the specified string to the end of the current string.
        System.out.println(name.concat(" James"));

        // • replace(char oldChar, char newChar): Replaces all occurrences of a specified character or sequence with a new one.
        System.out.println(name.replace("o", "a"));

        // • trim(): Removes leading and trailing whitespace from the string.
        System.out.println(name.trim());

        // • strip(): Modern version of trim() that uses Unicode whitespace rules (Java 11+).
        System.out.println(name.strip());

        // • toLowerCase() / toUpperCase(): Converts all characters in the string to lowercase or uppercase
        System.out.println(name.toUpperCase(Locale.ROOT));
        System.out.println(name.toLowerCase(Locale.ROOT));



    }
}
