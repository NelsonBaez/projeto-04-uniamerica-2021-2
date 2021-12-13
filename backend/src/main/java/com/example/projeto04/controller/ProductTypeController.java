package com.example.projeto04.controller;

import com.example.projeto04.model.ProductType;
import com.example.projeto04.service.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/productTypes")
@RequiredArgsConstructor
@RestController
public class ProductTypeController {
    private final ProductTypeService productTypeService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductType> index(){
        return productTypeService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductType create(@Valid @RequestBody ProductType productType){
        return productTypeService.create(productType);
    }

    @GetMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductType show(@PathVariable long id){
        return productTypeService.findById(id);
    }

    @DeleteMapping(path ={"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public String delete(@PathVariable long id){
        return productTypeService.deleteById(id);
    }

    @PutMapping(value="/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductType update(@PathVariable long id,
                          @Valid @RequestBody ProductType productType){
        return productTypeService.update(id, productType);
    }
}
