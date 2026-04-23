public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);   // call Animal constructor
        this.breed = breed;
    }

    @Override
    public String makeSound() {
        return "Woof!";
    }

    public void fetch() {
        System.out.println(getName() + " fetches the ball!");
    }

    public String getBreed() { return breed; }

    @Override
    public String toString() {
        return super.toString() + ", breed=" + breed;
    }
}
