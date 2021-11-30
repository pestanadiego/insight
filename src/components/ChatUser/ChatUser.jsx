import "./ChatUser.css";

const ChatUser = ({ user }) => {
    return(
        <div className="user-wrapper">
            <div className="user-info">
                <div className="user-detail">
                    <h4>{user.pacientName}</h4>
                </div>
            </div>
        </div>
    )
}

export default ChatUser;