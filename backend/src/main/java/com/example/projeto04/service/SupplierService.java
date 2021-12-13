package com.example.projeto04.service;

import com.example.projeto04.model.Supplier;
import com.example.projeto04.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    public Supplier create(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier findById(long id) {
        return supplierRepository.findById(id).orElseThrow(() -> new RuntimeException("not Found"));
    }

    public String deleteById(long id) {
        supplierRepository.deleteById(id);
        return "Deletado com sucesso";
    }

    public Supplier update(long id, Supplier supplier) {
        Supplier newSupplier = findById(id);
        newSupplier.setName(supplier.getName());
        return newSupplier;
    }
}
