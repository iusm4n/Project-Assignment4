import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';

function Navbar2() {
  return (
    <>
    {/* <nav className="navbar">
        <ul >
          <li>
            <Link to="/">Get</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/delete">Delete</Link>
          </li>
          <li>
            <Link to="/update">Update</Link>
          </li>
        </ul>
      </nav>
    <Outlet/> */}

    <Navbar expand="lg" className="bg-body-tertiary"  data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Get</Nav.Link>
            <Nav.Link href="/post">Post</Nav.Link>
            <Nav.Link href="/delete">Delete</Nav.Link>
            <Nav.Link href="/update">Update</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet/>
    </>
  )
}

export default Navbar2