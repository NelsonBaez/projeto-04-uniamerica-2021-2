package com.example.projeto04.integration;

import com.example.projeto04.model.Product;
import com.example.projeto04.model.ProductType;
import com.example.projeto04.repository.ProductRepository;
import com.example.projeto04.service.SupplierService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ProductIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;

    @BeforeEach
    private void beforeEach() {
        productRepository.deleteAll();
    }

    @Test
    void shouldGetAllUsersAsList() throws Exception {
        String url = "/products";
        mockMvc.perform(
                get(url)
        ).andExpect(status().isOk());
    }

    @Test
    void shouldAddProduct() throws Exception {
        Product produto = Product.builder()
                .name("lapis")
                .defaultPrice(10.2)
                .productType(getProductType())
                .orders(new ArrayList<>())
                .purchases(new ArrayList<>())
                .build();

        var json = new ObjectMapper().writeValueAsString(produto);

        String url = "/products";
        mockMvc.perform(
                post(url)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isCreated());
    }

    private MvcResult AddProductType() throws Exception {
        ProductType productType = ProductType.builder()
                .name("utilidades")
                .build();

        var json = new ObjectMapper().writeValueAsString(productType);

        String url = "/productTypes";
        return mockMvc.perform(
                post(url)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isCreated())
                .andReturn();
    }

    private ProductType getProductType() throws Exception {
        var mvcResult = AddProductType();
        return new ObjectMapper().readValue(mvcResult.getResponse().getContentAsByteArray(), ProductType.class);
    }

}
