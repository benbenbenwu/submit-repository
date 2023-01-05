import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders title and author', () => {
  const blog = {
    title: "First class tests",
    author: "Robert C. Martin"
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('First class tests')
  const author = screen.getByText('Robert C. Martin')

  expect(title).toBeDefined()
  expect(author).toBeDefined()

})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: "First class tests",
    author: "Robert C. Martin"
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} testHandleView={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const title = screen.getByText('First class tests')
  const author = screen.getByText('Robert C. Martin')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: "First class tests",
    author: "Robert C. Martin"
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} testHandleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

