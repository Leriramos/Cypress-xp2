import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder/>)

    cy.viewport(1920, 1080)


    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')
    
  });



  it('renders', () => {

    const address = {
      street: 'Rua Joaquim Floriano',
      district: 'Itaim Bibi',
      city: 'São Paulo/SP',
      zipcode: '04534-011'

    }


    cy.get('@inputCep').type(address.zipcode)
    cy.get('@submitCep').click()

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
  })
})