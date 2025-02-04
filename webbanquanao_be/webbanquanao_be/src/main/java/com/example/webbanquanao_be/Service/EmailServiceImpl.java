package com.example.webbanquanao_be.Service;

import com.example.webbanquanao_be.Service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {


    private JavaMailSender emailSender;
    @Override
    public void sendMessage(String form, String to, String subject, String text) {
        //        MimeMailMessage=> có đính kèm media


//        SimpleMailMessage => gửi các nội dung thông thường


        MimeMessage message =emailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(form);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

        }catch (MessagingException e){
            throw new RuntimeException(e);
        }



//        thực hiện hành động gửi email
        emailSender.send(message);







    }
}
