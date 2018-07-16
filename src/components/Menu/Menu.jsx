import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './style.css';
import blankUser from '../../assets/img/user.png';

const Menu = () => {
  return (
    <div className="menu">
      <div className="profile">
        <div className="profile-avatar">
          <img src={blankUser} alt="user"/>
        </div>
        <div className="profile-content">
          <span>
            Admin
            <Glyphicon glyph="cog" style={{float: "right"}} />
          </span>
        </div>
      </div>
      <h3 className="menu-title">Menu</h3>
      <div className="menu-group">
        <Link to="/">
          <div className="menu-item">
            Início
          </div>
        </Link>
        <div className="menu-item">
          Contatos
        </div>
        <div className="menu-item">
          Tarefas
        </div>
        <div className="menu-item">
          Oportunidades
        </div>
        <div className="menu-item">
          Cadastros
          <div className="menu-dropdown">
            <Link to="/customer">
              <div className="menu-item">
                Clientes
              </div>
            </Link>
            <div className="menu-item">
              Usuários
            </div>
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