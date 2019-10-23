
const testQuery = `{
longDescriptionType {
  id
  image
  hasArgs
  test {
    id
    isTest
    __typename
  }
 }
}`

const mockSuccess = {
  "data": {
    "longDescriptionType": {
      "id": "abc123",
      "image": "/images/logo.svg",
      "hasArgs": "{\"defaultValue\":\"test default value\"}",
      "test": {
        "id": "abc123",
        "isTest": true,
        "__typename": "Test"
      }
    }
  }
}


describe('GraphiQL On Initialization', function() {
  it('Renders without error', function() {
    const containers = [
      '#graphiql', '.graphiql-container', '.topBarWrap', '.editorWrap', '.queryWrap', '.resultWrap', '.variable-editor'
    ]
    cy.visit(`/?query=${testQuery}`)
    containers.forEach(cSelector => cy.get(cSelector).should('be.visible'))
  })

  it('Executes a GraphQL query over HTTP that has the expected result', function() {
    cy.get('.execute-button').click()
    cy.window().then((w) => {
      cy.expect(JSON.parse(w.g.resultComponent.viewer.getValue())).to.deep.equal(mockSuccess)
    })
  })

  it('Toggles doc pane off', function() {
    // there are two components with .docExplorerHide, one in query history
    cy.get('.docExplorerWrap button.docExplorerHide').click()
    cy.get('.doc-explorer').should('not.exist')
  })

  it('Toggles doc pane back on', function() {
    cy.get('.docExplorerShow').click()
    cy.get('.doc-explorer').should('be.visible')
  })
 
})
