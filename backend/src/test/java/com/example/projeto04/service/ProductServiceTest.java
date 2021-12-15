package com.example.projeto04.service;

import com.example.projeto04.exceptions.QuantityException;
import com.example.projeto04.model.Order;
import com.example.projeto04.model.Product;
import com.example.projeto04.model.Purchase;
import com.example.projeto04.model.Supplier;
import com.example.projeto04.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private SupplierService supplierService;

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService(productRepository, supplierService);
    }

    @Test
    void shouldDecreaseCurrentStockWithOrder(){
        Order order = Order.builder()
                .quantity(2)
                .build();

        Purchase purchase = Purchase.builder()
                .quantity(3)
                .build();
        ArrayList purchases = new ArrayList();
        purchases.add(purchase);

        Product product = Product.builder()
                .name("caneta")
                .orders(new ArrayList<>())
                .purchases(purchases)
                .build();

        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Mockito.when(productRepository.save(product)).thenReturn(product);

        var result = productService.order(1L, order);

        assertThat(result.getCurrentStock()).isEqualTo(1);
    }

    @Test
    void shouldReturnExceptionIfCurrentStockIsLessThanQuantityToOrder() {
        Order order = Order.builder()
            .quantity(2)
            .build();

        Product product = Product.builder()
                .name("caneta")
                .orders(new ArrayList<>())
                .purchases(new ArrayList<>())
                .build();

        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertThatThrownBy(() -> productService.order(1L, order)).isInstanceOf(QuantityException.class);
    }
}