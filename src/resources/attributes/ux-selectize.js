import selectize from "selectize";
import {
  inject,
  bindable,
  Container,
  ViewEngine,
  bindingMode,
  dynamicOptions
} from "aurelia-framework";
import { DOM } from "aurelia-pal";

@dynamicOptions
@inject(Element, Container, ViewEngine)
export class UxSelectizeCustomAttribute {
  constructor(element, container, viewEngine) {
    this.element = element;
    this.selected = {};
    this.container = container;
    this.viewEngine = viewEngine;
  }

  attached() {
    if (this.httpQuery) this.initializeRemoteSelectize();
    else {
      this.initializeClientSelectize();
    }
  }

  initializeClientSelectize() {
    this.selectizeElement = $(this.element).selectize()[0];
  }

  initializeRemoteSelectize() {
    this.loadSelectItemView(this.templateUrl).then(viewFactory => {
      this.selectizeElement = $(this.element).selectize({
        valueField: this.valueField,
        labelField: this.labelField,
        searchField: this.searchField,
        render: {
          option: (item, escape) => {
            return this.getHtml(item, viewFactory);
          }
        },
        load: (query, callback) => {
          this.httpQuery(query)
            .then(data => {
              callback(data);
            })
            .catch(error => {
              callback();
            });
        },
        onChange: () => {
            let notice = new Event("change", { bubbles: true });
            $(this.element)[0].dispatchEvent(notice);
        }
      })[0];
    });
  }

  loadSelectItemView(templateUrl) {
    return this.viewEngine.loadViewFactory(templateUrl);
  }

  getHtml(item, factory) {
    const childContainer = this.container.createChild();
    const view = factory.create(childContainer);

    view.bind(item);

    let country = DOM.createElement("div");

    view.appendNodesTo(country);

    return country.outerHTML;
  }

  unbind() {
    this.selectizeElement.selectize.destroy();
  }
}
