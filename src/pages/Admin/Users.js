import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
//import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../apicalls/users";
import { UpdateUserStatus } from "../../apicalls/users";
//import { DeleteProduct } from "../../../apicalls/products";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";

function Users() {
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));

      if (response.success) {
        setUsers(response.products);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null);
      dispatch(SetLoader(false));

      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  /*const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
 */
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYY hh:mm A"),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
    /*{
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
          </div>
        );
      },
    },*/
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* <div className="flex justify-end mb-2">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          //selectedProduct={selectedProduct}
          //getData={getData}
        />
      )}
      */}
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;
