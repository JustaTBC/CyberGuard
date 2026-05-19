
# 🛡️ CyberGuard

O **CyberGuard** é uma plataforma interativa focada na conscientização e educação em cibersegurança. O projeto oferece simulações de golpes (phishing, boletos falsos), análise de links suspeitos em tempo real, quizzes educativos com sistema de pontuação (ranking) e uma central de denúncias.

A arquitetura do projeto está dividida em dois repositórios:
* **Backend (API RESTful):** [Repositório Backend](https://github.com/mateusoliveiraadev/CyberGuard/)
* **Frontend (Interface):** [Repositório Frontend](https://github.com/JustaTBC/CyberGuard-frontend)

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**
* React
* Vite
* React Router DOM
* CSS3 (Estilização pura e responsiva)

**Backend:**
* Java 21
* Spring Boot (Web, Data JPA)
* Banco de Dados H2 (In-Memory)
* Maven

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (Versão 17 ou 21)
* Uma IDE da sua preferência (VS Code, IntelliJ IDEA, Eclipse)

---

## 🚀 Como executar o projeto localmente

Para que a aplicação funcione corretamente, é necessário rodar o **Backend** e o **Frontend** simultaneamente em terminais separados.

### Passo 1: Rodar o Backend (Spring Boot)
O backend é responsável por gerenciar os usuários, pontuações do quiz, denúncias e a lógica de validação de links. Ele rodará nativamente na porta `8080`.

1. Abra o seu terminal e clone o repositório do backend:
bash
git clone [https://github.com/mateusoliveiraadev/CyberGuard.git](https://github.com/mateusoliveiraadev/CyberGuard.git)



2. Acesse a pasta do projeto:

bash
cd CyberGuard



3. Execute o projeto usando o Maven Wrapper:
* **No Windows:**
bash
.\mvnw spring-boot:run




* **No Linux/Mac:**
bash
./mvnw spring-boot:run






4. Aguarde até visualizar no terminal a mensagem: `Tomcat started on port 8080`.

⚠️ **Nota importante sobre o Banco de Dados:** O projeto utiliza o banco de dados **H2**. Por ser um banco em memória, **todos os dados (usuários, ranking, denúncias) são resetados** sempre que o servidor Java é reiniciado.

---

### Passo 2: Rodar o Frontend (React/Vite)

O frontend é a interface gráfica com a qual o usuário interage. Ele rodará na porta `5173`.

1. Abra um **novo terminal** (mantenha o terminal do backend rodando em segundo plano).
2. Clone o repositório do frontend:

bash
git clone [https://github.com/JustaTBC/CyberGuard-frontend.git](https://github.com/JustaTBC/CyberGuard-frontend.git)



3. Acesse a pasta do projeto:

bash
cd CyberGuard-frontend



4. Instale as dependências do Node:

bash
npm install



5. Inicie o servidor de desenvolvimento:

bash
npm run dev



6. O terminal exibirá um link local. Segure `Ctrl` (ou `Cmd`) e clique no link (geralmente `http://localhost:5173`) para abrir a aplicação no seu navegador.
