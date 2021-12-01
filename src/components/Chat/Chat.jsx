import "./Chat.css";

const Chat = ({ handleSubmit, text, setText, videoconference }) => {

    return(
        <form className="message-form" onSubmit={handleSubmit}> 
            <div>
                <input type="text" placeholder="Ingresa un mensaje" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div>
                <button className="message-btn message-send">Enviar</button>
                <button className="message-btn message-video" type="button" onClick={videoconference}>Video</button>
            </div>

        </form>
    );
}

export default Chat;