import React from "react";
import { Layout, Form, Menu, Dropdown, Icon } from "antd";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
import NormalLoginForm from "./NormalLoginForm";
import RegistrationForm from "./RegistrationForm";
import Jokes from "./Jokes";
import axios from "axios";
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
	NormalLoginForm
);

const WrappedRegistrationForm = Form.create({ name: "register" })(
	RegistrationForm
);
const req = axios.create({
	baseURL: "http://localhost:3300/"
});

const axiosGet = async cb => {
	await localStorage.removeItem("token");
	setTimeout(cb, 100);
};

const onClick = ({ key }) => {
	axiosGet(() => <Redirect to="/" />);
};

const menu = (
	<Menu>
		<Menu.Item>
			<Link to="/">Login</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/register">Register</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/jokes">Jokes</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/" onClick={onClick}>
				Logout
			</Link>
		</Menu.Item>
	</Menu>
);

const App = ({ history }) => {
	const { Footer, Content, Header } = Layout;
	return (
		<Layout style={{ padding: 24 }}>
			<Header>
				<Dropdown overlay={menu} history={history}>
					<a className="ant-dropdown-link" href="#">
						Menu Options <Icon type="down" />
					</a>
				</Dropdown>
			</Header>
			<Switch>
				<Route exact path="/" component={WrappedNormalLoginForm} />
				<Route
					exact
					path="/register"
					component={WrappedRegistrationForm}
				/>
				<Route exact path="/jokes" component={Jokes} />
			</Switch>
		</Layout>
	);
};

export default App;
