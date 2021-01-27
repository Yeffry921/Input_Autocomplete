const gameShowcase = (() => {
	const gameData = {
		gameList: [],
		nextURL: '',
		previous: ''
	};

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

	////////// HELPER FUNCTIONS //////////
	// const renderMenuGames = (games) => {
	// 	const gameSection = document.querySelector('.game-section');
	// 	gameSection.innerHTML = '';

	// 	games.map((game) => {
	// 		const anchor = document.createElement('a');
	// 		const imgDiv = document.createElement('div');
	// 		const titleDiv = document.createElement('div');

	// 		imgDiv.className = 'img';
	// 		titleDiv.className = 'title';

	// 		imgDiv.style.backgroundImage = `url(${game.background_image})`;
	// 		titleDiv.textContent = game.name;

	// 		anchor.appendChild(imgDiv);
	// 		anchor.appendChild(titleDiv);
	// 		gameSection.appendChild(anchor);
	// 	});
	// };

	// const fetchAndRenderGames = () => {
	// 	getDefaultGames().then((res) => {
	// 		gameData.gameList = res.results;
	// 		gameData.nextURL = res.next;
	// 		gameData.previous = res.previous;

	// 		renderMenuGames(gameData.gameList);
	// 	});
	// };

	// const onLoad = () => {
	// 	fetchAndRenderGames();
	// };

	// const filterConsole = (gamesList, console) => {
	// 	return gamesList.filter((game) => {
	// 		// Get that individual games platforms
	// 		const gamePlatforms = game.parent_platforms;
	// 		// Check through each platform to to see if PC is included?
	// 		const platformCheck = gamePlatforms.some((platform) => {
	// 			return platform.platform.name === console;
	// 		});

	// 		if (platformCheck) {
	// 			return game;
	// 		}
	// 	});
	// };

	////////// EVENT LISTENERS //////////
	document.querySelector('.search').addEventListener('input', (e) => {
		searchGame(e.target.value);
	});

	// document.querySelector('.platform-section').addEventListener('click', (e) => {
	// 	if (e.target.classList.contains('platforms')) {
	// 		const consoleName = e.target.dataset.console;

	// 		const result = filterConsole(gameData.gameList, consoleName);
	// 		renderMenuGames(result);
	// 	}
	// });

	// document.querySelector('.next-showcase').addEventListener('click', (e) => {
	// 	if (e.target.classList.contains('next')) {
	// 		getPage(gameData.nextURL).then((res) => {
	// 			gameData.gameList = res.results;
	// 			gameData.nextURL = res.next;
	// 			gameData.previous = res.previous;

	// 			renderMenuGames(res.results);
	// 		});
	// 	} else if (e.target.classList.contains('previous')) {
	// 		getPage(gameData.previous).then((res) => {
	// 			gameData.gameList = res.results;
	// 			gameData.nextURL = res.next;
	// 			gameData.previous = res.previous;

	// 			renderMenuGames(res.results);
	// 		});
	// 	}
	// });

	// return {
	// 	onLoad
	// };
})();

// gameShowcase.onLoad();
