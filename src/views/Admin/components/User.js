import React, { useState } from "react";
// import { act } from "react-dom/test-utils";
import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "../../../config/axiosInit";

const User = ({ user, UrlUser, getApiUser }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.status}</td>
      <td>{user.admin}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link
            to={`/user/edit/${user.id}`}
            className="btn-orange mx-1 text-decoration-none text-center"
          >
            Update
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default User;
