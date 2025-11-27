import type P5 from "p5";
import { controls } from "./stores";

/** Sets up the sketch */
const setup = async (p5: typeof P5.prototype): Promise<void> => {
	const { width, height } = controls;

	// use WEBGL renderer for 3D
	p5.createCanvas(width, height, p5.WEBGL);
	p5.noStroke();
};

/** Draws the sketch to the canvas */
const draw = (p5: typeof P5.prototype): void => {
	const { currentFrame, circleRadius, circleSpeed, circleMovement } = controls;

	p5.background("#ffffff");
	p5.noStroke();

	// simple lighting for 3D depth
	p5.ambientLight(80);
	p5.pointLight(255, 255, 255, 0, -200, 300);

	// rotate the whole scene slowly for more depth perception
	p5.rotateY(currentFrame * 0.002);

	for (let i = 0; i < 100; i += 1) {
		const randomSpeed = p5.random(circleSpeed - 0.001, circleSpeed + 0.001);

		// in WEBGL the origin is the canvas center, so use width/2 and height/2 ranges
		const x = circleMovement * p5.sin(currentFrame * randomSpeed) + p5.random(-p5.width / 2, p5.width / 2);
		const y = circleMovement * p5.cos(currentFrame * randomSpeed) + p5.random(-p5.height / 2, p5.height / 2);
		const z = circleMovement * p5.sin(currentFrame * randomSpeed * 0.7) + p5.random(-200, 200);

		p5.push();
		p5.translate(x, y, z);
		p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
		// draw spheres instead of 2D circles
		p5.sphere(circleRadius);
		p5.pop();
	}
};

export { draw, setup };
