package patterns;

// Builder pattern: avoids "telescoping constructors" for objects with many optional fields
class Pizza {
    // Required
    private final String size;
    private final String crust;

    // Optional
    private final boolean cheese;
    private final boolean pepperoni;
    private final boolean mushrooms;
    private final boolean onions;

    private Pizza(Builder b) {
        this.size       = b.size;
        this.crust      = b.crust;
        this.cheese     = b.cheese;
        this.pepperoni  = b.pepperoni;
        this.mushrooms  = b.mushrooms;
        this.onions     = b.onions;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder(size + " pizza, " + crust + " crust");
        if (cheese)    sb.append(", cheese");
        if (pepperoni) sb.append(", pepperoni");
        if (mushrooms) sb.append(", mushrooms");
        if (onions)    sb.append(", onions");
        return sb.toString();
    }

    static class Builder {
        private final String size;
        private final String crust;
        private boolean cheese, pepperoni, mushrooms, onions;

        public Builder(String size, String crust) {
            this.size  = size;
            this.crust = crust;
        }

        public Builder cheese()     { this.cheese     = true; return this; }
        public Builder pepperoni()  { this.pepperoni  = true; return this; }
        public Builder mushrooms()  { this.mushrooms  = true; return this; }
        public Builder onions()     { this.onions     = true; return this; }
        public Pizza build()        { return new Pizza(this); }
    }
}

public class BuilderDemo {
    public static void main(String[] args) {
        Pizza margherita = new Pizza.Builder("Medium", "thin")
                .cheese()
                .build();

        Pizza supreme = new Pizza.Builder("Large", "thick")
                .cheese()
                .pepperoni()
                .mushrooms()
                .onions()
                .build();

        System.out.println(margherita);
        System.out.println(supreme);
    }
}
