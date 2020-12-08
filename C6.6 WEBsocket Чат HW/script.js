// Задание 3.

// Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
// img
// Добавить в чат механизм отправки гео-локации:
// img
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

const wsUri = "wss://echo.websocket.org/";
const output = document.getElementById("output");
const input = document.getElementById("j-input");
const btnSend = document.querySelector(".j-btn-send");
const btnGeo = document.querySelector('.j-btn-geo');
let typeOfMessage = 'mes';
let websocket;

function scrollToBottom() {
  output.scrollTop = output.scrollHeight;
}

function writeToScreen(message, type) {
  let div = document.createElement("div");
  const justify = "display: flex; justify-content: " + type; + "\"";
  div.style = justify;
  div.innerHTML = message;
  output.appendChild(div);
  scrollToBottom();
};

function sendMessage() {
  const message = input.value;
  if (message) {
    writeToScreen(
      `<label class="sent"">SENT: ${message}</label>`, 'flex-end');
    input.value = null;   
    input.focus(); 
    websocket.send(message);
  };  
};

btnSend.addEventListener('click', sendMessage);

document.addEventListener("DOMContentLoaded", function() {
  websocket = new WebSocket(wsUri);
  websocket.onmessage = function(evt) {
    if (typeOfMessage != 'loc') {
      writeToScreen(
        '<label class="response">RESPONSE: ' + evt.data +'</label>', 'flex-start'
      ); /* style="color: blue;"*/
    } else {;
      typeOfMessage = 'mes';
    };
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<label class="response" style="color: red;">ERROR: ' + evt.data +'</label>'
    );
  };  
});

// Функция, выводящая текст об ошибке при получении геолокации
const errorGeo = () => {
  alert('Невозможно получить Ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const successGeo = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const location = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  typeOfMessage = 'loc';  
  writeToScreen(
    `<label class="sent" style="color: blue;">MY LOCATION: <a href="${location}">Ссылка на карту</a></label>`, 'flex-end'
  );
  websocket.send(location);
};

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation не поддерживается Вашим браузером');
  } else {
    // status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  };
});

// Обработчик нажатия Enter на инпут с id="j-page"
input.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    sendMessage();
  }
});
