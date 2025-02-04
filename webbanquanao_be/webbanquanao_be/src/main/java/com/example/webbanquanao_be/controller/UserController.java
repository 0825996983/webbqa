package com.example.webbanquanao_be.controller;





import com.example.webbanquanao_be.Security.JwtResponse;
import com.example.webbanquanao_be.Security.Loginrequest;
import com.example.webbanquanao_be.Service.AccountService;
//import com.example.webbanquanao_be.Service.JwtSevice;
import com.example.webbanquanao_be.Service.JwtSevice;
import com.example.webbanquanao_be.Service.UserService;
import com.example.webbanquanao_be.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/account")
public class UserController {

    private AccountService accountService;

    private AuthenticationManager authenticationManager;

    private JwtSevice jwtSevice;

    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity <?> userRegistration(@Validated  @RequestBody User user){
        ResponseEntity<?> response = accountService.userRegistration(user);
        return  response;


    }



    @GetMapping("/activate")
    public ResponseEntity <?> activateAccount(@RequestParam String email, @RequestParam String activationCode){
        ResponseEntity<?> response = accountService.activateAccount(email,activationCode);
        return  response;
    }

    @PostMapping("/login")
    public  ResponseEntity <?> login(@RequestBody Loginrequest loginrequest){
        // xác thực người dùng tên đăng nhập và mật khẩu
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginrequest.getUserName(), loginrequest.getPassword())
                    );
            // nếu    xác thực thành công tạo token JWT
            if(authentication.isAuthenticated()){
                final String jwt = jwtSevice.generateToken(loginrequest.getUserName());
                return ResponseEntity.ok(new JwtResponse(jwt));


            }
         // nếu không thành công
        }catch (AuthenticationException e){
            return  ResponseEntity.badRequest().body("Tên đăng nhập hoặc mật khẩu không chính xác");

        }
        return ResponseEntity.badRequest().body("xác thực không thành công");
    }



}
