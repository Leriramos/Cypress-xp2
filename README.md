# Automação de Testes com Cypress (Component Testing) - Componente ZipFinder

## Sobre o Projeto

Este repositório contém a automação de testes para o componente `ZipFinder` do projeto acadêmico **Movebee**. O `ZipFinder` é um componente React que permite consultar a cobertura de entrega com base em um CEP informado. Minha contribuição foi focada na automação de testes de componentes usando o **Cypress Component Testing**, testando o componente de forma isolada para garantir que ele funcione corretamente em diferentes cenários.

O projeto foi refatorado para seguir boas práticas de automação, e correções foram aplicadas para resolver problemas identificados durante o desenvolvimento, como o tratamento de elementos condicionais no `beforeEach`.

### Objetivos

- Automatizar testes para o componente `ZipFinder` utilizando o Cypress Component Testing.
- Validar cenários como busca de CEP válido, inválido, vazio e fora da área de cobertura em um ambiente isolado.
- Aplicar boas práticas de automação, como organização de testes, uso de constantes, comandos personalizados e simulação de API.

## Tecnologias Utilizadas

- **Cypress**: Framework de testes para automação (usando Component Testing).
- **React**: O componente `ZipFinder` foi desenvolvido em React (não por mim, mas pelo time do projeto).
- **Node.js**: Ambiente de execução para os testes.
- **Git**: Controle de versão.

## Estrutura do Projeto

Minha contribuição está localizada na pasta de automação de testes do componente `ZipFinder`. A estrutura relevante do projeto é a seguinte:

```plaintext
MOVEBEE/
├── web/
│   ├── src/
│   │   ├── components/  
│   │   │   └── ZipFinder/
│   │   │       ├── ZipFinder.jsx     # Componente React (desenvolvido pelo time) 
│   │   │       └── ZipFinder.cy.jsx   # Testes automatizados com Cypress Component Testing (minha contribuição)
│   ├── cypress/                       # Configurações e testes do Cypress
│   └── package.json                   # Dependências do projeto
└── README.md
