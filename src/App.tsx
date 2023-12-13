import { Container } from "react-bootstrap";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () =>
(
	<Container className="main">
		<RouterProvider router={router} />
	</Container>
);


export default App;
