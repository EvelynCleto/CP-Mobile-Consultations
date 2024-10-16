# CP-Mobile-Consultations

## Descrição

Este projeto é uma aplicação de gerenciamento de consultas médicas, desenvolvida para atender ao pedido da **Avaliação Checkpoint Nº 2 - App MinhaConsulta**. A aplicação distingue dois perfis de usuários: **admin** e **user**. O **admin** pode visualizar todas as consultas, adicionar novas consultas e decidir se o **user** verá ou não as consultas. O **user** só pode visualizar as consultas que o **admin** decidiu que devem ser visíveis para ele, sem poder adicionar ou excluir consultas.

## Funcionalidades Implementadas

### 1. **Visualização de Consultas**
   - **Admin**:
     - Pode visualizar todas as consultas cadastradas no sistema.
   - **User**:
     - Pode visualizar apenas as consultas associadas ao seu ID de usuário, e que o **admin** permitiu que ele veja.

### Visualização das Consultas para o Administrador

As imagens abaixo mostram a visualização das consultas cadastradas no sistema quando acessado pelo **Admin**. O **Admin** tem acesso completo e pode visualizar todas as consultas cadastradas no sistema, independentemente do usuário associado.

![Captura de tela 2024-10-15 230834](https://github.com/user-attachments/assets/c2473f19-3842-41d5-a519-9c6d56a27c0a)
![Captura de tela 2024-10-15 231606](https://github.com/user-attachments/assets/6c6f4fa6-d149-408d-ba2b-8e591ca358a7)

---

### Visualização das Consultas para o Usuário

As imagens abaixo mostram a visualização das consultas disponíveis para um **Usuário comum (User)**. O **User** só pode visualizar as consultas associadas ao seu próprio ID, e que o **Admin** definiu como visíveis. Isso garante que o usuário só veja as informações relevantes às suas consultas.

![Captura de tela 2024-10-15 231004](https://github.com/user-attachments/assets/8c8fb1e2-fef9-4d87-a265-589d497dbccb)
![Captura de tela 2024-10-15 231535](https://github.com/user-attachments/assets/ef602ac7-5c9f-49cc-b41b-25d41cde8480)

---

### Acesso Seguro

O sistema implementa uma segurança que impede o acesso não autorizado às rotas de consultas sem os parâmetros corretos de autenticação. Se um usuário tenta acessar as rotas de consultas sem um parâmetro válido de role (papel), uma mensagem de erro é exibida, indicando que o acesso não é autorizado. Isso reforça o controle de quem pode visualizar as consultas e protege os dados.

![Captura de tela 2024-10-15 232840](https://github.com/user-attachments/assets/ad9941d8-1ed9-46bf-9f6f-7a17a2991098)



### 2. **Adição de Consultas**
   - **Apenas admins** podem adicionar consultas médicas.
   - Para adicionar uma nova consulta, o admin precisa fornecer as seguintes informações:
     - **Data da consulta**
     - **Nome do médico**
     - **Especialidade médica**
     - **Status da consulta** (pendente, confirmada, concluída)
     - **ID do usuário** (para associar a consulta a um usuário específico)
     - **Visibilidade da consulta** (decidindo se a consulta será visível ou não para o user)

![Captura de tela 2024-10-15 230748](https://github.com/user-attachments/assets/32b13871-5b30-4b88-9c7d-90f45b42fc75)


### 3. **Autenticação Simulada por Papéis (Roles)**
   - A aplicação simula uma autenticação básica com dois tipos de papéis:
     - **Admin**: Acesso total às funcionalidades de visualização, adição e controle de visibilidade das consultas.
     - **User**: Somente pode visualizar as consultas que o **admin** permitiu que ele veja.

### 4. **Navegação**
   - A aplicação conta com uma navegação simples entre telas. O botão "Voltar" está presente para permitir que o usuário volte à tela anterior, e o admin pode alternar entre a listagem e a tela de adição de consultas.


## Estrutura do Projeto

O projeto está dividido em **backend** e **frontend**:

### **Backend**

O backend da aplicação é responsável por gerenciar as consultas e lidar com as requisições HTTP. Ele foi desenvolvido utilizando **Node.js** com o framework **Express.js**, e utiliza o **SQLite** como banco de dados para armazenar as consultas.

#### **Rotas do Backend**:

1. **Listar Consultas**:
   - **GET `/api/consultations`**: Esta rota lista todas as consultas quando acessada por um **Admin** e apenas as consultas que o **Admin** decidiu tornar visíveis para o **User**. 
   - A rota aceita os seguintes parâmetros:
     - **role**: Define se a solicitação é feita por um **Admin** ou **User**.
     - **userId** (opcional): Utilizado apenas quando o **User** faz a solicitação para obter suas consultas.
   - Exemplo de retorno para um **Admin**:
     ```json
     [
       {
         "id": 1,
         "date": "2024-10-17",
         "doctor": "Dr. Almeida",
         "specialty": "Cardiologia",
         "status": "Confirmada",
         "userId": 1,
         "visibility": "visible"
       },
       {
         "id": 2,
         "date": "2024-10-20",
         "doctor": "Dr. Souza",
         "specialty": "Dermatologia",
         "status": "Pendente",
         "userId": 2,
         "visibility": "hidden"
       }
     ]
     ```

2. **Criar Consulta**:
   - **POST `/api/consultations`**: Esta rota permite criar uma nova consulta no sistema. Ela está acessível apenas para usuários com papel de **Admin**, e o **Admin** decide se a consulta será visível para o **User** através do campo de visibilidade.
   - Exemplo de corpo da requisição:
     ```json
     {
       "date": "2024-11-01",
       "doctor": "Dr. Almeida",
       "specialty": "Neurologia",
       "status": "Pendente",
       "userId": 2,
       "visibility": "visible"
     }
     ```
   - Exemplo de resposta:
     ```json
     { 
       "message": "Consulta criada com sucesso!", 
       "consultation": {
         "id": 3,
         "date": "2024-11-01",
         "doctor": "Dr. Almeida",
         "specialty": "Neurologia",
         "status": "Pendente",
         "userId": 2,
         "visibility": "visible"
       }
     }
     ```

#### **Porta do Backend**:
- O backend está rodando na porta **3000**: `http://localhost:3000`

### **Frontend**

O frontend foi construído utilizando **React Native Web** para simular o comportamento de uma aplicação mobile rodando no navegador.

#### **Principais Páginas e Funcionalidades**:

1. **Tela de Login**:
   - Na tela inicial, o usuário escolhe seu papel: **admin** ou **user**. Com base nessa escolha, o sistema carrega a lista de consultas adequada ao perfil.
   
2. **Tela de Listagem de Consultas**:
   - Exibe todas as consultas no caso do **admin** ou apenas as consultas permitidas para o **user**.
   - Cada consulta inclui: **Data**, **Médico**, **Especialidade**, **Status**, **Visibilidade**.

3. **Tela de Adição de Consulta**:
   - O admin pode acessar esta tela e adicionar uma nova consulta preenchendo os campos: **Data**, **Médico**, **Especialidade**, **Status**, **ID do Usuário** e **Visibilidade** (para decidir se o user poderá visualizar ou não).

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


## Integrantes do Grupo

- **Evelyn Cleto da Silva** - RM: 93026
- **Eduardo Kenji Pellichero Fujie** - RM: 92869
- **Roberto Claudio Castro dos Santos** - RM: 96162

