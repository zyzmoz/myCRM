import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({activePage, pages, handlePageChange, customers }) => {
  let items = [];
  let lastId = 0;
  if (customers) lastId = customers[customers.length-1].id;
  for (let i = 0; i < pages; i++) {
    items.push(<Pagination.Item 
      active={(i + 1) === activePage} 
      onClick={() =>handlePageChange(i+1,i*10)}
      key={i}>{i + 1}</Pagination.Item>)
  }
  return (
    <div>
      <Pagination>
        {
          items
        }
      </Pagination>
    </div>
  );
};




export default PaginationComponent;