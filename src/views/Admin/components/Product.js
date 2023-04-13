import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const Product = ({ product, URL, getApi }) => {
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${URL}/${_id}`);

          if (res.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            //recargar la pag
            getApi();
          }
        } catch (error) {
          // mostrar un swet alert con el error
          console.log(error);
        }
      }
    });
  };
  ////////////////////////////////////////////////

  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.productName}</td>
      <td>${product.price}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link
            to={`/product/edit/${product._id}`}
            className=" btn btn-warning mx-1 text-decoration-none text-center btnProductTable"
          >
            Update
          </Link>
          <button
            className="btn btn-danger mx-1 btnProductTable"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
