let messages = [];

const onSetStorageData = () => {
  const wrapperResponseItemsElement = document.querySelector(
    "#wrapper-response-items"
  );

  messages = JSON.parse(localStorage.getItem("messages")) || [];

  wrapperResponseItemsElement.innerHTML = "";

  (messages || []).map(
    (message) =>
      (wrapperResponseItemsElement.innerHTML += `<div class="item-question mb-3">
      <div class="avatar-item">
            <label for="assistant">noeL</label>
            <img src="./images/avatar.webp" alt="bot" />
      </div>
      <p class="text-content lead">
        ${message.question.promt}
      </p>
      </div>
      
      <div class="item-response mb-3">
      <div class="header-wrapper">
      <div class="avatar-item">
            <img src="./images/bot.png" alt="bot" />
            <label for="assistant">${message.response.role}</label>
      </div>
      <div class="wrapper-item-speech">
        <div class="item-speech" id="item-speech_${message.id}" onclick="onSpeechContentResponse(this.id)"></div>
      </div>
      </div>
      <p class="text-content lead">
        ${message.response.content}
      </p>
      </div>`)
  );

  wrapperResponseItemsElement.scrollTop =
    wrapperResponseItemsElement.scrollHeight;
};

onSetStorageData();

const onSpeechContentResponse = (id) => {
  const answerId = id.split("_")[1];

  const message = messages.find((message) => message.id === answerId);

  speechVoice(message.response.content, id);
};
