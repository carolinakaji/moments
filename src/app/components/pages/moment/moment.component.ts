import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  baseApiUrl = environment.baseApiUrl;

  moment?: Moment;
  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // id que está na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);

    // Comentário
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  // Para pegar os valores do input, fazer um getter
  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe(comment => this.moment!.comments!.push(comment.data));

    this.messagesService.add('Comentário adicionado!');

    // Limpa o formulário do front
    this.commentForm.reset();

    // Limpa o comentário do back
    formDirective.resetForm();
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluido com sucesso!");

    this.router.navigate(['/']);
  }

}
