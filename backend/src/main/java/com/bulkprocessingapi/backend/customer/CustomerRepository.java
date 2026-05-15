package com.bulkprocessingapi.backend.customer;

// Importa JpaRepository de Spring Data JPA.
// JpaRepository nos entrega automáticamente métodos CRUD
// sin necesidad de escribir SQL manualmente.
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
// Repository encargado de la comunicación con PostgreSQL.
// Esta interfaz conecta la entidad Customer con la base de datos.
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByDeletedFalse();

}