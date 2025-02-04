package com.example.webbanquanao_be.entity;

import jakarta.persistence.*;

import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "username")
    private String userName;

    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;

    @Column(name = "password", length = 512)
    private String password;
    @Column(name = "gender")
    private char gender;
    @Column(name = "email")
    private String email;
    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "puchaseaddress")
    private String purchaseAddress;

    @Column(name = "shippingaddress")
    private String shippingAddress;



    @Column(name = "activated")
    private boolean activated;
    @Column(name = "activationCode")
    private String activationCode;




    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    private List<Evaluate>  listEvaluate;

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    private List<Favorite_Products>  listfavoriteProduct;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role>  listRole;
    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    private List<Orders> listOder;

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(String activationCode) {
        this.activationCode = activationCode;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", gender=" + gender +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", purchaseAddress='" + purchaseAddress + '\'' +
                ", shippingAddress='" + shippingAddress + '\'' +
                ", activated=" + activated +
                ", activationCode='" + activationCode + '\'' +
                ", listEvaluate=" + listEvaluate +
                ", listfavoriteProduct=" + listfavoriteProduct +
                ", listRole=" + listRole +
                ", listOder=" + listOder +
                '}';
    }
}
