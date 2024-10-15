
# CP-Mobile-Consultations

## Descrição

Este projeto é uma aplicação de gerenciamento de consultas médicas que inclui funcionalidades para adicionar, visualizar e excluir consultas. O sistema foi desenvolvido para atender ao pedido da **Avaliação Checkpoint Nº 2 - App MinhaConsulta**. A aplicação distingue os usuários com dois tipos de perfil: **admin** e **user**. O **admin** tem permissões para visualizar todas as consultas, adicionar novas consultas e excluir consultas existentes. O **user** só pode visualizar as consultas associadas ao seu próprio ID.

## Funcionalidades Implementadas

### 1. **Visualização de Consultas**
   - **Admin**:
     - Pode visualizar todas as consultas cadastradas no sistema.
   - **User**:
     - Pode visualizar apenas as consultas associadas ao seu ID de usuário.

### 2. **Adição de Consultas**
   - **Apenas admins** podem adicionar consultas médicas.
   - Para adicionar uma nova consulta, o admin precisa fornecer as seguintes informações:
     - **Data da consulta**
     - **Nome do médico**
     - **Especialidade médica**
     - **Status da consulta** (pendente, confirmada, concluída)
     - **ID do usuário** (para associar a consulta a um usuário específico)

### 3. **Exclusão de Consultas**
   - **Apenas admins** podem excluir consultas.
   - A exclusão é feita através de um botão "Excluir" associado a cada consulta listada. O sistema exibe um alerta de confirmação antes de realizar a exclusão.

### 4. **Autenticação Simulada por Papéis (Roles)**
   - A aplicação simula uma autenticação básica com dois tipos de papéis:
     - **Admin**: Acesso total às funcionalidades de visualização, adição e exclusão.
     - **User**: Somente pode visualizar suas próprias consultas.

### 5. **Navegação**
   - A aplicação conta com uma navegação simples entre telas. O botão "Voltar" está presente para permitir que o usuário volte à tela anterior, e o admin pode alternar entre a listagem e a tela de adição de consultas.

## Estrutura do Projeto

O projeto está dividido em **backend** e **frontend**:

### **Backend**

O backend da aplicação é responsável por gerenciar as consultas e lidar com as requisições HTTP. Utiliza **Node.js** com **Express.js** e **SQLite** como banco de dados.

#### **Rotas do Backend**:

1. **Listar Consultas**:
   - **GET `/api/consultations`**: Lista todas as consultas para o admin e apenas as consultas do usuário logado para um user comum.
   - Exemplo de retorno para admin:
     ```json
     [
       { "id": 1, "date": "2024-10-17", "doctor": "Dr. Almeida", "specialty": "Cardiologia", "status": "Confirmada", "userId": 1 },
       { "id": 2, "date": "2024-10-20", "doctor": "Dr. Souza", "specialty": "Dermatologia", "status": "Pendente", "userId": 2 }
     ]
     ```

2. **Criar Consulta**:
   - **POST `/api/consultations`**: Cria uma nova consulta. Esta rota está acessível apenas para usuários com papel de **admin**.
   - Exemplo de corpo da requisição:
     ```json
     {
       "date": "2024-11-01",
       "doctor": "Dr. Almeida",
       "specialty": "Neurologia",
       "status": "Pendente",
       "userId": 2
     }
     ```
   - Exemplo de resposta:
     ```json
     { "message": "Consulta criada com sucesso!", "consultation": { ... } }
     ```

3. **Excluir Consulta**:
   - **DELETE `/api/consultations/:id`**: Exclui uma consulta pelo seu ID. A funcionalidade está restrita a usuários **admin**.
   - Exemplo de resposta:
     ```json
     { "message": "Consulta excluída com sucesso!" }
     ```

#### **Porta do Backend**:
- O backend está rodando na porta **3000**: `http://localhost:3000`

### **Frontend**

O frontend foi construído utilizando **React Native Web** para simular o comportamento de uma aplicação mobile rodando no navegador.

#### **Principais Páginas e Funcionalidades**:

1. **Tela de Login**:
   - Na tela inicial, o usuário escolhe seu papel: **admin** ou **user**. Com base nessa escolha, o sistema carrega a lista de consultas adequada ao perfil.
   
2. **Tela de Listagem de Consultas**:
   - Exibe todas as consultas no caso do **admin** ou apenas as consultas do usuário no caso do **user**.
   - Cada consulta inclui: **Data**, **Médico**, **Especialidade**, **Status**.
   
3. **Tela de Adição de Consulta**:
   - O admin pode acessar esta tela e adicionar uma nova consulta preenchendo os campos: **Data**, **Médico**, **Especialidade**, **Status** e **ID do Usuário**.
   
4. **Botão Voltar**:
   - Um botão "Voltar" foi implementado para facilitar a navegação entre as telas.

#### **Porta do Frontend**:
- O frontend está rodando na porta **8080**: `http://localhost:8080`

## Requisitos para Execução

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)
- [SQLite3](https://www.sqlite.org/download.html)

### Instruções para Execução

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/EvelynCleto/CP-Mobile-Consultations.git
   cd CP-Mobile-Consultations
   ```

2. **Instale as dependências do backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Instale as dependências do frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Inicie o backend**:
   ```bash
   cd ../backend
   npm start
   ```

5. **Inicie o frontend**:
   ```bash
   cd ../frontend
   npm run web
   ```

Agora você pode acessar a aplicação no navegador em `http://localhost:8080`.

## Estrutura de Pastas

```bash
CP-Mobile-Consultations/
├── backend/                # Código do servidor backend
│   ├── controllers/        # Controladores da lógica de negócios
│   ├── db/                 # Banco de dados SQLite
│   ├── routes/             # Definições das rotas da API
│   ├── server.js           # Configuração principal do servidor
├── frontend/               # Código do frontend React Native Web
│   ├── public/             # Arquivos estáticos do frontend
│   ├── src/                # Código fonte do React
│   ├── webpack.config.js   # Configuração do Webpack
└── README.md               # Documentação do projeto
```

## Conclusão

O projeto atende a todos os requisitos da **Avaliação Checkpoint Nº 2 - App MinhaConsulta**:

1. Implementação da regra de segurança baseada no papel do usuário (admin pode visualizar todas as consultas, users podem ver apenas suas próprias).
2. Proteção dos endpoints no backend para garantir que apenas o que foi permitido pode ser acessado.
3. Integração frontend-backend, permitindo a visualização, adição e exclusão de consultas.



