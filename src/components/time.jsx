/*import React from 'react';

const Time = ({ weather }) => {
    if (!weather || !weather.dt || !weather.name) {
        return null; 
    }

    const { dt } = weather;
    const localTime = new Date(dt * 1000).toLocaleTimeString();

    return (
        <div className='area'>
            <div className='time'>
                <h3>Time : {localTime}</h3>
            </div>

        </div>
    );
};

export default Time; */