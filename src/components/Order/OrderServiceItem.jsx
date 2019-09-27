import React from 'react';

const OrderServiceItem = ({ service }) => {
  return (
    <div style={styles.container}>
      <div style={styles.edit}>
        {service.description}
      </div>
      <div style={styles.date}>
        {service.starts_at}
      </div>
      <div style={styles.date}>
        {service.ends_at}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    alignText: 'left'

  },
  edit:{
    width: '450px'
  },
  date:{
    width: '100px'
  }
}

export default OrderServiceItem;