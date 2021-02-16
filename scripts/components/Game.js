import Grid from "./Grid.js";
import Palette from "./Palette.js";
import Camera from "./Camera.js";
import SaveLoadGame from "./SaveLoadGame.js";
import Score from "./Score.js";

export default class Game {

	/*
		Основной блок кода
		- все остальные компоненты лишь работают внутри себя и данные получают из основного кода
	*/

	constructor(parent, settings, app, src) {

		this.app = app;
		this.parent = parent;
		this.src = src;
		this.settings = settings;

		this.loader = new PIXI.Loader();
		this.loader
			.add( this.src )
			.load( () => { this.start() } );

		

	}

	start() {

		// страт игры

		const picture = new PIXI.Sprite( this.loader.resources[ this.src ].texture );
		const rgba = this.app.renderer.plugins.extract.pixels( picture );

		// добавить в настройки размеры картинки
		this.settings.widthPicture = picture.width;
		this.settings.heightPicture = picture.height;
		
		// очень много ресурсов требуется!
		// let palette = [];
		// for (var i = 0, n = rgba.length; i < n; i += 4) {			
		
		// 	// формирует все цвета из картинки
		// 	palette.push(
		// 		{
		// 			r: rgba[i  ],
		// 			g: rgba[i+1],
		// 			b: rgba[i+2],
		// 			a: 255
		// 		}
		// 	);
	
		// }

		// let newArrayObject = palette.filter( (item, index) => {
		// 	const _item = JSON.stringify(item);
		// 	return index === palette.findIndex(obj => {
		// 		return JSON.stringify(obj) === _item;
		// 	});
		// } );

		this.palette = [1, 2, 3];

		this.score = new Score("#game");
		this.gameData = {
			cells: [],
			containerGraphics: null,
			score: this.score,
			dataPalette: this.palette,
		}

		
		// Palette(appendChild, colors[type array])
		this.palette = new Palette("#game", this.gameData.dataPalette);
		// Grid(ширина грида, высота грида, ширина приложения[канваса], высота приложения[канваса], канвас, размер одного блока)
		this.grid = new Grid( this.settings, this.app, this.gameData, this.palette );
		this.camera = new Camera( this.grid );		
		// SaveLoadGame(что сохраняем, куда(данные игры)  )
		new SaveLoadGame( this.gameData, this.settings, this.grid );
	}

	gameLoop( delta ) {

		if ( this.camera.nowZoom != this.camera.oldZoom  ) {
			this.gameData.containerGraphics.scale.set( this.camera.scrollEvent() );
			this.grid.containerGraphicsCentered();
		}

	}

	resize() {

		this.grid.containerGraphicsCentered();

		this.settings.widthApp = window.innerWidth;
		this.settings.heightApp = window.innerHeight;
		this.app.renderer.resize( this.settings.widthApp, this.settings.heightApp );
		
	}
}



