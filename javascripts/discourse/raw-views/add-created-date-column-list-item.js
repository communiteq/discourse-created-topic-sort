import EmberObject from "@ember/object";

export default class extends EmberObject {
  get mobileView() {
    return this.site.mobileView;
  }
}
