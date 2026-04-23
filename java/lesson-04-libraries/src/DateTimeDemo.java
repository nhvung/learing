import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateTimeDemo {
    public static void main(String[] args) {
        // Current date and time
        LocalDate today = LocalDate.now();
        LocalTime now   = LocalTime.now();
        LocalDateTime dt = LocalDateTime.now();

        System.out.println("Date:  " + today);
        System.out.println("Time:  " + now);
        System.out.println("Both:  " + dt);

        // Creating specific dates
        LocalDate birthday = LocalDate.of(1995, 5, 23);
        System.out.println("Birthday: " + birthday);

        // Date arithmetic
        LocalDate nextWeek = today.plusDays(7);
        LocalDate lastYear = today.minusYears(1);
        System.out.println("Next week: " + nextWeek);
        System.out.println("Last year: " + lastYear);

        // Difference between dates
        Period age = Period.between(birthday, today);
        System.out.printf("Age: %d years, %d months, %d days%n",
                age.getYears(), age.getMonths(), age.getDays());

        // Formatting
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        System.out.println("Formatted: " + today.format(fmt));

        // Parsing
        LocalDate parsed = LocalDate.parse("25/12/2025", fmt);
        System.out.println("Parsed: " + parsed);

        // Comparing dates
        System.out.println("Is birthday before today? " + birthday.isBefore(today));
        System.out.println("Days until next New Year: " +
                today.until(LocalDate.of(today.getYear() + 1, 1, 1)).getDays());
    }
}
