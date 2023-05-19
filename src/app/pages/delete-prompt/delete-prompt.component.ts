import { Component } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'divine-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styleUrls: ['./delete-prompt.component.scss'],
})
export class DeletePromptComponent {
  constructor(
    private testCaseFacade: TestCaseFacade,
    private dialogRef: NbDialogRef<DeletePromptComponent>
  ) {}

  onButtonDelete(): void {
    this.testCaseFacade.dispatchDeleteTestCase();
    this.dialogRef.close();
  }

  onDialogClose(): void {
    this.dialogRef.close();
  }
}
