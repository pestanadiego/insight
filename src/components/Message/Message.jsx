import "./Message.css";
import { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const Message = ({ msg }) => {
    const { user } = useContext(UserContext);
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msg]);

    const messageFrom = () => {
        if(!!msg) {
            if(msg.from === user.name) {
                return 'own'
            } else {
                return ''
            }
        } else {
            return ''
        }
    }

    return(
        <div className={`message-wrapper ${messageFrom()}`} ref={scrollRef}>
            <p className={msg.from === user.name ? 'me' : 'other'}>{msg.text}</p>
            <p className="hour-message">{msg.createdAt}</p>
        </div>
    )
}

export default Message;