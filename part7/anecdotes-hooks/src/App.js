import { useState } from 'react'
import {
  Routes, Route, Link,
  useParams,
  useNavigate
} from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {

  const id = useParams().id
  console.log(id);
  const anecdote = anecdotes.find(a => a.id === Number(id))


  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
      <p>{anecdote.votes}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`a new anecdote ${content.value} created!!`)
    setTimeout(() => {
      setNotification('')
      navigate('/')
    }, 3000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    console.log(e);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes([...anecdotes, anecdote])
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Routes>
        <Route path='/anecdote/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
