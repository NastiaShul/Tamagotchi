function game() {

	class Tamagotchi {
		name = '';
		feedRate = 100;
		playRate = 100;
		walkRate = 100;
		bathRate = 100;
		sleepRate = 100;
		isLive;
		updateUI;

		constructor(name, updateUI) {
			this.name = name;
			this.updateUI = updateUI;
			this.isLive = setInterval(() => {
				this.feedRate -= 2;
				this.playRate -= 2;
				this.walkRate -= 2;
				this.bathRate -= 2;
				this.sleepRate -= 2;
				this.updateUI_();
			}, 2000);
		}

		updateUI_() {
			this.updateUI({
				feedRate: this.feedRate,
				playRate: this.playRate,
				walkRate: this.walkRate,
				bathRate: this.bathRate,
				sleepRate: this.sleepRate
			});
		}

		die() {
			clearInterval(this.isLive);
		}

		feed() {
			this.feedRate = 100;
			this.walkRate -= 2;
			this.bathRate -= 2;
			this.updateUI_();
		}

		play() {
			this.playRate = 100;
			this.bathRate -= 2;
			this.feedRate -= 4;
			this.updateUI_();
		}

		walk() {
			this.walkRate = 100;
			this.bathRate -= 4;
			this.feedRate -= 2;
			this.sleepRate -= 2;
			this.updateUI_();
		}

		bath() {
			this.bathRate = 100;
			this.updateUI_();
		}

		sleep() {
			this.sleepRate = 100;
			this.feedRate -= 2;
			this.playRate -= 2;
			this.updateUI_();
		}
	}


	const hero = document.querySelector(".js-hero"),
		input = document.querySelector("input"),
		heroName = document.querySelector(".js-hero-name"),
		modalStart = document.querySelector(".js-modal-start"),
		modalOver = document.querySelector(".js-modal-over"),
		form = document.querySelector("form"),
		wrapper = document.querySelector(".js-wrapper"),
		rate = document.querySelector(".js-rate"),
		currantWidth = rate.offsetWidth;

	wrapper.style.opacity = "0.1";
	hero.style.backgroundColor = "#ceeb8b";

	const fed = document.getElementById("fed"),
		played = document.getElementById("played"),
		walked = document.getElementById("walked"),
		bathed = document.getElementById("bathed"),
		slept = document.getElementById("slept");

	const btnFeed = document.getElementById("btn-feed"),
		btnPlay = document.getElementById("btn-play"),
		btnWalk = document.getElementById("btn-walk"),
		btnBathe = document.getElementById("btn-bathe"),
		btnSleep = document.getElementById("btn-sleep");


	const showCurrentLoop = (value, rate) => {
		value.style.width = rate * currantWidth / 100 + 'px';
		value.innerHTML = rate + '%';
	};

	const updateUI = ({ feedRate, playRate, walkRate, bathRate, sleepRate }) => {
		const total = feedRate + playRate + walkRate + bathRate + sleepRate;
		if (total > 450) {
			hero.style.backgroundColor = "#ceeb8b";
		} else if (total > 300) {
			hero.style.backgroundColor = "#f8ce8e";
		} else if (total < 100) {
			hero.style.backgroundColor = "#ff9d9d";
		}

		if (feedRate <= 0 || playRate <= 0 || walkRate <= 0 || bathRate <= 0 || sleepRate <= 0) {
			wrapper.style.opacity = "0.1";
			modalOver.classList.remove("hide");
			tamagotchi.die();
		}
		
		showCurrentLoop(fed, feedRate);
		showCurrentLoop(played, playRate);
		showCurrentLoop(walked, walkRate);
		showCurrentLoop(bathed, bathRate);
		showCurrentLoop(slept, sleepRate);
	}

	let tamagotchi;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		modalStart.classList.add("hide");
		wrapper.style.opacity = "1";
		heroName.append(input.value);
		tamagotchi = new Tamagotchi(input.value, updateUI);
	});

	btnFeed.addEventListener("click", () => {
		tamagotchi.feed();
	});

	btnPlay.addEventListener("click", () => {
		tamagotchi.play();
	});

	btnWalk.addEventListener("click", () => {
		tamagotchi.walk();
	});

	btnBathe.addEventListener("click", () => {
		tamagotchi.bath();
	});

	btnSleep.addEventListener("click", () => {
		tamagotchi.sleep();
	});
}

game();

