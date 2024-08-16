import React, { useState } from 'react';
import axios from 'axios';
import './ChatComponent.css';

function ChatComponent() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages([...messages, { text: message, type: 'user' }]);
        setLoading(true);

        try {
            const res = await axios.post('/api/chat', message, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            setMessages([...messages, { text: message, type: 'user' }, { text: res.data, type: 'bot' }]);
        } catch (error) {
            setMessages([...messages, { text: message, type: 'user' }, { text: 'Error processing message', type: 'bot' }]);
        } finally {
            setLoading(false);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <h1>Chat -Asesoria</h1>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.type}`}>
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className="message bot">Typing...</div>}
                </div>
                <form onSubmit={handleSubmit} className="chat-form">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows="3"
                    ></textarea>
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatComponent;