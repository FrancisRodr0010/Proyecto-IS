import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
    return (
        <footer className="text-white mt-5 p-4 text-center" style={
            {backgroundColor: '#8ad654', 
                bottom: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',}
            }>
            <div className="container">
                <p className="mb-0">
                    © 2024 GreenManage. Todos los derechos reservados.
                </p>
                <p className="mb-0">
                    Desarrollado por Francisco Rodríguez y Luis Pivaral.
                </p>
                <p className="mb-0">
                    Contacto: francisco.rodriguez@galileo.edu, 21010442@galileo.edu
                </p>
            </div>
        </footer>
    );
};

export default Footer;
