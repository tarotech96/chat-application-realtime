import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';
const Message = ({ message: { user, text }, name }) => {
    // define isCheck variable to check if the message has been sent 
    let isCheck = false;

    const trimedName = name.trim().toLowerCase();

    // check user if user!=null then set isCheck = true
    if (user === trimedName) {
        isCheck = true;
    }

    return (
        isCheck ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        <p className="sentText pl-10">{user}</p>
                    </div>
                </div>
            )
    )
}

export default Message;