
window.onload = function () {
	createCanvas();
}

function begin() {
	if (checkPegState() != 3) {
		console.log('Error'); debugger; // TODO: error
	}

	hideBlockElement(document.getElementById("begin"));
	showBlockElement(document.getElementById("pause-play"));
	createDiscs(getInitialPeg());
	setSortPeg();
	setBaseDisc(getInitialPeg());
	animation(towerOfTanoiSolver);
}

function towerOfTanoiSolver() {
	console.log('New Round');
	if (getLengthOfInitialPeg()) {
		moveDisc(baseDisc);
		if (baseDisc.num > 1) {
			createSmallerDiscs();
			while (smallerDiscs.length != 0 ) {
				setDestinationPeg();
				for (let i = 0; i < smallerDiscs.length; i++) {
					moveDisc(smallerDiscs[i]);
				}
				smallerDiscs.splice(smallerDiscs.length - 1, 1);
			}
		}
		if (getLengthOfInitialPeg()) {
			setSortPeg();
			setBaseDisc(getInitialPeg());
		}
	}
}

function animation(callback) {
	let discAnimation;
	let moveToX;
	let moveToY;
	let distance = 0;
	let tempDisc = Object.create(Disc);
	tempDisc.init();

	discAnimation = setInterval(function() {
		if (!isPaused) {
			if (orderOfMovement.length) {
				let movingDisc = orderOfMovement[0];
				let i = nextOccurrenceOfDisc(movingDisc);
				if (i) {
					moveToX = orderOfMovement[i].xPos;
					moveToY = orderOfMovement[i].yPos;
				} else {
					let peg = getDestinationPeg(movingDisc);
					for (let movedDisc of peg.discs) {
						if (movingDisc.num == movedDisc.num ) {
							moveToX = movedDisc.xPos;
							moveToY = movedDisc.yPos;
						}
					}
				}

				if (movingDisc.xPos != moveToX || movingDisc.yPos != moveToY) {

					const biggestDiscWidth = WIDTH_DIFF * (NUM_OF_DISCS - 1) + BASE_WIDTH;

					if (movingDisc.yPos != (pegs[0].yPos - 20) && movingDisc.xPos != moveToX) {
						// move Disc to the top of Current Peg
						let peg = getCurrentPeg(movingDisc);
						let biggestDiscXPos = calc(peg.xPos, NUM_OF_DISCS, discXPos);

						CTX.clearRect(biggestDiscXPos, peg.yPos - 20, biggestDiscWidth, peg.height + 20);
						peg.drawPeg();
						let numOfDiscsCP = movingDisc.discsCP.total;
						let gap = 20;

						for (let i = 0; numOfDiscsCP > 0; i++) {
							tempDisc.num = movingDisc.discsCP.nums[i];
							tempDisc.xPos = (peg.xPos - WIDTH_DIFF) - (WIDTH_DIFF/2) * (tempDisc.num-1);
							tempDisc.yPos = movingDisc.yPos + gap + distance;
							tempDisc.width = WIDTH_DIFF * (tempDisc.num - 1) + BASE_WIDTH;
							tempDisc.height = movingDisc.height;
							tempDisc.drawDisc(discsColors[tempDisc.num - 1]);
							gap += 20;
							numOfDiscsCP--;
						}
						distance++;

						CTX.clearRect(movingDisc.xPos, movingDisc.yPos, movingDisc.width, movingDisc.height);
						movingDisc.yPos--;
						movingDisc.drawDisc(discsColors[movingDisc.num - 1]);

					} else if (movingDisc.xPos != moveToX) {
							// move Disc to the top of Destination Peg
							if (movingDisc.xPos < moveToX) {

								CTX.clearRect(movingDisc.xPos, movingDisc.yPos, movingDisc.width, movingDisc.height);
								movingDisc.xPos++;
								movingDisc.drawDisc(discsColors[movingDisc.num - 1]);

							} else {

								CTX.clearRect(movingDisc.xPos, movingDisc.yPos, movingDisc.width, movingDisc.height);
								movingDisc.xPos--;
								movingDisc.drawDisc(discsColors[movingDisc.num - 1]);

							}
					} else {
							// Lower Disc to the right position on it's Destination Peg
							let peg = getDestinationPeg(movingDisc);
							let biggestDiscXPos = calc(peg.xPos, NUM_OF_DISCS, discXPos);

							CTX.clearRect(biggestDiscXPos, peg.yPos - 20, biggestDiscWidth, peg.height + 20);

							peg.drawPeg();

							let numOfDiscsDP = movingDisc.discsDP.total;
							let gap = 0;


							for (let i = movingDisc.discsDP.nums.length - 1; numOfDiscsDP > 0; i--) {
								tempDisc.num = movingDisc.discsDP.nums[i];
								tempDisc.xPos = (peg.xPos - WIDTH_DIFF) - (WIDTH_DIFF/2) * (tempDisc.num - 1);
								tempDisc.yPos = 380 - gap;
								tempDisc.width = WIDTH_DIFF * (tempDisc.num - 1) + BASE_WIDTH;
								tempDisc.height = movingDisc.height;
								tempDisc.drawDisc(discsColors[tempDisc.num - 1]);
								gap += 20;
								numOfDiscsDP--;
							}

							CTX.clearRect(movingDisc.xPos, movingDisc.yPos, movingDisc.width, movingDisc.height);
							movingDisc.yPos++;
							movingDisc.drawDisc(discsColors[movingDisc.num - 1]);

					}
				} else {
					orderOfMovement.splice(0,1);
					distance = 0;
				}
			} else if (!getLengthOfInitialPeg()) {
				clearInterval(discAnimation);

				showBlockElement(document.getElementById("replay"));
			} else {
				callback();
			}
		}

	}, 1);
}




var t = window.setInterval(function() {
  if(!isPaused) {

  }
}, 1000);


//with jquery
$('.pause').on('click', function(e) {
  e.preventDefault();
  isPaused = true;
});

$('.play').on('click', function(e) {
  e.preventDefault();
  isPaused = false;
});
