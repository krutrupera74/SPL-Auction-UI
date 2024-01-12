// default-option.directive.ts

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CommonService } from '../services/common.service';

@Directive({
  selector: '[appDefaultOption]',
})
export class DefaultOptionDirective implements OnChanges {
  @Input() set options(value: any[]) {
    this.addDefaultOption(value);
  }

  constructor(private commonService: CommonService, private matSelect: MatSelect) {}

  ngOnChanges(changes: SimpleChanges) {
    // Handle ngOnChanges if needed
  }

  private addDefaultOption(options: any[]) {
    if (options) {
      options.unshift(this.commonService.pleaseSelectOption);
      if (!this.matSelect.value) {
        this.matSelect.writeValue(this.commonService.pleaseSelectOption.value);
      }
    }
  }
}
