const gameShowcase = (() => {
	////////// DATA FETCHING//////////
	const getDefaultGames = async () => {
		const key = '4b75a0922bbd41619c3a135bb234a3a5';
		const defaultURL = `https://api.rawg.io/api/games?page_size=40&key=${key}`;

		const response = await fetch(defaultURL);
		return response.json();
	};

	const searchGame = async (name) => {
		const key = '4b75a0922bbd41619c3a135bb234a3a5';
		const url = `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${key}`;

		const response = await fetch(url);
		const gameResult = await response.json();

		const { results } = gameResult;

    		const autoComplete = document.querySelector('.autocom-box');
    
    		if (!results) {
      			document.querySelector('.search-input').classList.remove('is-active');
      			return;
    		}

    		autoComplete.innerHTML = '';
    		document.querySelector('.search-input').classList.add('is-active');

    		for(let item of results) {
     			const option = document.createElement('a');
      		const gameImg = document.createElement('img');

      		gameImg.src = item.background_image;

      		option.textContent = item.name;
      		option.prepend(gameImg)

					autoComplete.appendChild(option);
    	}
	};

	const getPage = async (url) => {
		const response = await fetch(url);
		return response.json();
	};
	////////// EVENT LISTENERS //////////
	document.querySelector('.search').addEventListener('input', (e) => {
		searchGame(e.target.value);
	});

})();

// gameShowcase.onLoad();
