const inputPromtElement = document.querySelector("#input-promt");
const btnGenerateElement = document.querySelector("#btn-generate");
const wrapperResponseItemsElement = document.querySelector(
  "#wrapper-response-items"
);

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

btnGenerateElement.addEventListener("click", async () => {
  if (!promtValue) return;

  const promtValue = inputPromtElement.value;

  wrapperResponseItemsElement.innerHTML += `<div class="item-question mb-3">
  <div class="avatar-item">
        <label for="assistant">noeL</label>
        <img src="./images/avatar.webp" alt="bot" />
  </div>
  <p class="text-content lead">
    ${promtValue}
  </p>
</div>`;

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: promtValue,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return (wrapperResponseItemsElement.innerHTML = `<div class="alert alert-danger" role="alert">
    ${data.error.message}
  </div>`);
  }

  const { role, content } = data.choices[0].message;

  wrapperResponseItemsElement.innerHTML += `<div class="item-response mb-3" id="item-response">
  <div class="avatar-item">
        <img src="./images/bot.png" alt="bot" />
        <label for="assistant">${role}</label>
  </div>
  <p class="text-content lead">
    ${content}
  </p>
</div>`;
});
