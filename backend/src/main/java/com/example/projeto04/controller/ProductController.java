package com.example.projeto04.controller;

import com.example.projeto04.model.Product;
import com.example.projeto04.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/products")
@RequiredArgsConstructor
@RestController
public class ProductController {
    private final ProductService productService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Product> index(){
        return productService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@Valid @RequestBody Product product){
        return productService.create(product);
    }

    @GetMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Product show(@PathVariable long id){
        return productService.findById(id);
    }

    @DeleteMapping(path ={"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public String delete(@PathVariable long id){
        return productService.deleteById(id);
    }

    @PutMapping(value="/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Product update(@PathVariable long id,
                             @Valid @RequestBody Product product){
        return productService.update(id, product);
    }
}
