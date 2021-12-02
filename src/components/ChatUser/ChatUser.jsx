import "./ChatUser.css";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ChatUser = ({ chatUser, selectChatUser }) => {
    const { user } = useContext(UserContext);

    const getInitials = (string) => {
        const names = string.split(' ');
        let initials = names[0].substring(0,1).toUpperCase();

        if (names.length > 1) {
            initials += names[1].substring(0,1).toUpperCase();
        }
        return initials
    }

    return(
        <>
          <div className="user-wrapper" onClick={() => selectChatUser(chatUser)}>
              <div className="user-info">
                  <div className="user-detail">
                      <p>{(user.role == "pacient") ? chatUser.specialistName : chatUser.pacientName}</p>
                  </div>
              </div>
          </div>
          <div className="sm-screen" onClick={() => selectChatUser(chatUser)}>
          <p>{(user.role == "pacient") ? getInitials(chatUser.specialistName) : getInitials(chatUser.pacientName)}</p>
          </div>
        </>
    )
}

export default ChatUser;