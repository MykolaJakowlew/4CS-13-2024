export class UserAlreadyExists extends Error {
  constructor(login: string) {
    super(`User with login ${login} already exists`);
  }
}

export class UserDoesNotExists extends Error {
  constructor(login: string) {
    super(`User with login ${login} was not found`);
  }
}
