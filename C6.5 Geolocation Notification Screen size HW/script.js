// Задание 2.

// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 


const btn = document.querySelector('.j-btn-screen-size');

btn.addEventListener('click', () => {
  const screenWith = window.screen.width;
  const screenHeight = window.screen.height;
  const screenInnerWith = window.innerWidth;
  const screenInnerHeight = window.innerHeight;
  const screenClientWith = document.documentElement.clientWidth;
  const screenClientHeight = document.documentElement.clientHeight; 
  const message = `
  Ширина экрана устройства: ${screenWith} px
  Высота экрана устройства: ${screenHeight} px
  Ширина окна браузера с учётом полосы прокрутки: ${screenInnerWith} px
  Высота окна браузера с учётом полосы прокрутки: ${screenInnerHeight} px
  Ширина окна браузера без учёта полосы прокрутки: ${screenClientWith} px
  Высота окна браузера без учёта полосы прокрутки: ${screenClientHeight} px
  `
  alert(message);
});