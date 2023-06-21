export default class Api {
  private USER_API = "https://jsonplaceholder.typicode.com/users/";
  private POST_API = "https://jsonplaceholder.typicode.com/posts/";

  findUserById(id: number): Promise<Response> {
    return fetch(this.USER_API.concat(id.toString()), {method: 'GET'});
  };

  findAllUsers(): Promise<Response> {
    return fetch(this.USER_API, {method: 'GET'}); 
  };

  findPostById(id: number): Promise<Response> {
    return fetch(this.POST_API.concat(id.toString()), {method: 'GET'});
  };

  findAllPosts(): Promise<Response> {
    return fetch(this.POST_API, {method: 'GET'});
  };
};