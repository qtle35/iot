import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { format } from 'date-fns';
import { orderBy } from 'lodash';
import HeaderCell from './help/HeaderCell';
import Pagination from './help/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const Action = () => {
    const [actionData, setActionData] = useState([]);
    const [timeRange, setTimeRange] = useState({ start: null, end: null });
    const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 50;

    const sortedData = useMemo(() => {
        const sortableData = [...actionData];
        return orderBy(sortableData, [sortConfig.key], [sortConfig.direction]);
    }, [actionData, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        axios.get('http://localhost:3001/action')
            .then(response => {
                setActionData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const filterByTimeRange = () => {
        const filteredData = actionData.filter(data => {
            const timestamp = new Date(data.time).getTime();
            const startTime = timeRange.start ? new Date(timeRange.start).getTime() : 0;
            const endTime = timeRange.end ? new Date(timeRange.end).getTime() : Infinity;
            return timestamp >= startTime && timestamp <= endTime;
        });
        setActionData(filteredData);
    };

    const clearTimeFilter = () => {
        setTimeRange({ start: null, end: null });
        axios.get('http://localhost:3001/action')
            .then(response => {
                setActionData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const displayedData = sortedData.slice(firstRowIndex, lastRowIndex);
    return (
        <div className="container mt-4">
            <h2>History Data</h2>
            <div className="mb-4">
                <label>Time Range:</label>
                <div className="d-flex align-items-center">
                    <input
                        type="datetime-local"
                        value={timeRange.start || ''}
                        onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
                    />
                    <span className="mx-2">to</span>
                    <input
                        type="datetime-local"
                        value={timeRange.end || ''}
                        onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
                    />
                    <button className="btn btn-primary mx-2" onClick={() => filterByTimeRange()}>Filter</button>
                    <button className="btn btn-secondary" onClick={() => clearTimeFilter()}>Clear Filter</button>
                </div>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <HeaderCell column="time" sortConfig={sortConfig} requestSort={requestSort} isSortable={true}>Time</HeaderCell>
                        <HeaderCell column="temperature" sortConfig={sortConfig} requestSort={requestSort} isSortable={false}>Name</HeaderCell>
                        <HeaderCell column="humidity" sortConfig={sortConfig} requestSort={requestSort} isSortable={false}>Message</HeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((data, index) => (
                        <tr key={index}>
                            <td>{format(new Date(data.time), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{data.name}</td>
                            <td>{data.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedData.length / rowsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Action;
