import React from 'react';

const RecomendacionItem = ({ nombre, recomendacion }) => {
    return (
        <div className="recomendacion-item">
            <h3>{nombre}</h3>
            <p>{recomendacion}</p>
        </div>
    );
};

export default RecomendacionItem;
