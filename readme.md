
<div align="center">

<br/>

```
██████╗  █████╗  ██████╗      █████╗ ██╗
██╔══██╗██╔══██╗██╔════╝     ██╔══██╗██║
██████╔╝███████║██║  ███╗    ███████║██║
██╔══██╗██╔══██║██║   ██║    ██╔══██║██║
██║  ██║██║  ██║╚██████╔╝    ██║  ██║██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═╝╚═╝
```

### *Retrieval-Augmented Generation — Chat with your Documents*

<br/>

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)

<br/>

> **Upload PDFs. Ask Questions. Get Intelligent Answers.**
> RAG AI is a full-stack intelligent document assistant that lets you have natural conversations with your own PDF documents — powered by OpenAI embeddings and LLMs.

<br/>

---

</div>

<br/>

## ✨ What is RAG AI?

RAG AI is a **production-ready full-stack application** that implements the **Retrieval-Augmented Generation (RAG)** pattern. Upload your PDF documents, and the system will chunk, embed, and index them — making them available for intelligent Q&A via a beautiful chat interface.

Whether you're querying research papers, legal documents, or study material — RAG AI gives you accurate, context-aware answers grounded in *your* documents.

<br/>

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        React Frontend                            │
│            (Vite + TypeScript + Tailwind + Framer Motion)        │
└───────────────────────────────┬──────────────────────────────────┘
                                │  REST API (JWT Auth)
┌───────────────────────────────▼──────────────────────────────────┐
│                     Spring Boot Backend                           │
│                                                                   │
│  ┌─────────────┐   ┌──────────────┐   ┌────────────────────┐    │
│  │  AuthService│   │  PdfService  │   │    RagService       │    │
│  │  (JWT/BCrypt)│  │  (Chunking)  │   │  (Query Pipeline)  │    │
│  └─────────────┘   └──────┬───────┘   └────────┬───────────┘    │
│                           │                    │                  │
│  ┌────────────────────────▼────────────────────▼──────────────┐  │
│  │              EmbeddingService + VectorSearchService         │  │
│  │                  (OpenAI text-embedding-ada-002)            │  │
│  └─────────────────────────────┬──────────────────────────────┘  │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
            ┌────────────────────┴────────────────────┐
            │                                         │
     ┌──────▼──────┐                         ┌───────▼───────┐
     │  PostgreSQL  │                         │  OpenAI / LLM │
     │  (pgvector)  │                         │  (Completions)│
     │  Documents   │                         │               │
     │  Chunks      │                         └───────────────┘
     │  Embeddings  │
     │  Chats       │
     └─────────────┘
```

<br/>

## 🎯 Features

| Feature | Description |
|---|---|
| 📄 **PDF Upload** | Upload multiple PDFs (up to 20MB each) — auto-chunked and indexed |
| 🔍 **Semantic Search** | Vector similarity search using OpenAI embeddings via pgvector |
| 💬 **Chat Interface** | Natural language conversations with full message history |
| 🧠 **Context-Aware Answers** | LLM responses grounded in your document chunks |
| 🔐 **JWT Auth** | Secure login/register with access + refresh token flow |
| 📊 **Dashboard** | Real-time stats — documents, queries, system status |
| 🗂️ **Conversation History** | Persistent multi-session chat history per user |
| 📝 **Activity Logs** | Complete audit trail of user actions |

<br/>

## 🛠️ Tech Stack

### Backend
- **Java 17+** with **Spring Boot 3.x**
- **Spring Security** — JWT-based authentication (access + refresh tokens)
- **Spring Data JPA** + **PostgreSQL** — persistent storage
- **pgvector** — vector similarity search for semantic retrieval
- **OpenAI API** — embeddings (`text-embedding-ada-002`) + LLM completions
- **OpenRouter** — alternative LLM gateway support
- **PDF Processing** — chunking & text extraction pipeline

### Frontend
- **React 19** + **TypeScript 5.9**
- **Vite 7** — lightning-fast build tool
- **Tailwind CSS 4** — utility-first styling
- **Framer Motion** — smooth animations & transitions
- **React Router v7** — client-side routing
- **React Markdown** + **remark-gfm** — formatted AI responses
- **Axios** — HTTP client with interceptors
- **Lucide React** + **React Icons** — icon libraries
- **tsParticles** — ambient particle effects

<br/>

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 15+ with `pgvector` extension
- OpenAI API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rag-ai.git
cd rag-ai
```

---

### 2. Database Setup

