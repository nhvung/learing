package patterns;

// Product interface
interface Notification {
    void send(String message);
}

// Concrete products
class EmailNotification implements Notification {
    private String email;
    public EmailNotification(String email) { this.email = email; }

    @Override
    public void send(String message) {
        System.out.println("[EMAIL to " + email + "] " + message);
    }
}

class SmsNotification implements Notification {
    private String phone;
    public SmsNotification(String phone) { this.phone = phone; }

    @Override
    public void send(String message) {
        System.out.println("[SMS to " + phone + "] " + message);
    }
}

class PushNotification implements Notification {
    private String deviceId;
    public PushNotification(String deviceId) { this.deviceId = deviceId; }

    @Override
    public void send(String message) {
        System.out.println("[PUSH to " + deviceId + "] " + message);
    }
}

// Factory: caller doesn't need to know which class to instantiate
class NotificationFactory {
    public static Notification create(String type, String target) {
        switch (type.toLowerCase()) {
            case "email": return new EmailNotification(target);
            case "sms":   return new SmsNotification(target);
            case "push":  return new PushNotification(target);
            default: throw new IllegalArgumentException("Unknown type: " + type);
        }
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        Notification n1 = NotificationFactory.create("email", "alice@example.com");
        Notification n2 = NotificationFactory.create("sms",   "+1-555-1234");
        Notification n3 = NotificationFactory.create("push",  "device-abc-123");

        n1.send("Your order has shipped!");
        n2.send("Your order has shipped!");
        n3.send("Your order has shipped!");
    }
}
