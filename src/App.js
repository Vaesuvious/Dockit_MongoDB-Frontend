import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./components/List";
import Header from "./components/Header";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  //Add task
  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  //Select task
  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  //Edit task
  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <main>
      <Header />

      <div className="form-container">
        <div className="block glow">
          <div
            className="form"
            style={{
              paddingBottom: "50px",
              paddingTop: "50px",
              paddingLeft: "80px",
              paddingRight: "50px",
            }}
          >
            <form>
              <div
                className="form-wrapper"
                style={{
                  width: "92%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ flex: 1, marginLeft: "20px", marginRight: "20px" }}
                >
                  <input
                    type="text"
                    className="form-control col"
                    paddingLeft=""
                    placeholder="Enter task"
                    name="task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></input>
                </div>
                {updateId ? (
                  <button
                    type="submit"
                    style={{
                      width: "200px",
                      fontSize: "80%",
                    }}
                    onClick={updateTask}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="submit"
                    style={{
                      width: "200px",
                      fontSize: "80%",
                    }}
                    onClick={addTask}
                    className="btn btn-success"
                  >
                    + Add
                  </button>
                )}
              </div>
            </form>
          </div>

          <table className="flex-wrap-wrap">
            <thead>
              <tr
                className="row headers"
                style={{
                  width: "450%",
                  paddingLeft: "70px",
                  display: "flex",
                  justifyContent: "center",
                  margin: "0",
                }}
              >
                <th
                  className="hashtag"
                  style={{
                    width: "32%",
                    marginRight: "50px",
                    margin: "0",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  #
                </th>
                <th
                  className=""
                  style={{
                    width: "32%",
                    marginRight: "50px",
                    margin: "0",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  Tasks
                </th>
                <th
                  className=""
                  style={{
                    width: "32%",
                    marginRight: "50px",
                    margin: "0",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    style={{
                      backgroundColor: "grey",
                      marginLeft: "100px",
                      marginTop: "10px",
                    }}
                    value=""
                    aria-label=""
                  ></input>
                  <td style={{ width: "80%" }}>
                    <List
                      key={task._id}
                      id={task._id}
                      task={task.task}
                      setUpdateUI={setUpdateUI}
                      updateMode={updateMode}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default App;
