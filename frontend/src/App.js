import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Form, Button, Alert, Card, Table } from "react-bootstrap";
import Header from "./components/header";

const axios = require("axios").default;

function App() {
  const [response, setResponse] = useState([]);
  const [userinfo, setUserInfo] = useState([]);

  let url = "http://localhost:4000/api/getallcommits";

  const fetchAllcommits = () => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setResponse(response.data.data.arr);
        setUserInfo(response.data.data.userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function confirmEnding(string) {
    console.log({
      returnvalue: string.substr(string.length - 1),
      bool: validateNum(string.substr(string.length - 1)),
    });
    return validateNum(string.substr(string.length - 1));
  }

  function validateNum(strNumber) {
    console.log(strNumber);
    var regExp = new RegExp("^\\d+$");
    var isValid = regExp.test(strNumber);
    return isValid;
  }

  useEffect(() => {
    fetchAllcommits();
  }, []);

  return (
    <>
      <Header />

      <>
        <div class="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={userinfo?.avatar_url} />
            <Card.Body>
              <Card.Title>username:{userinfo.username}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </>

      <div class="d-flex justify-content-center">
        <div class="card">
          <div class="card-body">
            <h3>List of commits</h3>
          </div>

          {response.length == 0 ? (
            <h1>No commits found </h1>
          ) : (
            <>
              <Table striped bordered hover variant="dark">
                {response.map((e) => (
                  <>
                    {confirmEnding(e.hash) ? (
                      <>
                        <tbody
                          style={{ color: "black", background: "#E6F1F6" }}
                        >
                          <tr>
                            <td>commits:{e.message}</td>
                          </tr>
                        </tbody>
                      </>
                    ) : (
                      <>
                        <tbody style={{ color: "white", background: "#000" }}>
                          <tr>
                            <td>{e.message}</td>
                          </tr>
                        </tbody>
                      </>
                    )}
                  </>
                ))}
              </Table>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
