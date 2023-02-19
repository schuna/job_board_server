import {Link} from "react-router-dom";

function NavBar({user, onLogout}) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <p className="navbar-item has-text-weight-bold">
                    GraphQL Chat
                </p>
            </div>
            <div className="navbar-start">
                <Link className="navbar-item">
                    Home
                </Link>
                <Link className="navbar-item" to="/login">
                    Login
                </Link>
                <Link className="navbar-item" to="/signup">
                    SignUp
                </Link>
                {Boolean(user) && (
                    <>
                        <div className="navbar-item">
                            <button className="button is-ghost" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
