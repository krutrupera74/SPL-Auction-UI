import confetti from 'canvas-confetti';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    var end = Date.now() + (15 * 1000);
    var colors = ['#FFD700', '#C0C0C0'];
    // Function to shoot confetti from left and right with custom colors
    //   function frame() {
    //     // Shoot confetti from the left with custom colors
    //     confetti({
    //       particleCount: 100, // Number of confetti particles
    //       angle: 60, // Angle of confetti shooting (60 degrees for the left side)
    //       spread: 100, // Spread of confetti particles
    //       origin: { x: 0 }, // Starting point (left side)
    //       colors: ['#FF5733', '#FFC300'] // Custom colors (example: orange and yellow)
    //     });

    //     // Shoot confetti from the right with custom colors
    //     confetti({
    //       particleCount: 100, // Number of confetti particles
    //       angle: 120, // Angle of confetti shooting (120 degrees for the right side)
    //       spread: 100, // Spread of confetti particles
    //       origin: { x: 1 }, // Starting point (right side)
    //       colors: ['#3366FF', '#33FFEC'] // Custom colors (example: blue and cyan)
    //     });
    //   };

    //   // Start shooting confetti immediately and then repeat every second
    //   // shootConfetti(); // Shoot confetti immediately
    //   // setInterval(shootConfetti, 1000); // Shoot confetti every second
    //   if (Date.now() < end) {
    //     requestAnimationFrame(frame);
    //   }
    // }
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

