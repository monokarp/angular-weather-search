import { Directive } from '@angular/core';
import { testIdAttrName } from '../../test-id';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: `[${testIdAttrName}]`, standalone: true })
export class TestIdDirective {}
