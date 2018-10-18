Meteor.startup(() => {
  Meteor.users.deny({ update() { return true; } });
});
