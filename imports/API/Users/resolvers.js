export default {
  Query: {
    user(obj, { id }) {
      return Meteor.users.findOne({ _id: id });
    },
  },
};
