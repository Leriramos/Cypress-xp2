import React from 'react'
import ZipFinder from './ZipFinder'

const VALID_ADDRESS = {
  zipcode: '04534-011',
  street: 'Rua Joaquim Floriano',
  district: 'Itaim Bibi',
  city: 'São Paulo/SP'
}

const INVALID_CEP = '0000000'
const OUT_OF_COVERAGE_CEP = '00000000'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder />)
    cy.viewport(1280, 768)

    // Define Alias
    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')
    cy.get('[data-cy=street]').as('street')
    cy.get('[data-cy=district]').as('district')
    cy.get('[data-cy=city]').as('city')
    cy.get('[data-cy=zipcode]').as('zipcode')
    

  });

  it('deve exibir os detalhes do endereço para um CEP válido na área de cobertura', () => {
    cy.zipFind(VALID_ADDRESS, true)
  

    cy.get('@street').should('have.text', VALID_ADDRESS.street)
    cy.get('@district').should('have.text', VALID_ADDRESS.district)
    cy.get('@city').should('have.text', VALID_ADDRESS.city)
    cy.get('@zipcode').should('have.text', VALID_ADDRESS.zipcode)
    cy.get('[data-cy=notice]').should('not.exist')
    
  })
  it('deve exibir uma mensagem de erro quando o CEP estiver vazio', () => {
    cy.get('@submitCep').click()

    cy.get('#swal2-title').should('have.text', 'Preencha algum CEP')
    cy.get('.swal2-confirm').click()
  })

  it('deve exibir uma mensagem de erro para um CEP com formato inválido', () => {

    cy.zipFind({zipcode: INVALID_CEP})

    cy.get('[data-cy=notice]')
      .should('be.visible')
      .should('have.text', 'CEP no formato inválido.')
  })

  it('deve exibir uma mensagem para um CEP fora da área de cobertura', () => {
    cy.zipFind({zipcode: OUT_OF_COVERAGE_CEP})

    cy.get('[data-cy=notice]')
      .should('be.visible')
      .should('have.text', 'No momento não atendemos essa região.')

  })
})

Cypress.Commands.add('zipFind', (address, mock = false) => {

  if (mock) {
    cy.intercept('GET', `/zipcode/${address.zipcode}`, {
      statusCode: 200,
      body: {
        cep: address.zipcode,
        logradouro: address.street || '',
        cidade_uf: address.city || '',
        bairro: address.district || ''
      }
    }).as(`getZipCode-${address.zipcode}`)

  }

  cy.get('@inputCep').clear().type(address.zipcode)
  cy.get('@submitCep').click()

  if (mock) {
    cy.wait(`@getZipCode-${address.zipcode}`)
  }
})