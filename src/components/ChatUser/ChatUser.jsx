import "./ChatUser.css";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ChatUser = ({ chatUser, selectChatUser }) => {
    const { user } = useContext(UserContext);

    return(
        <div className="user-wrapper" onClick={() => selectChatUser(chatUser)}>
            <div className="user-info">
                <div className="user-detail">
                    <p>{(user.role == "pacient") ? chatUser.specialistName : chatUser.pacientName}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatUser;