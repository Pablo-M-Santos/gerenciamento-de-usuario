# Gerenciamento de Usuários

Este projeto foi desenvolvido para demonstrar um sistema de gerenciamento de usuários com **Vue 3**, **TypeScript** e **Vuetify**. A aplicação inclui funcionalidades de login, cadastro, listagem, edição e exclusão de usuários, com integração a uma API fake usando o **JSON Server**.

## Como Baixar e Instalar

### Passo 1: Clonar o Repositório

Clone o repositório para o seu ambiente local. Execute o seguinte comando no terminal:

```bash
git clone https://github.com/Pablo-M-Santos/gerenciamento-de-usuario.git
cd gerenciamento-de-usuario
```

## Passo 2: Instalar as Dependências

### Dentro do diretório do projeto, instale as dependências necessárias utilizando o npm:

```bash
npm install
```

## Passo 3: Configuração da API Fake

### Este projeto utiliza o JSON Server para simular uma API. Siga as instruções abaixo para configurá-lo:

Instale o JSON Server globalmente no seu ambiente:
```bash
npm install -g json-server
```

Crie um arquivo chamado db.json no diretório raiz do projeto e adicione o seguinte conteúdo inicial:

```bash
{
  "usuarios": [],
  "login": [
    { "id": 1, "usuario": "admin", "senha": "1234", "tipo": 1 },
    { "id": 2, "usuario": "comum", "senha": "5678", "tipo": 2 }
  ]
}
```

Inicie o servidor JSON com o comando abaixo para simular a API:
```bash
json-server --watch db.json --port 3000
```

Agora, o servidor estará rodando localmente na URL http://localhost:3000. A API fake está configurada com dois endpoints principais:

Usuários: http://localhost:3000/usuarios <br>
Login: http://localhost:3000/login

```bash
npm run dev
```

A aplicação será aberta em http://localhost:4000, onde você poderá acessar as funcionalidades do gerenciamento de usuários.



