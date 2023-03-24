import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// import {
//   validateCategory,
//   validatePrice,
//   validateProductName,
//   validateUrl,
// } from "../../helpers/validateFields";
import axios from "../../../../config/axiosInit";

const UserEdit = ({ UrlUser, getApiUser }) => {
  //steate
  const [user, setUser] = useState({});
  //useParams
  const {_id} = useParams();
  console.log('soy el id', _id,UrlUser );
  //variables de referencia - references
  const userNameRef = useRef("");
  const userEmailRef = useRef("");
  const navigate = useNavigate();

  //llamado a la api para obtener el usuario con su id

  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //peticion con axios
      const res = await axios.get(`${UrlUser}/${_id}`);
      const userApi = await res.data;
      console.log("===================");
      console.log(userApi);
      console.log("===================");

      setUser(userApi);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(productNameRef.current);
    //validaciones
    // if(
    // !validateProductName(productNameRef.current.value) ||
    // !validatePrice(productPriceRef.current.value) ||
    // !validateUrl(productImgRef.current.value) ||
    // !validateCategory(product.category)
    // )
    //  {
    //    Swal.fire("oops! ", "Some data is invalid","error")
    //    return;
    //  }// guardar el objeto
    const userUpdate = {
      name: userNameRef.current.value,
      email: userEmailRef.current.value,
      status: user.status,
      admin: user.admin,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // const res = await fetch(`${UrlUser}/${_id}`, {
          //   method: "PUT",
          //   headers: {
          //     "content-type": "application/json",
          //   },
          //   body: JSON.stringify(userUpdate),
          // });

          const res = await axios.put(`${UrlUser}/${_id}` , userUpdate,{
            headers: {
              "content-type": "application/json",
            }})
          console.log(userUpdate, 'que soy');

          if (res.status === 200) {
            Swal.fire("Update", "your file has been updated", "succes");
          }
       
           getApiUser();
          navigate("/user/table");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <div className="EditUser">
        <h1 className="display-5">Edit User</h1>
        </div>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User name* </Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.name}
              ref={userNameRef}
              
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="....@gmail.com"
              defaultValue={user.email}
              ref={userEmailRef}
              disabled
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password*</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.password}
              ref={userPassword}
              disabled
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>status*</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={({ target }) =>
                setUser({ ...user, status: target.value })
              }
            >
              <option>select status </option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Admin*</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={({ target }) =>
                setUser({ ...user, admin: target.value })
              }
            >
              <option>Select rol </option>
              <option value="administrador">Admin</option>
              <option value="usuario">Usuario</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-orange">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default UserEdit;
