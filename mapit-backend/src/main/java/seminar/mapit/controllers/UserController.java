package seminar.mapit.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import seminar.mapit.dto.user.UserLoginDTO;
import seminar.mapit.dto.user.UserRegisterDTO;
import seminar.mapit.services.UserService;

@Controller
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity registerUser(@RequestBody UserRegisterDTO user) {
        logger.info("Registrating new user...");


        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity loginUser (@RequestBody UserLoginDTO user) {
        logger.info("Logging in user...");

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity getUserInfo (@PathVariable long userId) {
        logger.info("Fetching user info...");

        return new ResponseEntity(HttpStatus.OK);
    }



}
