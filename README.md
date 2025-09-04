# **UserHub**

Este projeto é uma aplicação web full-stack desenvolvida como uma solução completa para um desafio de validação de ponta a ponta. Ele demonstra a construção de um sistema coeso com cadastro, autenticação e gerenciamento de perfil de usuário.

### **🎥 Vídeo de Demonstração**
https://github.com/lightniing1/test-cadastro-usuario/blob/main/demo.mp4
https://youtu.be/z2mGPk14E00

### **1\. Visão da Solução**

O projeto consiste em uma **API RESTful** construída com **Spring Boot** e uma **Single-Page Application (SPA)** com **Angular**. A aplicação permite que usuários se cadastrem, façam login de forma segura e visualizem e atualizem suas informações de perfil.

As principais funcionalidades são:

* **Criação de conta** de usuário.  
* **Autenticação segura** via JWT (JSON Web Tokens).  
* **Visualização e atualização** dos dados do perfil do usuário autenticado.

Toda a aplicação é containerizada com **Docker**, permitindo que o ambiente completo (**Frontend, Backend e Banco de Dados**) seja iniciado com um único comando.

### **2\. Arquitetura**

A arquitetura da solução é baseada em um modelo desacoplado de cliente-servidor, onde o Frontend (cliente) consome os serviços expostos pela API REST do Backend (servidor).

graph TD
    subgraph Frontend (Angular)
        F[SPA - Interface do Usuário]
    end

    subgraph Backend (Spring Boot)
        B[Lógica de Negócio e Endpoints RESTful]
    end

    subgraph Database (PostgreSQL)
        D[Persistência de Dados]
    end

    F -- HTTP/S (REST API) --> B
    B -- TCP/IP --> D

    style F fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#f9f,stroke:#333,stroke-width:2px
    linkStyle 0 stroke:#666,stroke-width:2px,fill:none,color:#666
    linkStyle 1 stroke:#666,stroke-width:2px,fill:none,color:#666

    F -. Servido por Nginx .- F_det
    F_det[Interface do Usuário]
    F_det_2[Gerenciamento de Estado]
    B -. Lógica de Negócio .- B_det
    B_det[Lógica de Negócio]
    B_det_2[Endpoints RESTful]
    B_det_3[Autenticação com JWT]
    D -. Persistência de Dados .- D_det
    D_det[Persistência de Dados]
    D_det_2[Schema gerenciado pelo Flyway]

* **Frontend (Angular)**: Responsável por toda a interface e experiência do usuário. É uma SPA servida por um contêiner Nginx para máxima performance.  
* **Backend (Spring Boot)**: Expõe uma API RESTful para ser consumida pelo frontend. Gerencia a lógica de negócio, a segurança com Spring Security e a comunicação com o banco de dados.  
* **Banco de Dados (PostgreSQL)**: Banco de dados relacional escolhido para a persistência dos dados dos usuários. As migrações do schema são gerenciadas pelo Flyway, garantindo consistência e versionamento.

### **3\. Decisões Técnicas e Trade-offs**

| Tecnologia / Padrão | Decisão / Justificativa | Trade-off / Alternativa |
| :---- | :---- | :---- |
| **Angular (Frontend)** | Um framework completo e opinativo que promove uma arquitetura organizada e escalável. O uso de TypeScript garante um código mais seguro e manutenível. | React ou Vue são alternativas populares. React oferece mais flexibilidade (sendo uma biblioteca), mas exige a escolha e configuração de mais ferramentas (ex: roteamento). |
| **PostgreSQL (Database)** | Banco de dados relacional open-source poderoso e confiável, ideal para dados estruturados como os de usuários. | Um banco NoSQL como o MongoDB poderia simplificar o schema para este caso de uso, mas o PostgreSQL oferece maior consistência e maturidade em transações. |
| **Autenticação com JWT** | Padrão stateless ideal para APIs REST e SPAs. Desacopla o cliente do servidor, eliminando a necessidade de sessões e facilitando a escalabilidade. | A autenticação baseada em sessão (stateful) é mais simples de implementar, mas torna a escalabilidade horizontal do backend mais complexa. |
| **Docker Compose** | Garante um ambiente de desenvolvimento e execução consistente e isolado. Simplifica drasticamente a configuração e o deploy, permitindo subir toda a stack com um único comando. | Executar cada serviço (Postgres, Backend, Frontend) manualmente na máquina host, o que é suscetível a erros e diferenças de ambiente. |
| **Flyway (Migrações)** | Provê versionamento do banco de dados, tornando as alterações no schema seguras, rastreáveis e repetíveis em qualquer ambiente. | Usar o ddl-auto do Hibernate é prático para desenvolvimento inicial, mas inadequado e perigoso para ambientes de produção. |

### **4\. Como Executar Localmente**

Garanta que você tenha o **Docker** e o **Docker Compose** instalados na sua máquina.

1. **Clone o repositório:**  
   git clone https://github.com/lightniing1/test-cadastro-usuario.git

2. **Navegue até a raiz do projeto:**  

3. **Suba a aplicação com Docker Compose:**  
   docker-compose up \--build

O comando irá construir as imagens do frontend e backend e iniciar os três contêineres. O processo pode levar alguns minutos na primeira vez.

**Acesse a aplicação:**

* **Frontend**: http://localhost:4200  
* **Backend API** (se precisar testar): http://localhost:8080

O banco de dados será criado e as migrações do Flyway serão aplicadas automaticamente na inicialização do backend.

### **5\. Endpoints Principais (API)**

| Método HTTP | Endpoint | Descrição | Necessita Autenticação? |
| :---- | :---- | :---- | :---- |
| POST | /auth/signup | Registra um novo usuário. | Não |
| POST | /auth/signin | Autentica um usuário e retorna um token JWT. | Não |
| GET | /users/me | Retorna os dados do perfil do usuário autenticado. | Sim |
| PUT | /users/me | Atualiza os dados do perfil do usuário autenticado. | Sim |

### **6\. Fluxo de Autenticação**

1. O usuário envia suas credenciais (**e-mail** e **senha**) para o endpoint POST /auth/signin.  
2. O backend valida as credenciais. Se forem válidas, um **token JWT** é gerado.  
3. O token JWT é retornado para a aplicação frontend.  
4. O frontend armazena o token (ex: em Local Storage) e o anexa a todas as requisições futuras para endpoints protegidos, no cabeçalho Authorization como Bearer \<token\>.  
5. O **SecurityFilter** do backend intercepta cada requisição, valida o token e, se for válido, libera o acesso ao recurso solicitado.

### **7\. Credenciais de Teste**

Para facilitar a avaliação, você pode usar as seguintes credenciais para fazer login sem precisar se cadastrar primeiro.

* **E-mail**: test@test.com  
* **Senha**: test1234
