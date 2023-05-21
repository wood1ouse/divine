import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrelloFacade } from '@facades/trello.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'divine-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  linkWithTrelloForm: FormGroup;

  isLinkedWithTrello: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private trelloFacade: TrelloFacade
  ) {
    this.linkWithTrelloForm = this.formBuilder.group({
      apiKey: ['', [Validators.required]],
      token: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.isLinkedWithTrello = this.trelloFacade.trelloUserName$;
  }

  onTrelloLink() {
    if (this.linkWithTrelloForm.valid) {
      this.trelloFacade.dispatchLinkWithTrello(
        this.linkWithTrelloForm.value.apiKey,
        this.linkWithTrelloForm.value.token
      );
    }
  }
}
