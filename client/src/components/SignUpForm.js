import {useNavigate} from "react-router";
import {useState} from "react";
import {useAddUser} from "../graphql/hooks";

function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {addUser} = useAddUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await addUser({email, password});
        console.log('user created:', user);
        navigate(`/`);
    };
    return (
        <div>
            <h1 className="title">
                New User
            </h1>
            <div className="box">
                <form>
                    <div className="field">
                        <label className="label">
                            Email
                        </label>
                        <div className="control">
                            <input className="input" type="email" required value={email}
                                   onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" required value={password}
                                   onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SignUpForm;