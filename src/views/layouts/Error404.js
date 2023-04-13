import React from 'react';
import { Container } from 'react-bootstrap';

const Error404 = () => {
    return (
        <Container className='error404'>
        <div className='text-center '>
            <img alt="imagen error 404"  className='img-fluid' src="https://img.freepik.com/vector-premium/pizza-estado-vacio-error-404-ilustracion-plana_288067-137.jpg?w=740"></img>
        </div>
        </Container>
    );
};

export default Error404;