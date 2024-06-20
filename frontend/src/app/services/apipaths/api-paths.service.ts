export class ApiPathsService {
  static readonly baseURL:string = 'http://localhost:3000';

  static readonly login:string=this.baseURL+'/login';
  static readonly register:string=this.baseURL+'/register';
}
