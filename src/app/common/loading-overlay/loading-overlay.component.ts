import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TestIds } from '../../../test-ids';
import { TestIdDirective } from '../test-id.directive';

@Component({
  selector: 'app-loading-overlay',
  imports: [TestIdDirective],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  @Input() enabled!: boolean;
  @Input() showAnimation = true;

  public readonly TestId = TestIds.LoadingOverlay;
}
