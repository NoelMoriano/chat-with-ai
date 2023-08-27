const formElement = document.querySelector("#form-element");
const inputPromtElement = document.querySelector("#input-promt");
const btnGenerateElement = document.querySelector("#btn-generate");
const btnAllClearElement = document.querySelector("#all-clear");

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  const formDataObject = Object.fromEntries(formData.entries());

  const { promt } = formDataObject;

  await fetchAnswer(promt);
});

btnGenerateElement.addEventListener("click", async () => {
  const promt = inputPromtElement.value;

  await fetchAnswer(promt);
});

btnAllClearElement.addEventListener("click", () => {
  const wrapperResponseItemsElement = document.querySelector(
    "#wrapper-response-items"
  );

  clearStorage();
  wrapperResponseItemsElement.innerHTML = "";
});

const fetchAnswer = async (promtValue) => {
  if (!promtValue) return;

  const wrapperResponseItemsElement = document.querySelector(
      "#wrapper-response-items"
  );

  inputPromtElement.value = "";

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

  console.log("data->", data);

  const { role, content } = data.choices[0].message;

  localStorage.setItem(
    "messages",
    JSON.stringify([
      ...(messages || []),
      {
        id: data.id,
        question: {
          promt: promtValue,
        },
        response: {
          role,
          content,
        },
      },
    ])
  );

  onSetStorageData();

  speechVoice(content);
};
