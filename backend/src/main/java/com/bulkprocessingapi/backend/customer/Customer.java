package com.bulkprocessingapi.backend.customer;
import jakarta.persistence.*;

/*
    @Entity

    Indica que esta clase será una entidad JPA.
    Hibernate la convertirá automáticamente
    en una tabla dentro de PostgreSQL.
*/
@Entity

@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean deleted = false;

    public Customer() {
    }

    public Customer(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // Getter del ID
    public Long getId() {
        return id;
    }

    // Setter del ID
    public void setId(Long id) {
        this.id = id;
    }

    // Getter del nombre
    public String getFirstName() {
        return firstName;
    }

    // Setter del nombre
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter del apellido
    public String getLastName() {
        return lastName;
    }

    // Setter del apellido
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    // Getter del email
    public String getEmail() {
        return email;
    }

    // Setter del email
    public void setEmail(String email) {
        this.email = email;
    }public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

}