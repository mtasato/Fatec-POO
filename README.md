# Projeto de Programação Orientada a Objetos

**Faculdade de Tecnologia de Mogi das Cruzes (FATEC-MC)**

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte da disciplina de Programação Orientada a Objetos da FATEC-MC. A aplicação implementa conceitos fundamentais de POO, incluindo encapsulamento, herança, polimorfismo e abstração, utilizando tecnologias modernas para desenvolvimento web.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java** - Linguagem de programação
- **Spring Boot** - Framework para desenvolvimento de aplicações Java
- **Hibernate** - Configurações de comunicação do banco e a aplicação Java
- **Spring Data JPA** - Persistência de dados
- **Maven** - Gerenciamento de dependências

### Frontend
- **React** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first

## 📁 Estrutura do Projeto

```
Fatec-POO/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Java JDK 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com/)

## ⚙️ Instalação e Execução

### Backend (Spring Boot)

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/projeto-poo-fatec.git
cd projeto-poo-fatec/backend
```

2. Configure o banco de dados no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:PORT/DATABASE
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

3. Execute o projeto:
```bash
mvn spring-boot:run
```

O servidor estará rodando em `http://localhost:8080`

### Frontend (React + Vite)

1. Navegue até a pasta do frontend:
```bash
cd ../frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📚 Funcionalidades

- [x] Cadastro de entidades
- [x] Listagem e filtros
- [x] Edição e exclusão
- [x] Validação de dados
- [x] Interface responsiva

## 🎯 Conceitos de POO Aplicados

- **Encapsulamento**: Atributos privados com getters e setters
- **Herança**: Hierarquia de classes com reutilização de código
- **Polimorfismo**: Sobrescrita de métodos e interfaces
- **Abstração**: Classes e métodos abstratos para definir contratos

## 👥 Autores

- **Marcos Guilherme Tasato** - RA: 1840482412006

## 👨‍🏫 Professor Orientador

**Prof. Me. Pedro Toledo**

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais na FATEC-MC.


**FATEC-MC - Faculdade de Tecnologia de Mogi das Cruzes**
