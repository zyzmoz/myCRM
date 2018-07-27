import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './style.css';
import blankUser from '../../assets/img/user.png';

const Menu = ({auth, logout}) => {
  console.log(logout);
    
  return (
    <div className="menu">
      <div className="profile">
        <div className="profile-avatar">
          <img src={blankUser} alt="user"/>
        </div>
        <div className="profile-content">
          <span>
            {auth.name}
            <Glyphicon onClick={logout} glyph="log-out" style={{float: "right"}} />
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
            { auth.manager === 'S' &&
            <Link to="/user">
              <div className="menu-item">
                Usuários
              </div>
            </Link>
            }
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