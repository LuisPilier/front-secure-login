// RestrictedRouteComponent.js

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function RestrictedRouteComponent() {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/restricted-route', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError(error.response.data.error);
            }
        };

        if (token) {
            fetchData();
        }

    }, [token]);

    return (
        <div>
            <h2>Restricted Route</h2>
            {data && <p>{`Welcome, ${data.username}!`}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default RestrictedRouteComponent;
