package com.example.projeto04.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "name is required")
    private String name;

    private Double defaultPrice;

    @ManyToOne
    private ProductType productType;

    @OneToMany
    @JoinColumn(name = "product_id")
    private List<Order> orders;

    @OneToMany
    @JoinColumn(name = "product_id")
    private List<Purchase> purchases;
}