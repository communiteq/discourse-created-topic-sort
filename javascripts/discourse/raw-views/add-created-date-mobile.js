import EmberObject from "@ember/object";
import { relativeAge } from "discourse/lib/formatter";

export default class extends EmberObject {
  init() {
    super.init(...arguments);
    this.addObserver("session.topicList", this, () => {
      this.notifyPropertyChange("currentOrderIsCreated");
    });
  }
  get mobileView() {
    return this.site.mobileView;
  }
  get currentOrderIsCreated() {
    return this.session.topicList.params.order === "created";
  }
  get createdBumpedSame() {
    const bumpedRel = relativeAge(this.topic.bumpedAt);
    const createdRel = relativeAge(this.topic.createdAt);
    const BUMPED_FORMAT = "YYYY-MM-DD";
    if (
      moment(this.topic.bumpedAt).isValid() &&
      moment(this.topic.createdAt).isValid()
    ) {
      const bumpedAtStr = moment(this.topic.bumpedAt).format(BUMPED_FORMAT);
      const createdAtStr = moment(this.topic.createdAt).format(BUMPED_FORMAT);
      return bumpedAtStr === createdAtStr && bumpedRel === createdRel;
    }
    return true;
  }
}
