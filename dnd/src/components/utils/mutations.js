import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($userName: String!,$email: String!, $password: String!) {
    login(userName: $userName,email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        user
        name
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation createCharacter($character: String!) {
    addThought(character: $character) {
      _id
      race
      class
      userName
      hp
      stat
      notes
    }
  }
`;


