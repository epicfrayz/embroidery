export default class Palette {
	constructor(appentParent, colors, selectedColor = null) {
		this.alphabet = [ "а", "б", "в", "г", "д", "е", "ё",
						  "ж", "з", "и", "й", "к", "л", "м",
						  "н", "о", "п", "р", "с", "т", "у",
						  "ф", "х", "ц", "ч", "ш", "щ", "ъ",
						  "ы", "ь", "э", "ю", "я"];
		this.parent = appentParent;
		this.colors = [];
		colors.forEach((item, index)=> {
			this.colors.push( {
				title: this.alphabet[index],
				color: item
			});
		});
		this.selectedColor = selectedColor;
	}
	drawUI() {
		// создание ui палитры и вставка в this.parent
		let blockPalette = document.createElement("div");
		blockPalette.id = "palette";

		let titlePalette = document.createElement("span");
		titlePalette.innerHTML = "Палитра:";
		blockPalette.appendChild( titlePalette );

		let wrapper = document.createElement("div");
		wrapper.classList.add( "palette-wrapper" );

		this.colors.forEach( (item)=>{
			let btn = document.createElement("button");
			btn.classList.add("palette-item");

			btn.innerHTML = item.title;
			btn.style.backgroundColor = `#${item.color}`;

			// определить выбранный цвет
			btn.addEventListener("click", () => {
				this.selectedColor = item.color;
			});

			wrapper.appendChild( btn );
		} );

		blockPalette.appendChild( wrapper );
		document.querySelector(this.parent).appendChild( blockPalette );
	}
}