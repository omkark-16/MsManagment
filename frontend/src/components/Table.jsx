import React from 'react';

const Table = ({ title, data, handleStatusChange }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="table-container">
      <h3>{title} Priority</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Done</th>
              <th>Email 1</th>
              <th>Date</th>
              <th>Value 1</th>
              <th>Email 2</th>
              <th>Phone/Details</th>
              <th>Value 2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={item.status === 'done' ? 'done' : ''}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.status === 'done'}
                    onChange={() => handleStatusChange(item.id, item.status)}
                  />
                </td>
                <td>{item.email1}</td>
                <td>{item.date}</td>
                <td>{item.value1}</td>
                <td>{item.email2}</td>
                <td>{item.phone}</td>
                <td>{item.value2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;