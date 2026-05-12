package com.bulkprocessingapi.backend.customer;

// Importa anotaciones REST de Spring.
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    @RestController

    Indica que esta clase expone endpoints REST.
    Las respuestas se devuelven normalmente como JSON.
*/
@RestController

/*
    @RequestMapping("/api/customers")

    Define la ruta base para este controlador.
*/
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    /*
        Constructor Injection

        Spring inyecta automáticamente CustomerService.
    */
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {

        return customerService.updateCustomer(id, customer);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {

        customerService.deleteCustomer(id);
    }
}