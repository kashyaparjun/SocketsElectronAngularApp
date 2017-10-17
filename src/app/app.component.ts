import { Component } from '@angular/core';
import { Socket } from 'ng2-socket-io';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  note: string;
  constructor(public socket: Socket){
    var t = {
      'id': 'e5js12534125wwer'
    };
    this.socket.emit('getNotes', t);
  }

  notes = [];

  sendNote(){
    var t = {
      'id': 'e5js12534125wwer',
      'note': this.note,
      'title': this.title
    };
    this.socket.emit('addNote', t);
  }

  ngOnInit(){
    this.socket.fromEvent('broadcast').subscribe(res => {
      console.log(res);
      this.notes = [];
      var y = Object.keys(res);
      for(var i = 0;i<y.length;i++){
        var p = res[y[i]];
        p['key'] = y[i];
        this.notes.push(p);
      }
    });
    this.socket.fromEvent('response').subscribe(res => {
      this.notes = [];
      var y = Object.keys(res);
      for(var i = 0;i<y.length;i++){
        var p = res[y[i]];
        p['key'] = y[i];
        this.notes.push(p);
      }
      console.log(this.notes);
    });
    this.socket.fromEvent('msg').subscribe(res => {
      console.log(res);
    });
  }

  delete(key){
    var p = {
      'id': 'e5js12534125wwer',
      'del': key
    };
    this.socket.emit('deleteNote', p);
  }
}
