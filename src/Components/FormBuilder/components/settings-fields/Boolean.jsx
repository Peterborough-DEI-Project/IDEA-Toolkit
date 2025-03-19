import React from 'react';

function Boolean({value, onChange}) {
    const handleChange = (e) => {
        onChange(e.target.checked)
    }
    return (
        <input type="checkbox" onChange={handleChange} checked={String(value).toLowerCase() === 'true'}/>
    );
}

export default Boolean;