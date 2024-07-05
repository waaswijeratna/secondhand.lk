import { Component ,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy{
  minutes: number = 5;
  seconds: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.stopCountdown();
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  stopCountdown(): void {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

}
