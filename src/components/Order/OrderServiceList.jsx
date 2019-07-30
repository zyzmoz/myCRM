import React from 'react';
import { FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import OrderServiceItem from './OrderServiveItem';

const OrderServices = () => {
  return (
    <div>
      <Button bsStyle="success">
        <Glyphicon glyph="star" />
        Incluir Serviço
      </Button>
      <OrderServiceItem />      
    </div>
  );
};

export default OrderServices;