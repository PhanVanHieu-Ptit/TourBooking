import {getListAddress} from '../../utils/services';
import React, {useState, useEffect, useMemo} from 'react';

function Address({formData, handleInputChange}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getListAddress().then((rs) => setData(rs.data));
    }, []);
    const memoizedOptions = useMemo(() => data, [data]);
    return (
        <select name='address' value={formData.address} onChange={handleInputChange}>
            {memoizedOptions.map((e, i) => (
                <option key={i} value={e}>
                    {e}
                </option>
            ))}
        </select>
    );
}

export default Address;
