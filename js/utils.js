const speechVoice = (responseDescription, elementId) => {
  speech("es", `${responseDescription}`, elementId);
};

const speech = (lang, description, elementId = null) => {
  const elementSpeech = document.querySelector(`#${elementId}`);

  const utterance = new SpeechSynthesisUtterance(description);

  utterance.lang = lang.toString();
  utterance.volume = 1;

  speechSynthesis.speak(utterance);

  if (elementSpeech) {
    utterance.addEventListener("start", () => {
      elementSpeech.classList.add("animate-speech");
    });

    utterance.addEventListener("end", () => {
      elementSpeech.classList.remove("animate-speech");
    });
  }
};

const clearStorage = () => localStorage.clear();

const addClassName = (element, className) => element.classList.add(className);

const removeClassName = (element, className) =>
  element.classList.remove(className);

const fetchApiKey = async () => {
  const response = await fetch("./js/credentials.json");

  if (!response.ok) throw new Error("Error to get api key");

  const data = await response.json();

  return data;
};
