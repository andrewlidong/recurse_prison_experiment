import p5 from 'p5';

class StickFigure {
    x: number;
    y: number;
    isGuard: boolean;
    targetX: number;
    targetY: number;
    speed: number;
    size: number;

    constructor(x: number, y: number, isGuard: boolean) {
        this.x = x;
        this.y = y;
        this.isGuard = isGuard;
        this.targetX = x;
        this.targetY = y;
        this.speed = 2;
        this.size = 30;
    }

    update() {
        // Move towards target
        this.x += (this.targetX - this.x) * 0.1;
        this.y += (this.targetY - this.y) * 0.1;

        // Add some random movement
        this.x += (Math.random() - 0.5) * 0.5;
        this.y += (Math.random() - 0.5) * 0.5;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        // Draw stick figure
        p.stroke(0);
        p.strokeWeight(2);

        // Head
        p.circle(0, -this.size, this.size/2);

        // Body
        p.line(0, -this.size + this.size/4, 0, this.size/2);

        // Arms
        p.line(0, -this.size/2, -this.size/2, 0);
        p.line(0, -this.size/2, this.size/2, 0);

        // Legs
        p.line(0, this.size/2, -this.size/3, this.size);
        p.line(0, this.size/2, this.size/3, this.size);

        // Guard specific elements
        if (this.isGuard) {
            // Hat
            p.line(-this.size/3, -this.size - 5, this.size/3, -this.size - 5);
            p.rect(-this.size/4, -this.size - 10, this.size/2, 5);
        } else {
            // Prisoner stripes
            p.strokeWeight(4);
            p.line(-this.size/2, -this.size/4, this.size/2, -this.size/4);
            p.line(-this.size/2, 0, this.size/2, 0);
            p.line(-this.size/2, this.size/4, this.size/2, this.size/4);
        }

        p.pop();
    }

    setTarget(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
    }
}

let figures: StickFigure[] = [];
let canvas: p5;

const sketch = (p: p5) => {
    p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('canvas-container');

        // Create initial figures
        for (let i = 0; i < 5; i++) {
            figures.push(new StickFigure(
                p.random(p.width),
                p.random(p.height),
                Math.random() < 0.3
            ));
        }
    };

    p.draw = () => {
        p.background(255, 10); // Slight trail effect

        // Draw prison bars
        p.stroke(0);
        p.strokeWeight(5);
        const barWidth = 20;
        const barSpacing = 50;
        for (let x = 0; x < p.width; x += barSpacing) {
            p.line(x, 0, x, p.height);
        }

        // Update and draw figures
        figures.forEach(figure => {
            figure.update();
            figure.draw(p);
        });

        // Occasionally set new random targets
        if (p.frameCount % 60 === 0) {
            figures.forEach(figure => {
                figure.setTarget(
                    p.random(p.width),
                    p.random(p.height)
                );
            });
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
};

// Initialize p5
new p5(sketch);