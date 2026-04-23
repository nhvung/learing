public class Cat extends Animal {
    private boolean isIndoor;

    public Cat(String name, int age, boolean isIndoor) {
        super(name, age);
        this.isIndoor = isIndoor;
    }

    @Override
    public String makeSound() {
        return "Meow!";
    }

    public boolean isIndoor() { return isIndoor; }
}
