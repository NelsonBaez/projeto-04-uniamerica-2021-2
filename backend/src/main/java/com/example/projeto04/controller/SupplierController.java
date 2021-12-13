package com.example.projeto04.controller;

import com.example.projeto04.model.Supplier;
import com.example.projeto04.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/suppliers")
@RequiredArgsConstructor
@RestController
public class SupplierController {
    private final SupplierService supplierService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Supplier> index(){
        return supplierService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Supplier create(@Valid @RequestBody Supplier supplier){
        return supplierService.create(supplier);
    }

    @GetMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Supplier show(@PathVariable long id){
        return supplierService.findById(id);
    }

    @DeleteMapping(path ={"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public String delete(@PathVariable long id){
        return supplierService.deleteById(id);
    }

    @PutMapping(value="/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Supplier update(@PathVariable long id,
                          @Valid @RequestBody Supplier supplier){
        return supplierService.update(id, supplier);
    }
}
