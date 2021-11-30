import "./Chat.css";

const Chat = ({ handleSubmit, text, setText }) => {
    return(
        <form className="message-form" onSubmit={handleSubmit}> 
            <div>
                <input type="text" placeholder="Ingresa un mensaje" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div>
                <button className="message-btn">Enviar</button>
            </div>

        </form>
    );
}

export default Chat;