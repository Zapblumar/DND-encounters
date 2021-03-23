import { gql } from '@apollo/client';

export const QUERY_CHARACTER = gql`
  query character($username: String) {
    character(userName: $userName) {
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

export const QUERY_USER = gql`
  query user($userName: String!) {
    user(userName: $userName) {
      _id
      userName
      email
      character {
        _id
        race
        class
        hp
        stat
        notes
      }
    }
  }
`;

export const GET_ME = gql`
  {
    me {
       _id
      userName
      userEmail
      character {
        _id
        race
        class
        hp
        stat
        notes
      }
    }
  }
`;
