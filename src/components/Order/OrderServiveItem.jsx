import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

const OrderServiceItem = () => {
  return (
    <div className="transportation">
      <h4>Intinerário</h4>
      <Row>
        <Col xs={9} md={6}>
          <label>Compania</label>
          <p>S/A</p>
        </Col>
        <Col xs={9} md={6}>
          <label>Modal</label>
          <p>Aereo</p>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={4}>
          <label>Número Voo</label>
          <p>123456</p>
        </Col>
        <Col xs={6} md={4}>
          <label>Horário Saida</label>
          <p>{moment().format('DD/MM/YYYY HH:mm:ss')}</p>
        </Col>
        <Col xs={6} md={4}>
          <label>Horário Chegada</label>
          <p>{moment().format('DD/MM/YYYY HH:mm:ss')}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={8} md={6}>
          <label>Origem</label>
          <p>Cidade A</p>
        </Col>
        <Col xs={8} md={6}>
          <label>Destino</label>
          <p>Cidade B</p>
        </Col>
      </Row>
      <Row>
        <strong>Detalhes</strong>  
        <table  style={{margin:"8px"}}>                    
          <tr>
            <td style={{margin: "8px", width:"200px"}}>Cidade A</td>
            <td style={{margin: "8px",width: "200px"}}>Cidade B</td>
            <td style={{margin: '8px',width: "200px"}}>{moment().format('DD/MM/YYYY HH:mm:ss')}</td>
          </tr>
          <tr>
            <td style={{margin: "8px", width:"200px"}}>Cidade C</td>
            <td style={{margin: "8px",width: "200px"}}>Cidade D</td>
            <td style={{margin: '8px',width: "200px"}}>{moment().format('DD/MM/YYYY HH:mm:ss')}</td>
          </tr>
        </table>
      </Row>
    </div>
  );
};

export default OrderServiceItem;