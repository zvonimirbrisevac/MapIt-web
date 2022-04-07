package seminar.mapit.dto.user;

public class UserRegisterDTO {

    private String name;
    private String surname;
    private String email;
    private String password;

    public UserRegisterDTO(String name, String surname, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }
}
