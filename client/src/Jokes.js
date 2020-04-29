import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
const { Column, ColumnGroup } = Table;

const token = localStorage.getItem("token");
const req = axios.create({
  baseURL: "http://localhost:3300/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`
  }
});

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const jokes = await req.get("/api/jokes");
        setJokes(jokes.data);
      } catch (err) {
        console.log(err);
      }
    };
    axiosGet();
  }, [setJokes]);

  return (
    <Table dataSource={jokes} rowKey={record => record.id}>
      <ColumnGroup title="Jokes">
        <Column title="Joke" dataIndex="joke" key="joke" />
      </ColumnGroup>
    </Table>
  );
};

export default Jokes;
