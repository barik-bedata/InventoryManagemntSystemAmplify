# 📊 Inventory Management System: Architecture & Deployment Diagrams

এই ডকুমেন্টে আমাদের **Inventory Management System**-এর ডেপ্লয়মেন্ট ওয়ার্কফ্লো (Deployment Workflow) এবং ক্লাস আর্কিটেকচার (Class Architecture) ভিজুয়ালাইজ করার জন্য দুটি মারমেইড (Mermaid) ডায়াগ্রাম দেওয়া হলো।

---

## 🚀 1. Deployment Workflow (Deployment Diagram)

এই ডায়াগ্রামটি দেখায় কীভাবে আপনার লোকাল মেশিন থেকে গিট পুশ করার পর গিটহাব অ্যাকশনস (CI/CD)-এর মাধ্যমে কোডটি AWS EC2 সার্ভারে ডকার কন্টেইনার হিসেবে রান করে।

```mermaid
graph TD
    subgraph Git_Zone [Version Control - Local & GitHub]
        Dev[Developer] -->|1. git push| GitHub[GitHub Repository]
    end

    subgraph CI_CD [GitHub Actions Runner]
        GitHub -->|2. Triggers Workflow| Workflow[CI/CD Workflow]
        Workflow -->|3. Runs SSH Command| SSH[SSH Client]
    end

    subgraph AWS_EC2 [AWS EC2 Instance Server]
        SSH -->|4. Trigger Deploy Script| GitPull[Pull Latest Code]
        GitPull -->|5. Run Compose| Compose[docker-compose up --build -d]
        
        subgraph Docker_Network [Docker Containers Network]
            App[Node.js Express App Container] <-->|6. Database Query (Prisma)| DB[(PostgreSQL Container)]
            DB <-->|Persistent Storage| Vol[(Docker Volumes)]
        end
    end

    Client[Client Browser / Postman] <-->|7. HTTP Request / Response| App
```

---

## 🧩 2. Class Architecture (UML Class Diagram)

আমাদের প্রজেক্টের **Clean Architecture / DDD (Domain-Driven Design)** প্যাটার্নটির ক্লাস ও ইন্টারফেসগুলোর মধ্যে সম্পর্ক এখানে দেখানো হলো:

```mermaid
classDiagram
    %% Entities (Domain Layer)
    class Product {
        +int id
        +string title
        +int categoryId
        +string tag
        +DateTime createdAt
        +DateTime updatedAt
    }
    class Category {
        +int id
        +string title
    }
    Product --> Category : has (Relation)

    %% DTOs (Application Layer)
    class ProductDto {
        +string title
        +int categoryId
        +string tag
    }
    class CategoryDto {
        +string title
    }

    %% Repository Interfaces (Application Layer)
    class IProductRepository {
        <<interface>>
        +getProductById(id) Product
        +getAllProducts() List~Product~
        +createProduct(data) Product
        +updateProduct(id, data) Product
        +deleteProduct(id) Product
    }
    class ICategoryRepository {
        <<interface>>
        +getCategoryById(id) Category
        +getAllCategories() List~Category~
        +createCategory(data) Category
        +updateCategory(id, data) Category
        +deleteCategory(id) Category
    }

    %% Repositories (Infrastructure Layer)
    class ProductRepository {
        -PrismaClient prisma
        +getProductById(id) Product
        +getAllProducts() List~Product~
        +createProduct(data) Product
        +updateProduct(id, data) Product
        +deleteProduct(id) Product
    }
    class CategoryRepository {
        -PrismaClient prisma
        +getCategoryById(id) Category
        +getAllCategories() List~Category~
        +createCategory(data) Category
        +updateCategory(id, data) Category
        +deleteCategory(id) Category
    }
    ProductRepository ..|> IProductRepository : implements
    CategoryRepository ..|> ICategoryRepository : implements

    %% Service Interfaces (Application Layer)
    class IProductService {
        <<interface>>
        +getProduct(id) Product
        +listProducts() List~Product~
        +addProduct(dto) Product
        +editProduct(id, dto) Product
        +removeProduct(id) Product
    }
    class ICategoryService {
        <<interface>>
        +getCategory(id) Category
        +listCategories() List~Category~
        +addCategory(dto) Category
        +editCategory(id, dto) Category
        +removeCategory(id) Category
    }

    %% Services (Application Layer)
    class ProductService {
        -IProductRepository productRepo
        +getProduct(id) Product
        +listProducts() List~Product~
        +addProduct(dto) Product
        +editProduct(id, dto) Product
        +removeProduct(id) Product
    }
    class CategoryService {
        -ICategoryRepository categoryRepo
        +getCategory(id) Category
        +listCategories() List~Category~
        +addCategory(dto) Category
        +editCategory(id, dto) Category
        +removeCategory(id) Category
    }
    ProductService ..|> IProductService : implements
    CategoryService ..|> ICategoryService : implements
    ProductService --> IProductRepository : depends on (DI)
    CategoryService --> ICategoryRepository : depends on (DI)

    %% Controllers (API Layer)
    class ProductController {
        -IProductService productService
        +create(req, res)
        +getAll(req, res)
        +update(req, res)
        +delete(req, res)
    }
    class CategoryController {
        -ICategoryService categoryService
        +create(req, res)
        +getAll(req, res)
        +update(req, res)
        +delete(req, res)
    }
    ProductController --> IProductService : depends on (DI)
    CategoryController --> ICategoryService : depends on (DI)
