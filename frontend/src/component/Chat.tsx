import React from 'react'

const Chat = () => {

    const [chats, setChats] = React.useState([])

    const fetchChats = async () => {
        const res = await fetch("http://localhost:5000/api/chat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        const data = await res.json()
        setChats(data)
    }

  return (
    <div>this is chat page</div>
  )
}

export default Chat