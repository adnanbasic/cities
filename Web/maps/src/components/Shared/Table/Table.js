import React from 'react';

function Locations({ columns = [], data = [], handleClick }) {
    
    const renderHeader = () => {
        if (columns) {
            return columns.map(x => {
                return (<th scope="col" key={x.displayValue}>{x.displayValue}</th>);
            });
        }
    };

    const renderBody = () => {
        if (data) {
            return data.map(row => {
                return (
                <tr key={row.id} 
                className={handleClick? 'clickable': ''}
                onClick={() => handleClick && handleClick(row)}>
                    {renderRow(row)}
                </tr>);
            });
        }
    };

    const renderRow = (row) => {
        if (columns) {
            return columns.map(x => {
            return (<td key={`${x.prop}-${x.id}`}>{x.renderer(row)}</td>);
            });
        }
    }
    
    return (<table className="table">
    <thead>
      <tr>{renderHeader()}
      </tr>
    </thead>
    <tbody>
        {renderBody()}
    </tbody>
  </table>);
}
export default Locations;