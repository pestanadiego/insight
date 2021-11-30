import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import ChatUser from "../components/ChatUser/ChatUser";
import Chat from "../components/Chat/Chat";
import { db } from "../utils/firebaseConfig";
import "./ChatPage.css";

function ChatPage() {
    const { user } = useContext(UserContext);
    const [chatUsers, setChatUsers] = useState([]);
    const [chat, setChat] = useState("");

    useEffect(() => {
        const chatUsersRef = db.collection("chats");
        chatUsersRef.where('id', 'in', user.chats).get().then((snapshot) => {
            let chatUsers = [];
            snapshot.docs.forEach((doc) => {
                chatUsers.push(doc.data());
            })
            setChatUsers(chatUsers);
        });
        }, 
        []);
    
    const selectChatUser = (chatUser) => {
        setChat(chatUser);
        console.log(chatUser);
    }
  
  return(
    <div className="chat-container">
        <div className="chat-users-container">
          {chatUsers.map(chatUser => <ChatUser key={chatUser.id} chatUser={chatUser} selectChatUser={selectChatUser}/>)}
        </div>
        <div className="messages-container">
          {chat ? (
            <h3 className="no-chat">{chat.id}</h3>
          ) : (
            <h3 className="no-chat">Haga clic en un usuario para iniciar la conversación</h3>
          )}
        </div>
    </div>
  );
}

export default ChatPage;
