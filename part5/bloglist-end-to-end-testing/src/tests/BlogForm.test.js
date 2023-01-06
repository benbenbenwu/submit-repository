import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlogTest = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlogTest={createBlogTest} />)
  const showView = screen.getByText('new blog')
  await user.click(showView)


  const inputs = screen.getAllByRole('textbox')

  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'First class tests')
  await user.type(inputs[1], 'Robert C. Martin')
  await user.type(inputs[2], 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')

  await user.click(sendButton)

  expect(createBlogTest.mock.calls).toHaveLength(1)

  expect(createBlogTest.mock.calls[0][0].title).toBe('First class tests')
  expect(createBlogTest.mock.calls[0][0].author).toBe('Robert C. Martin')
  expect(createBlogTest.mock.calls[0][0].url).toBe('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')

})