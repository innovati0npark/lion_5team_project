import React, { useState, useRef, useEffect } from 'react';
import { chatbotAxiosInstance } from '../api/axiosInstances';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const endOfChatRef = useRef(null);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const newMessage = { sender: 'user', text: message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');

        try {
            const res = await chatbotAxiosInstance.post('/chat/', { message });
            const botResponse = { sender: 'bot', text: res.data.reply };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
            setResponse(res.data.reply);
            
        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse = { sender: 'bot', text: 'Failed to get response from the chatbot.' };
            setMessages((prevMessages) => [...prevMessages, errorResponse]);
        }
    };

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    const startChat = () => {
        setChatStarted(true);
    };

    const goBack = () => {
        setChatStarted(false);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div>
            <button
                className="fixed bottom-20 right-12 p-4 rounded-full shadow-lg focus:outline-none z-50"
                onClick={toggleChatWindow}
            >
                {isOpen ? 'x' : <img src={'http://127.0.0.1:8000/images/Frame 1.png'} alt="Chat" className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-40 right-12 bg-white shadow-lg rounded-lg p-4 w-[20rem] h-[36rem] z-40 flex flex-col">
                    <div className="flex items-center mb-2">
                        {chatStarted && (
                            <button onClick={goBack} className="mr-2 focus:outline-none" style={{ width: '24px', height: '24px' }}>
                                <ArrowBackIosIcon />
                            </button>
                        )}
                        <h2 className="text-xl font-semibold">Petpals 챗봇</h2>
                    </div>
                    <div className="flex-grow overflow-auto mb-2">
                        {!chatStarted && (
                            <>
                                <p className="mb-4">Petpals 챗봇에 오신 것을 환영합니다. 아래 버튼을 눌러 대화를 시작해보세요.</p>
                                <button onClick={startChat} className="bg-yellow-500 text-white p-2 rounded-lg w-full">
                                    대화 시작하기
                                </button>
                            </>
                        )}
                        {chatStarted && (
                            <div className="flex flex-col space-y-2">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`p-2 rounded-lg max-w-xs ${
                                                msg.sender === 'user' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-black'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                    {chatStarted && (
                        <div className="flex mt-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage();
                                        e.preventDefault(); // Prevent form submission & page reload
                                    }
                                }}
                                placeholder="메시지를 입력해주세요."
                                className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                            />
                            <button onClick={sendMessage} className="bg-pink-500 text-white p-2 rounded-r-lg">
                                Send
                            </button>
                        </div>
                    )}
                    <div ref={endOfChatRef} />    
                </div>
            )}
        </div>
        
    );
};

export default Chatbot;