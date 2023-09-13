import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <li
                        key={page}
                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                    >
                        <button className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;