const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

async function sendEditRequest(message) {
  try {
    const response = await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendButton.addEventListener("click", () => {
  const message = chatInput.value;

  if (message.trim()) {
    sendEditRequest(message);
    chatInput.value = "";
  }
});

chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
