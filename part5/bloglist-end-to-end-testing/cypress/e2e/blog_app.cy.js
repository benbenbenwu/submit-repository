describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('Blog Form is shown', function () {
    cy.contains('new blog').click()
    cy.contains('blogs')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.login('mluukkai', 'salainen')
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.login('mluukkai', 'sala')
      cy.contains('Wrong username or password')
    })
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.login('mluukkai', 'salainen')
    })

    it('a new note can be created', function () {
      cy.createBlog(
        'TDD harms architecture',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html')

    })
  })

  describe('like a blog', function () {
    beforeEach(function () {
      cy.login('mluukkai', 'salainen')
    })

    it('add a like to a blog', function () {
      cy.createBlog(
        'Type wars',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')

      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get('.likes').contains('likes 1')
    })
  })

  describe('delete a blog', function () {
    beforeEach(function () {
      cy.login('mluukkai', 'salainen')
    })

    it('delete a blog', function () {

      cy.createBlog(
        'Type wars',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.contains('delete success')
    })
  })

  /* describe('sort blogs', function () {
    beforeEach(function () {
      cy.login('mluukkai', 'salainen')
    })

    it('sort blogs', function () {
      cy.createBlogLike(
        'TDD harms architecture',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 2)
      cy.createBlogLike(
        'Type wars',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 1)
      cy.createBlogLike(
        "React patterns",
        "Michael Chan",
        "https://reactpatterns.com/", 3
      )
      cy.get('.blog').eq(0).should('title', 'React patterns')
      cy.get('.blog').eq(1).should('title', 'TDD harms architecture')
      cy.get('.blog').eq(2).should('title', 'Type wars')

    })
  }) */

})