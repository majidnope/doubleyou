import Table from "@/components/Table/Table";
import React from "react";

const Page = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Table data={[1, 3]} />
    </div>
  );
};

export default Page;
