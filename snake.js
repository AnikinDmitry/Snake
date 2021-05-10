let canvas = document.getElementById("room");
let context = canvas.getContext("2d");

let number = 25;
let grid = 20;
let size = number * grid;
canvas.width = size;
canvas.height = size;

let count = 0;

let randCell = () => Math.floor(Math.random() * number) * grid;

let snake = {
	x: grid * Math.floor(number / 2),
	y: grid * Math.floor(number / 2),
	dx: grid,
	dy: 0,
	bodyParts: [],
	bodySize: 4
}

let apple = {
	x: randCell(),
	y: randCell()
}

let newSnake = () => {
	snake.x = grid * Math.floor(number / 2);
	snake.y = grid * Math.floor(number / 2);
	snake.bodyParts = [];
	snake.bodySize = 4;
	snake.dx = grid;
	snake.dy = 0;
}

let newApple = () => {
	apple.x = randCell();
	apple.y = randCell();
}

let frameUpdate = () => {
	requestAnimationFrame(frameUpdate);

	if (++count < 5) return;
	count = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	snake.x += snake.dx;
	snake.y += snake.dy;

	if (snake.x < 0) snake.x = canvas.width - grid;
	if (snake.x >= canvas.width) snake.x = 0;
	if (snake.y < 0) snake.y = canvas.height - grid;
	if (snake.y >= canvas.height) snake.y = 0;

	snake.bodyParts.unshift({
		x: snake.x, 
		y: snake.y 
	});

	if (snake.bodyParts.length > snake.bodySize) snake.bodyParts.pop();

	context.fillStyle = "red";
	context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

	context.fillStyle = "green";
	for (var i = 0; i < snake.bodyParts.length; i++) {
		context.fillRect(snake.bodyParts[i].x, snake.bodyParts[i].y, grid - 1, grid - 1);

		if (i) {
			if (snake.bodyParts[i].x == snake.bodyParts[0].x && 
				snake.bodyParts[0].y == snake.bodyParts[i].y) {
				newSnake();
				newApple();
			}

			if (apple.x == snake.bodyParts[i].x && apple.y == snake.bodyParts[i].y) {
				newApple();
			}
		}
	}

	if (apple.x == snake.bodyParts[0].x && apple.y == snake.bodyParts[0].y) {
		snake.bodySize++;
		newApple();
	}

	document.addEventListener('keydown', e => {
		if ((e.which == 37 || e.which == 65) && snake.dx == 0) {
			snake.dx = -grid; 
			snake.dy = 0;
		} 
		if ((e.which == 38 || e.which == 87) && snake.dy == 0) {
			snake.dx = 0;
			snake.dy = -grid;
		}
		if ((e.which == 39 || e.which == 68) && snake.dx == 0) {
			snake.dx = grid;
			snake.dy = 0;
		}
		if ((e.which == 40 || e.which == 83) && snake.dy == 0) {
			snake.dx = 0;
			snake.dy = grid;
		}
	});	
}

requestAnimationFrame(frameUpdate);