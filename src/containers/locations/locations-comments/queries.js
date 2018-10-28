import gql from 'graphql-tag';

export const CommentOnLocationGraphQLQuery = gql`
    mutation CommentOnLocation(
        $locationId: ID!,
        $content: String!,
        $createdAt: String!
      ) {
          commentOnLocation(
            locationId:$locationId, 
            content:$content, 
            createdAt:$createdAt
          ) {
              locationId
              commentId
              content
              createdAt 
            }
    }
`;

export const GetLocationGraphQLQuery = gql`
    query($eventId: ID!) {
        getLocation(id: $locationId) {
        id
        name
        when
        description
        comments {
            items {
                locationId
                commentId
                content
                createdAt
            }
            nextToken
        }
        }
    }
`;
