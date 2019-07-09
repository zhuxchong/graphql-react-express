import React, { useEffect } from "react";
import { graphql, compose } from "react-apollo";
import { getPlansQueryByUser, getPlans, addUser } from "../query/PlanQuery";
import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
const client = new ApolloClient();
const Container = props => {
  // useEffect(() => {
  //   const data = props.getPlansQueryByUser({
  //     variables: {
  //       id: "5d244e404229481a9cd6f72c"
  //     }
  //   });
  //   console.log(data);
  // }, []);
  return (
    <div>
      123
      <button
        onClick={() => {
          client
            .query(getPlansQueryByUser("5d244e404229481a9cd6f72c"))
            .then(res => console.log(res));
        }}
      >
        Cool
      </button>
      <button
        onClick={() => {
          client.mutate(addUser("caonima")).then(res => console.log(res));
        }}
      >
        6666
      </button>
      <button
        onClick={() => {
          client
            .query(getPlansQueryByUser("5d244e404229481a9cd6f72c"))
            .then(res => console.log(res));
        }}
      >
        6666
      </button>
    </div>
  );
};
export default Container;
