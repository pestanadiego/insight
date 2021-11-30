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
        const chatUsersRef = db.collection(db, "chats");
        chatUsersRef.where('id', 'in', user.chats).get().then((snapshot) => {
            let chatUsers = [];
            snapshot.docs.forEach((doc) => {
                chatUsers.push(doc.data());
            })
            setChatUsers(chatUsers);
        });
        }, 
        []);
    console.log(chatUsers);
  
  return(
    <div className="chat-container">
        <div className="chat-users-container">
          {chatUsers.map(chatUser => <ChatUser key={chatUser.id} user={chatUser} />)}
        </div>
        <div className="messages-container">
          {chat ? (
            <Chat />
          ) : (
            <h3 className="no-chat">Haga clic en un usuario para iniciar la conversación</h3>
          )}
        </div>
    </div>
  );
}

export default ChatPage;
