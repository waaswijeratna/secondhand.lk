export class ApiPathsService {
  static readonly baseURL:string = 'http://localhost:3000';

  static readonly login:string=this.baseURL+'/login';
  static readonly register:string=this.baseURL+'/createUser';
  static readonly googleAuth: string = this.baseURL + '/auth/google'; 

  static readonly getProfile:string=this.baseURL+'/getProfile';
  static readonly updateProfile:string=this.baseURL+'/updateProfile';
  static readonly passwordUpdate:string=this.baseURL+'/passwordUpdate/:userId';
  static readonly forgotPassword: string=this.baseURL+'/forgotPassword';
  static readonly resetPassword: string=this.baseURL+'/resetPassword/:token';

  
}
