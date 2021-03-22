import gql from 'graphql-tag';

export const QUERY_CHARACTER = gql`
  query character($username: String) {
    character(username: $username) {
      _id
     race 
     class
      username
      hp 
      stat
      notes
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query character($id: ID!) {
    character(_id: $id) {
      _id
      race
     class
      username
      stat
      hp 
      notes
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
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

export const QUERY_ME = gql`
  {
    me  _id
      username
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
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
       _id
      username
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
