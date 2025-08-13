import fastify from "fastify"


const server = fastify()

// SEMPRE RETORNAR UM OBJETO

const courses = [
  { id: '1', title: 'React'},
  { id: '2', title: 'Javascript'},
  { id: '3', title: 'React Native'},
]

server.get('/courses', () => {
  return { courses }
})

server.get('/courses/:id', (request, reply) => {
  type Params = {
    id: string
    title: string
  }

  const { id } = request.params as Params

  const course = courses.find(course => course.id === id)

  if(course) {
    return { course }
  }

  return reply.status(404).send()
})

server.post('/courses', (request, reply) => {
  type Body = {
    title: string
  }

  const courseId = crypto.randomUUID()
  const { title } = request.body as Body

  if(!title) {
    return reply.status(400).send({ message: 'Título Obrigatório.'})
  }

  const course = {
    id: courseId,
    title
  }

  courses.push(course)

  return reply.status(201).send({ courseId })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})