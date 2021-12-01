import "./Message.css";
import { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const Message = ({ msg }) => {
    const { user } = useContext(UserContext);
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msg]);

    const meetMessage = () => {
        if(msg.text.includes('Meet')) {
            return 'meet'
        } else {
            return ''
        }
    }

    const typeMsg = () => {
        if(msg.text.includes('Meet')) {
            return 'video'
        } else if(msg.from === user.name) {
            return 'me'
        } else {
            return 'other'
        }
    }

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
        <div className={`message-wrapper ${messageFrom()} ${meetMessage()}`} ref={scrollRef}>
            {(msg.text.includes('Meet')) ? (
                <p className={`${typeMsg()}`}><a href={msg.url} target="_blank">{msg.text}</a></p>
            ) : (
                <p className={`${typeMsg()}`}>{msg.text}</p>
            )}
            <p className="hour-message">{msg.createdAt}</p>
        </div>
    )
}

export default Message;