import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = (props) => {
    return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="menu-name">TLearn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activekey={"/home"}>
            <Nav.Link href="/home" className='menu'>Trang chủ</Nav.Link>
            <Nav.Link href="/khoahoc" className='menu'>Khóa học</Nav.Link>
            <Nav.Link href="/timetable" className='menu'>Time Table</Nav.Link>

            {/* 
            <NavDropdown title="Khóa học" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">C/C++</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">HTML</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">CSS</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">JAVa Script</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">Python</NavDropdown.Item>
            </NavDropdown> 
            <Nav.Link href="https://www.facebook.com/n.thetuan/" target="_blank" className='menu'>Liên hệ</Nav.Link>
            */}

            <Nav.Link href="/tintuc"className='menu'>Tin tức</Nav.Link>
          </Nav>
          <Nav className="ml-auto"> {/* Thêm một Nav mới để chỉ định căn phải */}
            <Nav.Item>
              <Nav.Link href="/login" className="menu">Login/Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}

export default Header;