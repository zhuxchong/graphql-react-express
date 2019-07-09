import { gql } from "apollo-boost";
const getPlansQueryByUser = id => {
  return {
    query: gql`
      query PlansByUser {
        plansByUser(id: "${id}") {
          id
          name
          done
          ddl
          user {
            name
          }
        }
      }
    `
  };
};
const addUser = name => {
  return {
    mutation: gql`
      mutation AddUser {
        addUser(name: "${name}") {
          id
          name
        
        }
      }
    `
  };
};

const getPlans = {
  query: gql`
    query Plans {
      plans {
        id
        name
        done
        ddl
      }
    }
  `
};
// export function get(id, isLoading = true) {
//   return dispatch => {
//     dispatch({
//       type: THOUGHTS_GET_REQUEST,
//       isLoading
//     })

//     return axios.post(routesApi, query({
//       operation: 'thought',
//       variables: {id: parseInt(id, 10)},
//       fields: ['id', 'name', 'thought']
//     }))
//       .then((response) => {
//         dispatch({
//           type: THOUGHTS_GET_RESPONSE,
//           error: null,
//           item: response.data.data.thought
//         })
//       })
//       .catch((error) => {
//         dispatch({
//           type: THOUGHTS_GET_FAILURE,
//           error: error
//         })
//       })
//   }
// }

// // Create thought
// export function create(variables) {
//   return dispatch => {
//     return axios.post(routesApi, mutation({
//       operation: 'thoughtCreate',
//       variables, fields: ['id']
//     }))
//   }
// }

export { getPlansQueryByUser, getPlans, addUser };