```sql
-- Create database
CREATE DATABASE ragdb;

-- Enable pgvector extension
\c ragdb
CREATE EXTENSION vector;
```

---

### 3. Backend Setup

Navigate to the backend directory and configure `application.properties`:

```properties
# src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/ragdb
spring.datasource.username=your_username
spring.datasource.password=your_password

security.jwt.secret=your_super_secret_jwt_key_minimum_32_characters
security.jwt.access-exp-minutes=60
security.jwt.refresh-exp-minutes=1440

openai.api.key=sk-your-openai-api-key
# Optional: OpenRouter for alternative LLMs
openrouter.api.key=sk-or-your-openrouter-key
```

> ⚠️ **Never commit your API keys to version control!** Use environment variables or a `.env` file.

Run the backend:

```bash
./mvnw spring-boot:run
# Backend starts on http://localhost:8080
```

---

### 4. Frontend Setup

```bash
cd "RAG Fronted"
npm install
npm run dev
# Frontend starts on http://localhost:5173
```

<br/>

## 📁 Project Structure

```
rag-ai/
├── backend/                          # Spring Boot Application
│   └── src/main/java/com/ragai/rag/
│       ├── config/
│       │   ├── security/             # JWT Filter, Security Config
│       │   └── web/                  # CORS Configuration
│       ├── controller/               # REST Controllers
│       │   ├── AuthController        # Login / Register
│       │   ├── ChatController        # Chat endpoints
│       │   ├── DocumentController    # PDF upload & management
│       │   └── DashboardController   # Stats & monitoring
│       ├── service/
│       │   ├── RagService            # Core RAG pipeline
│       │   ├── EmbeddingService      # OpenAI embeddings
│       │   ├── VectorSearchService   # pgvector similarity search
│       │   ├── PdfService            # PDF chunking
│       │   ├── LlmService            # LLM completion calls
│       │   ├── ConversationService   # Chat history management
│       │   └── AuthService/          # Authentication logic
│       ├── entity/                   # JPA Entities
│       ├── repository/               # Spring Data Repositories
│       ├── dto/                      # Request/Response DTOs
│       └── exceptions/               # Global Exception Handler
│
└── frontend/                         # React Application
    └── src/
        ├── api/                      # Axios API clients
        ├── app/                      # Routes & App constants
        ├── pages/
        │   ├── Auth/                 # Login & Register pages
        │   ├── Chat/                 # Chat interface & hooks
        │   ├── Upload/               # PDF upload & management
        │   └── Dashboard/            # Stats dashboard
        └── utils/                    # Helpers & utilities
```

<br/>

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & get JWT tokens |
| `POST` | `/api/auth/refresh` | Refresh access token |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/documents/upload` | Upload PDF files |
| `GET` | `/api/documents` | List all documents |
| `DELETE` | `/api/documents/{id}` | Delete a document |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send a message, get RAG response |
| `GET` | `/api/chat/conversations` | Get all conversations |
| `GET` | `/api/chat/conversations/{id}` | Get conversation history |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Get stats & system status |

<br/>

## ⚙️ How RAG Works (Under the Hood)

```
PDF Upload
    │
    ▼
Text Extraction → Chunking (fixed-size with overlap)
    │
    ▼
OpenAI Embedding API → Vector (1536-dim)
    │
    ▼
Store in PostgreSQL (pgvector)

─────────── At Query Time ───────────

User Query
    │
    ▼
Embed Query → Query Vector
    │
    ▼
Cosine Similarity Search (pgvector) → Top-K Chunks
    │
    ▼
Build Prompt: [System] + [Retrieved Chunks] + [User Query]
    │
    ▼
LLM (OpenAI / OpenRouter) → Streamed Response
    │
    ▼
Save to Conversation History → Return to User
```

<br/>

## 🔒 Security Notes

- Passwords are hashed with **BCrypt**
- JWT tokens are signed with HMAC-SHA256
- CORS is configured for frontend origin only
- All `/api/**` routes (except `/api/auth/**`) require a valid Bearer token

> ⚠️ Before pushing to GitHub, make sure to:
> - Remove API keys from `application.properties`
> - Add `application.properties` to `.gitignore`
> - Use environment variables for secrets in production

<br/>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

<br/>

## 📄 License

This project is licensed under the MIT License.

<br/>

---

<div align="center">

**Built with ❤️ using Spring Boot + React + OpenAI**

*If this project helped you, please consider giving it a ⭐*

</div>
