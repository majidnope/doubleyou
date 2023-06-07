import React from "react";
import sx from "./Table.module.scss";
import logo from "@/assets/images/logo.png";
const Table = ({ data }) => {
  return (
    <table className={sx.table} style={{ rowGap: "10px" }}>
      <tr>
        <th>Name</th>
        <th>Background</th>
        <th>Source</th>
      </tr>
      {data.map((el) => (
        <>
          <tr className={sx.row}>
            <td className={sx.col}>
              <input type="text" name="name" />
              <button>Change</button>
            </td>
            <td
              className={sx.col}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="" alt="bg" />

              <input type="file" />
            </td>
            <td className={sx.col}>
              <input type="text" name="src" />
              <button>Change</button>
            </td>
          </tr>
        </>
      ))}
    </table>
  );
};

export default Table;
