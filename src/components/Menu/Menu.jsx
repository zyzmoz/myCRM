import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Menu = () => {
  return (
    <div className="menu">
      <h3 className="menu-title">Menu</h3>
      <div className="menu-group">
        <Link to="/">
          <div className="menu-item">
            Início
          </div>
        </Link>
        <div className="menu-item">
          Cadastros
          <div className="menu-dropdown">
            <Link to="/customer">
              <div className="menu-item">
                Clientes
          </div>
            </Link>
          </div>
        </div>

        {/* <div className="menu-item">
          Usuários
          <div className="menu-dropdown">
            <div className="menu-item">
              Teste
            </div>
          </div>
        </div> */}
      </div>
      <div className="menu-footer">
        v1.0.0b
      </div>
    </div>
    // <Navbar inverse  staticTop>
    //   {/* <Navbar.Header> */}
    //     {/* <Navbar.Brand>
    //     <a href="https://github.com/kecorbin/react-collins-ui">React-Bootstrap</a>
    //   </Navbar.Brand>
    //   <Navbar.Toggle /> */}
    //   {/* </Navbar.Header> */}
    //   <Navbar.Collapse>
    //     <Nav>
    //       <LinkContainer to="/">
    //         <NavItem eventKey={1}>Inicio</NavItem>
    //       </LinkContainer>
    //       <LinkContainer to="/customer">
    //         <NavItem eventKey={2} href="/">Clientes</NavItem>
    //       </LinkContainer>
    //       {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    //       <MenuItem eventKey={3.1}>Action</MenuItem>
    //       <MenuItem eventKey={3.2}>Another action</MenuItem>
    //       <MenuItem eventKey={3.3}>Something else here</MenuItem>
    //       <MenuItem divider />
    //       <MenuItem eventKey={3.3}>Separated link</MenuItem>
    //     </NavDropdown> */}
    //     </Nav>
    //     {/* <Nav pullRight>
    //     <NavItem eventKey={1} href="#">Link Right</NavItem>
    //     <NavItem eventKey={2} href="#">Link Right</NavItem>
    //   </Nav> */}
    //   </Navbar.Collapse>
    // </Navbar>
  );
};

export default Menu;