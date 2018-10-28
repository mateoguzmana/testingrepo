import gql from "graphql-tag";

export const DeleteLocationGraphQLQuery = gql`
    mutation DeleteLocation($id: ID!) {
        deleteLocation(input: { id: $id }) {
            id
        }
    }
`;

export const ListLocationsGraphQLQuery = gql`
    query ListLocations {
        listLocations {
          items {
            id
            connection {
                ip,
                type
            }
            created
          }
        }
    }
`;
