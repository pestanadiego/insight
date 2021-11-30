import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import ChatUser from "../components/ChatUser/ChatUser";
import Chat from "../components/Chat/Chat";
import Message from "../components/Message/Message";
import { db } from "../utils/firebaseConfig";
import "./ChatPage.css";

function ChatPage() {
    const { user } = useContext(UserContext);
    const [chatUsers, setChatUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);
    const user1 = user.name;

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
        db.collection("chats").doc(chat.id).onSnapshot(snapshot => {
            let msgs = [];
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                msgs.push(change);
            })
            setMsgs(msgs);
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let user2 = "";
        if(user.role === "pacient") {
            user2 = chat.specialistName;
        } else {
            user2 = chat.pacientName;
        }
        setText(""); // Para que el input se ponga en blanco
        const date = new Date();
        const message = {
            text,
            from: user1,
            to: user2,
            createdAt: date.getHours() + ":" + date.getMinutes()
        }
        await db
        .collection("chats")
        .doc(chat.id)
        .update({ messages: [...chat.messages, message] });
    }
  
  return(
    <div className="chat-container">
        <div className="chat-users-container">
          {chatUsers.map(chatUser => <ChatUser key={chatUser.id} chatUser={chatUser} selectChatUser={selectChatUser}/>)}
        </div>
        <div className="messages-container">
          {chat ? (
            <>
            <div className="name-user">
              <h3 className="no-chat">{(user.role === "pacient") ? chat.specialistName : chat.pacientName}</h3>
            </div>
            <div className="messages">
              {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg}/>) : null}
            </div>
            <Chat handleSubmit={handleSubmit} text={text} setText={setText}/>
            </>
          ) : (
            <h3 className="no-chat">Haga clic en un usuario para iniciar la conversación</h3>
          )}
        </div>
    </div>
  );
}

export default ChatPage;
