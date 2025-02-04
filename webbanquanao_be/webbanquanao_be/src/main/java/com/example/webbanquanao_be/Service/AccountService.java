package com.example.webbanquanao_be.Service;


import com.example.webbanquanao_be.entity.Notification;
import com.example.webbanquanao_be.entity.User;
import com.example.webbanquanao_be.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AccountService {

    private BCryptPasswordEncoder passwordEncoder;


    private UserRepository userRepository;

    private EmailService emailService;


    public ResponseEntity<?> userRegistration(User user){
        // Kiểm tra tên đăng nhập đã tồn tại chưa
        if (userRepository.existsByUserName(user.getUserName())){
            return ResponseEntity.badRequest().body(new Notification("Tên Đăng nhập đã tồn tại."));
        }
        //kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body(new Notification("Email đã tồn tại."));
        }

        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        //Gán và gửi thông tin kích hoạt
        user.setActivationCode(generateActivationCode());
        user.setActivated(false);

        // gửi email để họ kích hoạt
        sendActivationEmail(user.getEmail(), user.getActivationCode());



        //lưu người dùng xuống csdl
       User nguoidungdadangki= userRepository.save(user);
        return  ResponseEntity.ok("Đăng ký thành công");

    }
    private  String generateActivationCode(){
//        tạo mã ngẫu nhiên
        return UUID.randomUUID().toString();

    }
    private void sendActivationEmail(String email, String activationCode){
        String subject = "Kích hoạt tài khoản của bạn tại webbanquanao";
        String text ="Vui lòng sử dụng mã sau để kích hoạt cho tài khoản <"+email+">:<html><body> <br/> <h1>"+activationCode+"<h1/></body></html>";
        text+="<br/> Click on the link to activate your account:";
        String url = "http://localhost:3000/activate/"+email+"/"+activationCode+"";
        text+=("<br/> <a href="+url+">"+url+"<a/>");
        emailService.sendMessage("doquangbien3172003@gmail.com", email, subject, text);

    }

    public ResponseEntity<?> activateAccount(String email, String activationCode){
        User user = userRepository.findByEmail(email);

        if(user == null){
            return  ResponseEntity.badRequest().body(new Notification("User does not exist!"));
        }
        if(user.isActivated()){
            return  ResponseEntity.badRequest().body(new Notification("Account has been activated"));
        }
         if (activationCode.equals(user.getActivationCode())){
             user.setActivated(true);
             userRepository.save(user);
             return ResponseEntity.ok("Account activation successful!");
         }else {
             return  ResponseEntity.badRequest().body(new Notification("Incorrect activation code!"));
         }




    }



}
