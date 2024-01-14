import {ApolloProvider} from '@apollo/client';
import {useState} from 'react';
import {getUser, logout} from './auth';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import client from './graphql/client';
import {Route, Routes} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import Expense from "./components/Expense";


function App() {
    const [user, setUser] = useState(getUser);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    // noinspection JSValidateTypes
    return (
        <ApolloProvider client={client}>
            <header>
                <NavBar user={user} onLogout={handleLogout}/>
            </header>
            <main>
                <Routes>
                    <Route exact path="/"
                           element={Boolean(user) ? (
                               <Expense user={user}/>
                           ) : (
                               <></>
                           )}/>
                    <Route exact path="/signup"
                           element={<SignUpForm/>}/>
                    <Route exact path="/chat"
                           element={<Chat user={user}/>}/>
                    <Route exact path="/login"
                           element={<LoginForm onLogin={setUser}/>}/>
                </Routes>
            </main>
        </ApolloProvider>
    );
}

export default App;
