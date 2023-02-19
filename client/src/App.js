import {ApolloProvider} from '@apollo/client';
import {useState} from 'react';
import {getUser, logout} from './auth';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import client from './graphql/client';
import {Route, Routes} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";

function App() {
    const [user, setUser] = useState(getUser);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <ApolloProvider client={client}>
            <header>
                <NavBar user={user} onLogout={handleLogout}/>
            </header>
            <main>
                <Routes>
                    <Route exact path="/signup"
                           element={<SignUpForm/>}/>
                    <Route exact path="/"
                           element={<Chat user={user}/>}/>
                    <Route exact path="/login"
                           element={<LoginForm onLogin={setUser}/>}/>
                </Routes>
                {Boolean(user) ? (
                    <Chat user={user}/>
                ) : (
                    <LoginForm onLogin={setUser}/>
                )}
            </main>
        </ApolloProvider>
    );
}

export default App;
