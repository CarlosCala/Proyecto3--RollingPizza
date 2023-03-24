import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../config/axiosInit";



const ProductDetail = ({  URL, getApi }) => {
      //steate
  const [product, setProduct] = useState({});
  //useParams
  const { _id } = useParams();
  //variables de referencia - references

  const navigate = useNavigate();

  //llamado a la api para obtener el producto con su id

  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //peticion con axios
      const res = await axios.get(`${URL}/${_id}`);
      const productApi = await res.data;
      setProduct(productApi);
    } catch (error) {
      console.log(error);
    }
  };

    return (
           
        <Container className='bg-productDetail' >
            <Row className="justify-content-md-center mt-5 bgCardDetail">
            <Card style={{ width: '25rem', height: '30rem' }} className='bgCardDetail bg-black text-white'>
      <Card.Img variant="top" src={product.urlImg} className="imgCardDetail mt-1"/>
      <Card.Body className='text-center'>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text >
        <Link className="btn" 
        to={'*'}>
            buy
            </Link>
      </Card.Body>
    </Card>
            </Row>
        </Container>

    );
};

export default ProductDetail;