import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder/>)

    cy.viewport(1280, 768)


    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')
    
  });

  it('Deve buscar um cep na area de cobertura', () => {

    const address = {
      street: 'Rua Joaquim Floriano',
      district: 'Itaim Bibi',
      city: 'São Paulo/SP',
      zipcode: '04534-011'

    }

    cy.zipFind(address, true)



    cy.get('[data-cy=street]')
      .should('have.text', address.street)

    cy.get('[data-cy=district]')
      .should('have.text', address.district)

    cy.get('[data-cy=city]')
      .should('have.text', address.city)

    cy.get('[data-cy=zipcode]')
      .should('have.text', address.zipcode)
  })
  it('Cep deve ser obrigatório', ()=> {
    
    cy.get('@submitCep').click()

    cy.get('#swal2-title')
      .should('have.text', 'Preencha algum CEP')

    cy.get('.swal2-confirm').click()
  })
  it('Cep inválido', () => {

    const address = {zipcode: '0000000'}

    cy.zipFind(address)

    cy.get('[data-cy="notice"]')
      .should('be.visible')
      .should('have.text', 'CEP no formato inválido.')


  })

  it('Cep fora da área de cobertura', () => {

    const zipcode = '00000000'

    cy.get('@inputCep').type(zipcode)
    cy.get('@submitCep').click()

    cy.get('[data-cy="notice"]')
      .should('be.visible')
      .should('have.text', 'No momento não atendemos essa região.')


  })
})

Cypress.Commands.add('zipFind', (address, mock = false) => {
  
  if(mock) {

    cy.intercept('GET', '/zipcode/*', {
      statusCode: 200,
      body: {
        cep: address.zipcode,
        logradouro: address.street,
        cidade_uf: address.city,
        bairro: address.district
      }
    }).as('getZipCode')

  }
  

  cy.get('@inputCep').type(address.zipcode)
  cy.get('@submitCep').click()

  if(mock) {

    cy.wait('@getZipCode')
  }

  
})