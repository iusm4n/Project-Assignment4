import {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'axios'
import  axios  from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Get() {
const [users, setUsers] = useState([])
const getAll = async() => {
    axios.get('http://localhost:8000/api/users/').then((response) => {
        setUsers(response.data)
})
}

const getone = async() => {
    const mail =  prompt("Enter Email of user to get details")
    if (mail === '') 
    {
      setUsers([])
      return
    }
    axios.get('http://localhost:8000/api/users/' + mail).then((response) => {
        setUsers(response.data)
})
}
  return (
    <Container>
        <h1 className='mt-10'>users</h1>
        <Row>
        { users.map((user) => (<Display name={user.name} email={user.email} address={user.address} ID={user._id}/>
    
        ))}

</Row>
            <Button onClick={getAll}>Get All users</Button>   
            <Button onClick={getone}>Get One user</Button>   
    </Container>
  )
}

function Display({name, email, address}) {
    return (
        <Col>
        <Card data-bs-theme="dark">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Email : {email}</Card.Text>
            <Card.Text>Address : {address}</Card.Text>
          </Card.Body>
        </Card>

        </Col>
      );

}

export default Get