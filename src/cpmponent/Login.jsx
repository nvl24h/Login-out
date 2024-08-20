import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            username: "",
            password: "",
            isLoginSuccess: false,
        };
    }

    isValidate = () => {
        let isValid = true;

        if (this.state.username === null || this.state.username === "") {
            isValid = false;
            toast.error("Please enter username");
        }

        if (this.state.password === null || this.state.password === "") {
            isValid = false;
            toast.error("Please enter password");
        }

        return isValid;
    };

    handlerLogin = (e) => {
        e.preventDefault();
        if (this.isValidate()) {
            const user = {
                username: this.state.username,
                password: this.state.password,
            };
            axios
                .get("http://localhost:4000/users/" + this.state.username)
                .then((response) => {
                    return response;
                })
                .then((res) => {
                    console.log(res);

                    if (Object.keys(res).length === 0) {
                        toast.error("Please enter username and password");
                    } else {
                        if (res.data.password === this.state.password) {
                            toast.success("Login success");
                            this.setState({ isLoginSuccess: true });
                        } else {
                            toast.error("Please enter password");
                        }
                    }
                })
                .catch((error) => {
                    toast.error("Please enter username and password");
                });
        }
    };

    render() {
        if (this.state.isLoginSuccess) {
            return <Navigate to="/" replace={true} />;
        }
        return (
            <Container style={{ textAlign: "center" }}>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card style={{ width: "500px", marginTop: "100px" }}>
                            <Card.Header as="h5" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                LOGIN NOW
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label className="d-flex">User name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Username"
                                            value={this.state.username}
                                            onChange={(event) => {
                                                this.setState({ username: event.target.value });
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="d-flex">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={(event) => {
                                                this.setState({ password: event.target.value });
                                            }}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={(event) => this.handlerLogin(event)}>
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
