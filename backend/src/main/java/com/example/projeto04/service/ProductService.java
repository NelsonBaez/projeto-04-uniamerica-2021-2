package com.example.projeto04.service;

import com.example.projeto04.model.Product;
import com.example.projeto04.model.Purchase;
import com.example.projeto04.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final SupplierService supplierService;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product findById(long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("not Found"));
    }

    public String deleteById(long id) {
        productRepository.deleteById(id);
        return "Deletado com sucesso";
    }

    public Product update(long id, Product product) {
        Product newProduct = findById(id);
        newProduct.setName(product.getName());
        newProduct.setDefaultPrice(product.getDefaultPrice());
        newProduct.setProductType(product.getProductType());
        return newProduct;
    }

    public Product purchase(long id, Purchase purchase) {
        Product product = findById(id);
        product.getPurchases().add(purchase);
        return product;
    }
}
