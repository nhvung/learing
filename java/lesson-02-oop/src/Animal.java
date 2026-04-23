// Abstract base class — cannot be instantiated directly
public abstract class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getters (encapsulation — fields are private)
    public String getName() { return name; }
    public int getAge()     { return age; }

    // Abstract method — every subclass MUST implement this
    public abstract String makeSound();

    // Concrete method shared by all animals
    public String describe() {
        return name + " (age " + age + ") says: " + makeSound();
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "[name=" + name + ", age=" + age + "]";
    }
}
