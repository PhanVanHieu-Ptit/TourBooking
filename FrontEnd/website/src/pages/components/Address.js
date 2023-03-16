import {getListAddress} from '../../utils/services';
import React, {useState, useEffect} from 'react';

function Address({formData, handleInputChange}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getListAddress().then((rs) => setData(rs.data));
    }, []);
    return (
        <select name='address' value={formData.address} onChange={handleInputChange}>
            {data.map((e, i) => (
                <option key={i} value={e}>
                    {e}
                </option>
            ))}
        </select>
    );
}

export default Address;
