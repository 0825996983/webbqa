package com.example.webbanquanao_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity 
@Data
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "datecreated")
    private Date dateCreated;

    @Column(name = "purchaseaddress", length = 512)
    private String purchaseAddress;
    @Column(name = "shippingaddress", length = 512)
    private String shippingAddress;
    @Column(name = "shippingcost")
    private double shippingCost;

    @Column(name = "totalpayment")
    private double totalPayment;


    @OneToMany(mappedBy = "orders",
            fetch = FetchType.LAZY, cascade = CascadeType.ALL
    )
    private List<Order_Details> listOrderDetail;


    @ManyToOne(    fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    @JoinColumn(name = "user_id", nullable = false)
    private User user;



    @ManyToOne(    fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    @JoinColumn(name = "paymentmethod_id")
    private Payment_Method paymentMethod;

    @ManyToOne(    fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH }
    )
    @JoinColumn(name = "deliverymethod_id")
    private Delivery_Method deliveryMethod;






}
