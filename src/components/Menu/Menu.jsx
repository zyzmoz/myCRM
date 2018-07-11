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
      </div>
      <div className="menu-footer">
        v1.0.0b
      </div>
    </div>   
  );
};

export default Menu;