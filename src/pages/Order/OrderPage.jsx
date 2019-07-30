import React from 'react';
import OrderList from '../../components/Order/OrderList';
import moment from 'moment';

const vendas = [{
  id: 1,
  customer_id: 1,
  customer_name: 'TESTE',
  created_at: moment().format('DD/MM/YYYY'),  
  starts_at: moment().format('DD/MM/YYYY'),
  ends_at: moment().format('DD/MM/YYYY'),
  created_by: 1,
  services: [
    {
      type: 'Tickets',
      description: 'Vancouver - Araras',
      company: 'Code Inc.',
      unique_id: 'Bla bla bla',
      starts_at: moment().format('DD/MM/YYYY'),
      ends_at: moment().format('DD/MM/YYYY'),
      details: 'Details'
    }
  ]
}]

const OrderPage = () => {
  return (
    <div className="padding window">
      <h3>Vendas</h3>
      <OrderList sales={vendas}/>
    </div>
   
    
  );
};

export default OrderPage;