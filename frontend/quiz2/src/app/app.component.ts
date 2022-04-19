import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz2';
  links = [//put your routing link here
  { display: 'Map', link: '/map' },
  { display: 'Scatterplot', link: '/scatterplot' }
]

}
