package com.bulkprocessingapi.backend.customer;

// Importa JpaRepository de Spring Data JPA.
// JpaRepository nos entrega automáticamente métodos CRUD
// sin necesidad de escribir SQL manualmente.
import org.springframework.data.jpa.repository.JpaRepository;

// Repository encargado de la comunicación con PostgreSQL.
// Esta interfaz conecta la entidad Customer con la base de datos.
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /*
        JpaRepository<Customer, Long> significa:

        Customer -> entidad/tabla que manejará el repository
        Long -> tipo de dato del ID de la entidad

        Métodos que Spring crea automáticamente:

        save()
        findAll()
        findById()
        deleteById()
        existsById()

        Todo esto se genera automáticamente gracias a Spring Data JPA.
     */

}