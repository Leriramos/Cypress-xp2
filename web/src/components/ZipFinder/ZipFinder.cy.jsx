import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ZipFinder />)
  })
})