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
    const [status, setStatus] = useState("");
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
        setStatus(chatUser.status);
        console.log(chatUser);
        db.collection("chats").doc(chatUser.id).onSnapshot((doc) => {
          const data = doc.data();
          setStatus(data.status);
          setMsgs(data.messages);
        });
        console.log(msgs);
    };

    const videoconference = async () => {
      const nameOfPacient = chat.pacientName.toLowerCase().split(" ");
      const meeting = nameOfPacient[0] + nameOfPacient[1];
      const message = {
        text: "Meet. Clic aquí para ingresar",
        url: `https://accounts.google.com/AccountChooser/signinchooser?continue=https://g.co/meet/cita${meeting}`
      }
      await db
      .collection("chats")
      .doc(chat.id)
      .update({ messages: [...msgs, message] });
      console.log('prueba');
    }

    const handleSubmit = async (e) => {
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
            createdAt: date.getHours() + ":" + date.getMinutes(),
        }
        await db
        .collection("chats")
        .doc(chat.id)
        .update({ messages: [...msgs, message] });
    }

    const changeTextButton = (status) => {
      if(status === 'on') {
        return 'Terminar chat'
      } else if(status === 'finished') {
        return ''
      } else {
        return 'Iniciar chat'
      }
    }

    const startChat = async () => {
      if(status === 'pending') {
        await db.collection("chats").doc(chat.id).update({ status: 'on'});
      } else if(status === 'on') {
        await db.collection("chats").doc(chat.id).update({ status: 'finished'});
      }
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
              {(status === "pending") && (
                (user.role==="pacient") ? (
                  <p className="no-chat">Este chat no ha comenzado todavía</p>
                ) : (
                  <p className="no-chat">Inicie el chat presionando el botón</p>
                )
              )}
              {(user.role === "specialist") ? (
                <div className="activate-btn">
                  <button className={`${status}`} onClick={startChat}>{changeTextButton(status)}</button>
                </div>
              ) : (
                null
              )}
            </div>
            <div className="messages">
              {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg}/>) : null}
            </div>
            {(status != "pending" && status != "finished") && (
              <Chat handleSubmit={handleSubmit} text={text} setText={setText} videoconference={videoconference}/>
            )}
            {(status === "finished") && (
              <>
                <p className="no-chat">Este chat ya fue finalizado</p>
                {(user.role === "pacient") && (
                  <p className="no-chat">Recuerde darle un rating al especialista en su perfil</p>
                )}
              </>
            )}
            </>
          ) : (
            <h3 className="no-chat">Haga clic en un usuario para iniciar la conversación</h3>
          )}
        </div>
    </div>
  );
}

export default ChatPage;
