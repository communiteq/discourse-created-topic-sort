import EmberObject from "@ember/object";

export default class extends EmberObject {
  get mobileView() {
    return this.site.mobileView;
  }
  get currentOrderIsCreated() {
    return this.session.topicList.params.order === "created";
  }
  get createdBumpedSame() {
    const BUMPED_FORMAT = "YYYY-MM-DDTHH:mm:ss";
    if (
      moment(this.topic.bumpedAt).isValid() &&
      moment(this.topic.createdAt).isValid()
    ) {
      const bumpedAtStr = moment(this.topic.bumpedAt).format(BUMPED_FORMAT);
      const createdAtStr = moment(this.topic.createdAt).format(BUMPED_FORMAT);
      return bumpedAtStr === createdAtStr;
    }
    return true;
  }
}
