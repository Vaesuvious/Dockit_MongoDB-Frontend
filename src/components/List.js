import React from "react";
import { baseURL } from "../utils/constant";
import axios from "axios";

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = async () => {
    await axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <ul
      className="buttonContainer"
      style={{margin: "2px", paddingBottom: "1px", padding:"2px", paddingRight:"2px" }}
    >
      <div className="row" style={{width:'100%', display:'flex', justifyContent:'center'}}>
        <div
          className="task_holder col"
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          {task}
        </div>

        <div
          className="icon_holder col-sm-2"
          style={{
            marginRight: "70px",
            display: "flex",
            alignItems: "end"
          }}
        >
          <box-icon
            className="icon"
            onClick={() => updateMode(id, task)}
            name="edit"
            type="solid"
            color="#459d38"
            style={{ marginRight: "25px" }}
          ></box-icon>
          <box-icon
            className="icon"
            onClick={removeTask}
            name="trash"
            type="solid"
            color="#f82914"
          ></box-icon>
        </div>
      </div>
    </ul>
  );
};

//<box-icon name='edit' type='solid' color='#459d38' ></box-icon>
export default List;
