import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './Login.css';

const Login =() => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="container"> 
            <div className="login">
                <h1 className="heading">Chat Room </h1>
                <div>
                    <input placeholder="Name" className="inputText" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="inputText mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;
