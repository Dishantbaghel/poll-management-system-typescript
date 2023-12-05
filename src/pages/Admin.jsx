import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/AdminSlice";
import { dispatch } from "../redux/Store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { deletePoll } from "../redux/reducers/DeletePollSlice";
import { deleteOption } from "../redux/reducers/DeleteOptionSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, TablePagination } from "@mui/material";
import "./admin.css";

const Admin = () => {
  const [deletePollTitle, setDeletePollTitle] = useState(null); 
  const [deletePollOption, setDeletePollOption] = useState(null);

  const listItems = useSelector((state) => state.AdminSlice.data);
  const [page, setPage] = useState(() => {
    const storedPage = JSON.parse(localStorage.getItem("page"));
    return storedPage || 0;
  });

  const navigate = useNavigate()
  const [rowsPerPageOption, setRowsPerPageOption] = useState([5, 10, 15]);

  const row = () => {
    if (localStorage.getItem("rowpage")) {
      return JSON.parse(localStorage.getItem("rowpage"));
    }
    return 5;
  };
  const [rowPerPage, setRowPerPage] = useState(row());
  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("page"));
    if (data) {
      setPage(parseInt(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  const deleteSingleOption = useSelector(
    (state) => state.DeleteOptionSlice.isLoading
  );
  const deleteSinglePoll = useSelector(
    (state) => state.DeletePollSlice.isLoading
  );

  const add = useSelector((state) => state.AddPollSlice.isLoading);
  const addOption = useSelector((state) => state.AddOptionSlice.isLoading);
  const editTitle = useSelector((state) => state.OptionsSlice.isLoading);

  const isLoading = add || addOption || editTitle;

  const [open, setOpen] = useState(isLoading);

  useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);

  useEffect(() => {
    dispatch(fetchedAllPolls());
  }, [deleteSingleOption, deleteSinglePoll, add, addOption, editTitle]);

  const handleDelete = (id) => {
    setDeletePollTitle(id);
    dispatch(deletePoll(id));
  };

  const handleDeleteOption = (id, opt) => {
    setDeletePollOption(opt);
    dispatch(deleteOption(id, opt));
  };

  const handleChangePage = (event, updatePage) => setPage(updatePage);

  const handleRowPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(0);
  };

  const handleLogout = () =>{
    localStorage.clear();
    navigate("/")
  } 

  return (
    <div className="admin-parent">
      <div>
        <div className="header">
          <h1 style={{ color: "white" }}>welcome to Admin page</h1>
          <NavLink to={"/AddPolls"}>
            <button className="btn">Add Poll</button>
          </NavLink>
            <div onClick={handleLogout} className="btn">
              Log Out
            </div>
        </div>
        {open && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <div className="container mt-4" style={{ wordBreak: "break-word" }}>
          <div className="row">
            <div className="col">
              {listItems
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((dataList) => (
                  <div className="card mt-3" key={dataList._id}>
                    <div
                      className="card-header "
                      style={{ backgroundColor: "lightgray" }}
                    >
                      <h5
                        className="card-title"
                        style={{ wordWrap: "break-word" }}
                      >
                        {dataList.title}
                      </h5>
                      <div className="admin-btns">
                        {dataList.options.length < 4 && (
                          <NavLink
                            className={"icon-btns"}
                            to={`/AddOptions/${dataList._id}`}
                          >
                            <AddIcon />
                          </NavLink>
                        )}
                        <NavLink
                          className={"icon-btns"}
                          to={`/editPoll/${dataList._id}`}
                          state={dataList.title}
                        >
                          <EditIcon />
                        </NavLink>

                        {deletePollTitle === dataList._id ? (
                          <CircularProgress size="2rem"/>
                        ) : (
                          <DeleteIcon
                            className={"icon-btns"}
                            onClick={() => handleDelete(dataList._id)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, i) => (
                        <div className="form-check" key={option.option}>
                          <div className="d-flex justify-content-between">
                            <div
                              className="poll-options"
                              style={{ wordWrap: "break-word" }}
                            >
                              <div className="single-option">
                                {option.option}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                <div>vote:{option.vote} </div>

                                {deletePollOption === option.option ? (
                                  <CircularProgress size="2rem"/>
                                ) : (
                                  <DeleteIcon
                                    className={"icon-btns"}
                                    onClick={() =>
                                      handleDeleteOption(
                                        dataList._id,
                                        option.option
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOption}
          count={listItems.length}
          page={!listItems.length || listItems.length <= 0 ? 0 : page}
          rowsPerPage={rowPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowPerPage}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
