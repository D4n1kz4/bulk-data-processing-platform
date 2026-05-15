package com.bulkprocessingapi.backend.customer;

// Importa la anotación Service de Spring.
// Esto le dice a Spring que esta clase contiene
// lógica de negocio.
import org.springframework.stereotype.Service;

import java.util.List;

/*
    @Service

    Marca esta clase como un servicio Spring.
    Spring gestionará automáticamente su ciclo de vida.
*/
@Service
public class CustomerService {

    // Inyección del repository.
    // El service utilizará CustomerRepository
    // para comunicarse con PostgreSQL.
    private final CustomerRepository customerRepository;

    /*
        Constructor Injection

        Spring inyecta automáticamente el repository.
    */
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getCustomers() {
        return customerRepository.findByDeletedFalse();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {

        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        existingCustomer.setFirstName(updatedCustomer.getFirstName());
        existingCustomer.setLastName(updatedCustomer.getLastName());
        existingCustomer.setEmail(updatedCustomer.getEmail());

        return customerRepository.save(existingCustomer);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setDeleted(true);

        customerRepository.save(customer);
    }

}