/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const TableNavigation = ({ input, handleSubmit, totalCount, profilesСount }) => {
  console.log(totalCount);
  const maxNumber = Math.ceil(totalCount / profilesСount);
  const items = [];
  for (let number = 1; number <= maxNumber; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          console.log(number);
          input.onChange(number);
          handleSubmit();
        }}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <div>
        <Pagination>
          <Pagination.First />
          {items}
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};

export default TableNavigation;
