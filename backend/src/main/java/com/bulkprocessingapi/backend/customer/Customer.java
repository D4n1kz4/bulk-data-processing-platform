package com.bulkprocessingapi.backend.customer;

// Importa todas las anotaciones JPA necesarias
// para mapear esta clase hacia PostgreSQL.
import jakarta.persistence.*;

/*
    @Entity

    Indica que esta clase será una entidad JPA.
    Hibernate la convertirá automáticamente
    en una tabla dentro de PostgreSQL.
*/
@Entity

/*
    @Table(name = "customers")

    Define explícitamente el nombre de la tabla SQL.
*/
@Table(name = "customers")
public class Customer {

    /*
        @Id

        Define la llave primaria de la tabla.
    */
    @Id

    /*
        @GeneratedValue(strategy = GenerationType.IDENTITY)

        Hace que PostgreSQL genere automáticamente
        el ID autoincremental.
    */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre del cliente
    private String firstName;

    // Apellido del cliente
    private String lastName;

    // Correo electrónico del cliente
    private String email;

    /*
        Constructor vacío obligatorio para JPA/Hibernate.

        Hibernate necesita este constructor para
        crear objetos automáticamente desde la base de datos.
    */
    public Customer() {
    }

    /*
        Constructor completo.

        Permite crear objetos Customer manualmente.
    */
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
    }
}