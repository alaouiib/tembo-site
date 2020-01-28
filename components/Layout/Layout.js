import { initGA, logPageView } from "../../utils/Analytics";

class Layout extends React.Component {
	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}
	render() {
		return <div>{this.props.children}</div>;
	}
}

export default Layout;
