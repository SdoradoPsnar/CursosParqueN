import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupabaseService } from '../core/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private channel: any;
  users: { id: string; email: string; x: number; y: number }[] = [];

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    const supabase = this.supabaseService.getClient();

    // Obtener usuarios de la tabla auth.users
    const { data: users } = await supabase.from('auth.users').select('id, email');
    if (users) {
      this.users = users.map((user: any) => ({ ...user, x: 0, y: 0 }));
    }

    // Suscribirse al canal "home-room"
    this.channel = supabase.channel('home-room', {
      config: { broadcast: { self: true } },
    });

    this.channel
      .on('broadcast', { event: 'mouse-move' }, (payload: any) => {
        const { userId, x, y } = payload.payload;
        const user = this.users.find((u) => u.id === userId);
        if (user) {
          user.x = x;
          user.y = y;
        }
      })
      .subscribe();
  }

  onMouseMove(event: MouseEvent) {
    const supabase = this.supabaseService.getClient();
    this.channel.send({
      type: 'broadcast',
      event: 'mouse-move',
      payload: {
        userId: 'your-logged-in-user-id', // Aquí puedes usar el ID del usuario autenticado
        x: event.clientX,
        y: event.clientY,
      },
    });
  }

  ngOnDestroy() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
  }
}
