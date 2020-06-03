import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AdminComponentFactoryService, AdminComponentKeys } from "./admin-component-factory.service";

@Directive({
  selector: '[mjDynamicField]',
  providers: [AdminComponentFactoryService]
})
export class DynamicFieldDirective implements OnInit {

  @Input() key: AdminComponentKeys;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private factory: AdminComponentFactoryService
  ) {
  }

  ngOnInit(): void {
    if (!this.key) {
      throw new Error('Cannot find an admin component for undefined key');
    }

    const component = this.resolver.resolveComponentFactory(this.factory.getComponentForKey(this.key));
    this.container.createComponent(component);
  }
}
