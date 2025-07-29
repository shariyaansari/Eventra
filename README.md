# DBMS_Project

Movie Theatre Management System using Java and MySQL.

---

## Local Development Setup

This guide will help you set up and run the Movie Theatre Management System on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Java Development Kit (JDK) 11 or higher**: Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.java.net/install/). (Updated to 11+ as is common for Spring Boot)
* **Maven 3.6+**: Download from [Apache Maven](https://maven.apache.org/download.cgi).
* **MySQL Database Server**: Download from [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/).
* **MySQL Connector/J (JDBC Driver)**: The project uses `mysql-connector-j-9.2.0.jar`. You will need to download this JDBC driver to establish a connection between Java and MySQL. You can download it from [MySQL Connector/J](https://dev.mysql.com/downloads/connector/j/).
* **An IDE (Integrated Development Environment)**: Such as [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/) or [Apache NetBeans](https://netbeans.apache.org/download/index.html). These IDEs make it easier to manage Java projects and dependencies.

### Database Setup

1.  **Start MySQL Server**: Ensure your MySQL server is running.

2.  **Create Database and Tables**:
    * Open your MySQL client (e.g., MySQL Workbench, command-line client).
    * Execute the SQL script located in `movie_ticket_management_system_CP.sql`. This script will create the `movie_ticket_management_system_CP` database and all necessary tables.

    ```sql
    -- Example commands if using MySQL command line:
    -- mysql -u root -p
    -- SOURCE path/to/your/cloned/repo/movie_ticket_management_system_CP.sql;
    ```

3.  **Configure Database Connection**:
    * The project uses the `Conn.java` file for database connectivity.
    * **Crucially, update the connection details in `Conn.java`** to match your MySQL server's root password (or create a new user and use its credentials).
    * **Default Connection String (from `Conn.java`):**
        ```java
        c = DriverManager.getConnection("jdbc:mysql:///movie_ticket_management_system_CP", "root", "12345");
        ```
    * **Change `"12345"` to your actual MySQL root password.** If your MySQL server is running on a different host or port, you'll need to update `jdbc:mysql:///movie_ticket_management_system_CP` accordingly (e.g., `jdbc:mysql://localhost:3306/movie_ticket_management_system_CP`).

### Application Setup and Run (Backend)

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/SandeepVashishtha/Eventra.git](https://github.com/SandeepVashishtha/Eventra.git)
    cd Eventra/backend
    ```

2.  **Add MySQL Connector/J to Classpath**:
    * Place the downloaded `mysql-connector-j-9.2.0.jar` file into a `lib` folder within your `Eventra/backend` project directory (you might need to create this folder).
    * **In your IDE (Recommended):**
        * **IntelliJ IDEA**: Right-click on your `backend` module -> `Open Module Settings` -> `Libraries` tab -> Click `+` -> `Java` -> Select `mysql-connector-j-9.2.0.jar`.
        * **NetBeans**: Right-click on your project -> `Properties` -> `Libraries` -> `Add JAR/Folder` and select `mysql-connector-j-9.2.0.jar`.
        * **VS Code (with Java Extension Pack)**: You might need to configure the `JAVA_HOME` environment variable and add the JAR to the project's build path via `pom.xml` if using Maven, or through VS Code's Java project settings.

3.  **Build the Backend Project**:
    * Navigate to the `Eventra/backend` directory in your terminal.
    * Run: `mvn clean install`

4.  **Run the Backend Application**:
    * From the `Eventra/backend` directory, run: `mvn spring-boot:run`
    * The backend API will be available at `http://localhost:8080` (as per Eventra's original README, which is good to cross-reference).

### Login Credentials (Default/Example)

* **To create a user**: The `Login.java` has a "Sign up" button that leads to `Signup.java`. You should use this to create new user accounts in the `users` table.
* The `signup` table also stores user data; it seems to be an older version or a separate registration flow. Focus on the `users` table for login.

---

## Project Structure (Key Files)

* `BackendApplication.java`: The main Spring Boot application entry point, located at `com.eventra.BackendApplication`.
* `Conn.java`: Manages the MySQL database connection. **(Remember to update credentials here)**
* `movie_ticket_management_system_CP.sql`: SQL script for database creation and initial table population.
* `mysql-connector-j-9.2.0.jar`: MySQL JDBC driver.
* Other `.java` files:
    * `com.eventra.controller/`: Contains REST API endpoint classes (e.g., `AdminController.java`, `AuthController.java`, `UserController.java`, `StatusController.java`).
    * `com.eventra.dto/`: Contains Data Transfer Objects for API requests/responses (e.g., `AuthResponse.java`, `LoginRequest.java`, `MessageResponse.java`, `SignupRequest.java`).
    * `com.eventra.entity/`: Contains JPA entities (e.g., `User.java`).
    * `com.eventra.filter/`: Contains servlet filters (e.g., `JwtAuthenticationFilter.java`).
    * `com.eventra.repository/`: Contains Spring Data JPA repositories (e.g., `UserRepository.java`).
    * `com.eventra.service/`: Contains business logic and service layer components (e.g., `AuthService.java`, `CustomUserDetailsService.java`).
    * `com.eventra.util/`: Contains utility and helper classes (e.g., `JwtUtil.java`).
    * `com.eventra.config/`: Contains Spring configuration classes (e.g., `SecurityConfig.java`).

---

Feel free to open an issue or pull request if you encounter any problems or have suggestions for improvement.