import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videoUrl: string = 'https://www.youtube.com/embed/gpbPLrlJouQ?si=Motu-XWt3yL-EPFC';
  mapaUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.849882252839!2d-103.4076755!3d20.6756855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae89aae76ba3%3A0x74fb39365a175a3d!2sAv.%20Ignacio%20L%20Vallarta%204095%2C%20Don%20Bosco%20Vallarta%2C%2045049%20Zapopan%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1747093123649!5m2!1ses-419!2smx';

  }

