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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Order> orders;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Purchase> purchases;

    @Transient
    private Integer currentStock;

    public Product(Long id) {
        this.id = id;
    }

    public Integer getCurrentStock() {
        Integer orderQuant = orders.stream().mapToInt(Order::getQuantity).sum();
        Integer purchaseQuant = purchases.stream().mapToInt(Purchase::getQuantity).sum();

        return purchaseQuant - orderQuant;
    }
}
