import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedAllPolls } from "../redux/reducers/AdminSlice";
import { useNavigate } from "react-router-dom";
import { vote } from "../redux/reducers/VoteSlice";
import { Backdrop, CircularProgress, TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../redux/Store";
import { RootState } from "../redux/reducers";

interface Option {
  option: string;
}

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5, 10, 15]);
  const adminSliceData = useSelector((state: RootState) => state.AdminSlice);
  const navigate = useNavigate();
  const [disabledOptions, setDisabledOptions] = useState<{ [key: string]: boolean }>({});

  const row = (): number => {
    if (localStorage.getItem("rowpage")) {
      return JSON.parse(localStorage.getItem("rowpage")!);
    }
    return 5;
  };
  const [rowPerPage, setRowPerPage] = useState<number>(row());

  useEffect(() => {
    dispatch(fetchedAllPolls());
    const data = JSON.parse(localStorage.getItem("page") || "0");
    if (data) {
      setPage(parseInt(data));
    }

    const disabledOptionsFromStorage: { [key: string]: boolean } = {};
    adminSliceData.data.forEach((dataList: any) => {
      const storedVote = localStorage.getItem(`vote_${dataList._id}`);
      disabledOptionsFromStorage[dataList._id] = storedVote !== null;
    });
    setDisabledOptions(disabledOptionsFromStorage);
  }, [adminSliceData.isSuccess, dispatch]);

  useEffect(() => {
    localStorage.setItem("page", page.toString());
    localStorage.setItem("rowpage", rowPerPage.toString());
  }, [page, rowPerPage]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleVote = (id: string, opt: string) => {
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        access_token: token,
      },
    };
    localStorage.setItem(`vote_${id}`, id);
    const updatedDisabledOptions = { ...disabledOptions, [id]: true };
    localStorage.setItem("disabledOptions", JSON.stringify(updatedDisabledOptions));
    localStorage.getItem("disabledOptions");
    dispatch(vote(id, opt, header));
    setDisabledOptions({ ...disabledOptions, [id]: true });
    toast.success("🦄 Thanks for voting!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, updatePage: number) =>
    setPage(updatePage);

  const handleRowPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <div>
      <div className="admin-parent">
        <div className="header">
          <h1>welcome to Home page</h1>
          <button className="btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
        {adminSliceData.isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={adminSliceData.isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <div className="container" style={{ wordBreak: "break-word" }}>
          <div className="row">
            <div className="col">
              {adminSliceData.data
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((dataList: any) => (
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
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option: Option) => (
                        <div className="form-check" key={option.option}>
                          <div className="d-flex justify-content-between">
                            <div
                              className="poll-options"
                              style={{
                                wordWrap: "break-word",
                              }}
                            >
                              <div>
                                <input
                                  type="radio"
                                  onClick={() => handleVote(dataList._id, option.option)}
                                  name={dataList._id}
                                  disabled={!!localStorage.getItem(`vote_${dataList._id}`)}
                                />
                                {option.option}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TablePagination
            component="div"
            rowsPerPageOptions={rowsPerPageOption}
            count={adminSliceData.data.length}
            page={!adminSliceData.data.length || adminSliceData.data.length <= 0 ? 0 : page}
            rowsPerPage={rowPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowPerPage}
          />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Home;
