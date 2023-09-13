import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const HeaderCell = ({ column, children, sortConfig, requestSort, isSortable }) => {
    // const isSortable = true;
    const isSortColumn = sortConfig.key === column;

    return (
        <th
            onClick={() => isSortable && requestSort(column)}
            style={{ cursor: isSortable ? 'pointer' : 'default' }}
        >
            {children}
            {isSortable && isSortColumn && (
                <span>
                    {sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />}
                </span>
            )}
            {isSortable && !isSortColumn && (
                <span>
                    <FaSort />
                </span>
            )}
        </th>
    );
};

export default HeaderCell;
