import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";
import Delete from "./Delete";
import Navbar from "../Navbar";
import axios from "axios";
import Edit from "./Edit";
import Image from "./Image";
import AddToInventory from "../Inventory/AddToInventory";


export class AgGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "guest",
      columnDefs: [
        {
          headerName: "Name",
          field: "name",
          resizable: true,
          width: 150,

        },
        {
          headerName: "Company",
          field: "companyTitle",
          resizable: true,
          width: 150,
        },
        {
          headerName: "Price",
          field: "price",
          resizable: true,
          width: 100,
        },
        {
          headerName: "Image",
          field: "image",
          resizable: true,
          width: 100,
          cellRendererFramework: (params) => {
            return <Image rowData={params.value} />;
          },
        },
        {
          headerName: "Stock",
          field: "stockAvailable",
          width: 60
        },
        {
          headerName: "id",
          field: "_id",
          hide: true,
        },
        {
          headerName: "Add",
          field: "addToInventory",
          resizable: true,
          hide: true,
          width: 60,
          cellRendererFramework: (params) => {
            return <AddToInventory rowData={params} />;
          },
        },
        {
          headerName: "Action",
          field: "profile_edit",
          resizable: true,
          width: 60,
          cellRendererFramework: (params) => {
            return <Edit callBackEdit={this.callBackEditProduct} rowData={params.value} />;
          },
          // cellRendererFramework: Edit,
          // cellRendererParams: {
          //   callBackEdit: this.callBackEditProduct,
          // },
        },
        {
          headerName: "Action",
          field: "profile_delete",
          resizable: true,
          resizable: true,
          width: 59,
          cellRendererFramework: Delete,
          cellRendererParams: {
            callBackDelete: this.callBackDeleteProduct,
          },
        },

      ],
      rowData: [],
    };
  }
  callBackAddProduct = () => {

  };

  callBackDeleteProduct = () => {
    let selectedRow = this.gridApi.getSelectedRows();
    let id = selectedRow[0]._id;
    axios.delete("http://localhost:8080/api/products/" + id).then((res) => {
      if (res.status === 200) {
        this.gridApi.updateRowData({
          remove: selectedRow,
        });
      }
      console.log(res, "respocme dleetet");
    });
  };

  callBackEditProduct = (product) => {
    let selectedRow = this.gridApi.getSelectedNodes();
    axios
      .put(
        "http://localhost:8080/api/products/" + selectedRow[0].data._id,
        product
      )
      .then((res) => {
        if (res.status === 200 && res.data !== "400" && res.data !== "401") {
          selectedRow[0].updateData(product);
          window.alert(`product updated`);
        } else if (res.data === "400") {
          window.alert("Product with same name already exits");
        } else {
          console.log(res)
          window.alert("invalid product details");
        }
      });
  };
  componentDidMount() {
    let user = JSON.parse(window.localStorage.getItem("currentUser"));
    fetch("http://localhost:8080/api/products")
      .then((result) => result.json())
      .then((res) =>
        this.setState(
          {
            rowData: res,
            role: user.role,
          },
          () => {
            //console.log(this.state.rowData,"from ag-grid")
            if (user.role === "User" || user.role === "Guest") {
              this.gridColumnApi.setColumnVisible("profile_edit", false);
              this.gridColumnApi.setColumnVisible("profile_delete", false);
              this.gridColumnApi.setColumnVisible("stockAvailable", false);
              this.gridColumnApi.setColumnVisible("addToInventory", true);
            } else if (user.role === "Admin") {
              this.gridColumnApi.setColumnVisible("profile_edit", true);
              this.gridColumnApi.setColumnVisible("profile_delete", true);
            } else if (user.role === "Manager") {
              this.gridColumnApi.setColumnVisible("profile_delete", false);
              this.gridColumnApi.setColumnVisible("profile_edit", true);
            }
          }
        )
      );
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div
          className="ag-theme-balham"
          style={{
            height: "70vh",
            width: "90%",
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            rowSelection="single"
            animateRows="true"
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default AgGrid;
