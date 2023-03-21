import {getListAddress} from '../../utils/services';
import React, {useState, useEffect} from 'react';

function Address({formData, handleInputChange, name = 'address'}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getListAddress().then((rs) => setData(rs.data));
    }, []);
    return (
        <select name={name} value={formData[name] || formData.address} onChange={handleInputChange}>
            {data.map((e, i) => (
                <option key={i} value={e}>
                    {e}
                </option>
            ))}
        </select>
    );
}

export default Address;
