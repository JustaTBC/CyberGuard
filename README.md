
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

Documentação e Guia de Implantação

Este guia fornece as instruções passo a passo para recriar o ambiente de desenvolvimento e realizar a implantação (deploy) em produção do CyberGuard. O projeto é composto por um **Backend (Java/Spring Boot)** e um **Frontend (React/Vite)**.

> ⚠️ **Nota importante para novos administradores/strangers:** Para que o sistema carregue os vídeos e notícias oficiais do projeto, as chaves de API (GNews e YouTube) devem ser mantidas exatamente como listadas neste guia. A **única configuração que você deve criar do zero é o Banco de Dados**, pois cada implantação exige uma instância própria do PostgreSQL.

### 📋 Pré-requisitos
* **Java 17+** e **Maven** (Para o Backend)
* **Node.js 18+** e **NPM** (Para o Frontend)
* **PostgreSQL** (Uma instância local ou na nuvem, como Neon.tech, Render, etc.)

---

### ⚙️ 1. Recriando o Ambiente Local

#### 1.1 Configurando o Banco de Dados (Sua única tarefa exclusiva)
1. Crie um banco de dados PostgreSQL na sua máquina local ou em um serviço gerenciado na nuvem (ex: [Neon.tech](https://neon.tech/)).
2. Guarde as credenciais de acesso: Host, Nome do Banco, Usuário e Senha.

#### 1.2 Configurando e Executando o Backend (Java)
1. Navegue até a pasta raiz do backend.
2. Configure as seguintes variáveis de ambiente no seu sistema ou IDE para a execução do Spring Boot:
   ```env
   # 1. BANCO DE DADOS (Substitua com as credenciais do SEU banco de dados recém-criado)
   DB_HOST=seu-host-do-banco.tech
   DB_NAME=nome_do_seu_banco
   DB_USER=seu_usuario_do_banco
   DB_PASSWORD=sua_senha_do_banco

   # 2. APIs DO CYBERGUARD (Copie EXATAMENTE como está abaixo)
   GNEWS_API_KEY=8d2a595fe4a7767c714e2fe55dbec712
   YOUTUBE_API_KEY=AIzaSyDcNcgvmYx9hzY4h7isZ0or2s6cJeerd70
   YOUTUBE_PLAYLIST_ID=PLhnExfBbbmAQrPacK4YEdVQbwBjyrXNzL


Execute o comando para subir o servidor backend:

Bash
./mvnw spring-boot:run


O backend estará rodando na porta 8080.

#### 1.3 Configurando e Executando o Frontend (React/Vite)

Navegue até a pasta raiz do frontend.

Crie um arquivo chamado .env com a seguinte estrutura:
```Snippet de código
  VITE_API_URL="http://localhost:8080"
  VITE_YT_API_KEY="AIzaSyDcNcgvmYx9hzY4h7isZ0or2s6cJeerd70"
  VITE_YT_PLAYLIST_ID="PLhnExfBbbmAQrPacK4YEdVQbwBjyrXNzL"
```

Instale as dependências e inicie o servidor:

```Bash
npm install
```
```Bash
npm run dev
```
##  Guia de Deploy (Produção)

Para rodar a aplicação na internet, utilizamos o Render (Backend) e a Vercel (Frontend).

### Passo A: Deploy do Backend no Render

Conecte o repositório do seu Backend ao Render e crie um Web Service.

Defina os comandos:

Build Command: ./mvnw clean install -DskipTests

Start Command: java -jar target/cyberguard-0.0.1-SNAPSHOT.jar

Vá na aba Environment Variables e adicione as 7 variáveis listadas no passo 1.2:

As 4 do banco de dados (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD) com as suas credenciais.

As 3 do projeto (GNEWS_API_KEY, YOUTUBE_API_KEY, YoutubeLIST_ID) com os valores exatos fornecidos acima.

Salve e aguarde o build. Copie a URL gerada (ex: https://cyberguard-backend.onrender.com).

### Passo B: Deploy do Frontend na Vercel

Importe o repositório do Frontend na Vercel.

Antes de fazer o Deploy, vá em Environment Variables e adicione:

VITE_API_URL: A URL do seu Backend no Render (Atenção: sem barra / no final).

VITE_YT_API_KEY: AIzaSyDcNcgvmYx9hzY4h7isZ0or2s6cJeerd70

VITE_YT_PLAYLIST_ID: PLhnExfBbbmAQrPacK4YEdVQbwBjyrXNzL

Clique em Deploy.

Nota de Performance: Se o backend estiver no plano gratuito do Render, ele entra em hibernação após 15 minutos de inatividade. O primeiro acesso do dia pode levar até 50 segundos para carregar as informações.



6. O terminal exibirá um link local. Segure `Ctrl` (ou `Cmd`) e clique no link (geralmente `http://localhost:5173`) para abrir a aplicação no seu navegador.
