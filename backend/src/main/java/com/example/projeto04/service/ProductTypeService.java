package com.example.projeto04.service;

import com.example.projeto04.model.ProductType;
import com.example.projeto04.repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;

    public List<ProductType> findAll() {
        return productTypeRepository.findAll();
    }

    public ProductType create(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public ProductType findById(long id) {
        return productTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("not Found"));
    }

    public String deleteById(long id) {
        productTypeRepository.deleteById(id);
        return "Deletado com sucesso";
    }

    public ProductType update(long id, ProductType productType) {
        ProductType newProduct = findById(id);
        newProduct.setName(productType.getName());
        return newProduct;
    }
}
