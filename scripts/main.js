/*

Описание механики раскраски:
Основная цель для игрока - это раскрасить изображение, размеченное по номерам, правильными цветами.
Каждому номеру соответствует определенный цвет.
Победа достигается, если все изображение закрашено верно.

ТЗ:

1) 
	- Возможность загрузки картинки 
	- Приведение ее к фиксированному размеру 100x100
	- Если изображение отличается по пропорциям, то необходимо вписать по большей стороне
2) 
	- Построить палитру и холст изображения
	- Сведя все цвета пикселей исходного изображения к не более чем 10 основным цветам
	- Необходимо провести квантование цветов
3) 
	- Закрашивание изображения по номерам
	- Каждый номер в изображении закраски является спрайт или прямоугольник (размером 48 пикселей) и помечен соответствующим номером из палитры
4) 
	- Непрерывное закрашивание при перемещении курсора или тача
6) 
	- Определение состояния выигрыша (если все изображение закрашено верно)
7) 
	- Сохранение и загрузка прогресса закраски 
	- Подумать о возможной оптимизации формата сохранения прогресса в localStorage
8) 
	- Реализовать раскраску картинки размером больше чем 300x300

Доработки:
1) Исправить баг, связанный с загрузкой состояния предыдущей игры.
3) Поскольку в исходной картинке может быть слишком много разных цветов, предлагаем использовать какую-то фиксированную палитру (10, 15 цветов). При парсинге картинки, можно определить, на какой из фиксированных цветов наиболее похож цвет очередного пиксела, и использовать этот фиксированный цвет, вместо исходного. Таким образом, исходная картинка будет состоять только из фиксированных цветов, и в игру будет легче играть.
4) Дать игроку возможность исправлять ошибки при закрашивании.

Рефакторинг:
2) Разделить модель данных и представление. Пример: класс Score сейчас и хранит, и рисует счет игрока.
3) Подумать, обосновано ли использование ticker.
4) Вынести значения в константы, где это актуально, например, размер ячейки.
5) Избавиться от перебора всех ячеек в Grid.handleCellClick.
6) Подумать, как можно уменьшить кол-во данных, записываемых в localStorage."


пример 1 - https://www.youtube.com/watch?v=S4C05RYlw3Y&ab_channel=MCCHEMODAN
пример 2 - https://www.youtube.com/watch?v=mldeWaDA8q4&ab_channel=MCCHEMODAN
пример 3 - https://www.youtube.com/watch?v=d-ah72hxgD8&ab_channel=MCCHEMODAN


- % закраски
- за каждые 10% даем бонус

*/

import Settings from "./components/Settings.js";
import Game from "./components/Game.js";

//Settings(width[ширина 'картинки'], height[высота 'картинки'], sizeBlock, selectedColor = null)
let settings = new Settings( 100, 100, 32, window.innerWidth, window.innerHeight );

let app = new PIXI.Application({
	width: settings.widthApp,
	height: settings.heightApp,
	antialias: true,
	resizeTo: window
});
document.body.appendChild( app.view );

let game = new Game(document, settings, app, 'images/picture.png');

window.addEventListener("resize", () => {

	game.resize();

});


