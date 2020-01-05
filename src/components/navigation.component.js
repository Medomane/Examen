import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ infos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(infos.size / infos.per_page); i++) {
    pageNumbers.push(i);
  }
  return (
  <nav>
    <ul className="pagination justify-content-center">
      {pageNumbers.map(number => (
        <li key={number} className={(parseInt(number) === infos.page)?'page-item active':'page-item'}>
          <Link onClick={() => paginate(number+'/'+infos.per_page)} to={'/users/'+number+'/'+infos.per_page} className="page-link">{number}</Link> 
        </li>
      ))}
    </ul>
  </nav>
  );
};
export default Pagination;