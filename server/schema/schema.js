const Plan = require("../models/Plan");
const User = require("../models/TodoUser");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");

// const PlanType = new GraphQLObjectType({
//   name: "Plan",
//   fields: {
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     done: { type: GraphQLBoolean },
//     ddl: { type: GraphQLString },
//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.findById(parent.userId);
//       }
//     }
//   }
// });
// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: {
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     plans: {
//       type: new GraphQLList(PlanType),
//       resolve(parent, args) {
//         return Plan.find({ userId: parent.id });
//       }
//     }
//   }
// });

const PlanType = new GraphQLObjectType({
  name: "Plan",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    ddl: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    plans: {
      type: new GraphQLList(PlanType),
      resolve(parent, args) {
        return Plan.find({ userId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    plan: {
      type: PlanType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Plan.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    plansByUser: {
      type: new GraphQLList(PlanType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Plan.find({ userId: args.id });
      }
    },
    plans: {
      type: new GraphQLList(PlanType),
      resolve(parent, args) {
        return Plan.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlan: {
      type: PlanType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        done: { type: new GraphQLNonNull(GraphQLBoolean) },
        ddl: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return new Plan({
          name: args.name,
          done: args.done,
          ddl: new Date(args.ddl),
          userId: args.userId
        }).save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        if (args.name === "zxc") {
          const error = new Error("user name invalid");

          error.code = 4011;
          throw error;
        }
        return new User({
          name: args.name
        }).save();
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
