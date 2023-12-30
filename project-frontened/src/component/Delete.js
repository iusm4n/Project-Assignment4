import {useRef} from 'react'
import Container from 'react-bootstrap/Container'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Delete() {
    const email = useRef();

    const handleSubmit = () => {
          axios({
              method: 'delete',
              url: 'http://localhost:8000/api/users/' + email.current.value,
              headers: {}, 
            });

    }
  return (
 <Container className="mt-5" data-bs-theme="dark">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={email} placeholder="Email" />
        </Form.Group>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </Form>
    </Container>
  )
}

export default Delete