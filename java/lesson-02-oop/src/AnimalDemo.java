public class AnimalDemo {
    public static void main(String[] args) {
        // Polymorphism: Animal reference holds Dog/Cat objects
        Animal[] animals = {
            new Dog("Rex", 3, "German Shepherd"),
            new Cat("Whiskers", 5, true),
            new Dog("Buddy", 2, "Labrador"),
            new Cat("Shadow", 7, false)
        };

        System.out.println("=== Animal Shelter ===");
        for (Animal a : animals) {
            System.out.println(a.describe());
        }

        System.out.println("\n=== Dog-specific behavior ===");
        for (Animal a : animals) {
            // instanceof check before downcasting
            if (a instanceof Dog) {
                Dog dog = (Dog) a;
                dog.fetch();
                System.out.println("  Breed: " + dog.getBreed());
            }
        }
    }
}
