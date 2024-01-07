const socketClient = io()

const username = document.getElementById("username");
const chatForm = document.getElementById("chatForm");
const chatMessage = document.getElementById("chatMessage");
const chat = document.getElementById("chat");

fetch('/api/auth/', {
    method: 'GET',
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {
        socketClient.emit("userJoin", data)
    })
    .catch(error => console.error(error))

socketClient.on('newUserBroadcast', (user) => {
    Toastify({
        text: `${user.first_name} se ha conectado`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
});

chatForm.onsubmit = (e) => {
    e.preventDefault();

    const cid = chatForm.dataset.chat
    socketClient.emit("message", { message: chatMessage.value, cid: cid });
}

socketClient.on('chat', (messages) => {
    const chatMsg = messages.map((msg) => `<p>${msg.autor.first_name}: ${msg.content}</p>`).join(" ");
    chat.innerHTML = chatMsg;
})