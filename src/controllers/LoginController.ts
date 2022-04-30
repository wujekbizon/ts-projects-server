import { Request, Response } from 'express';
import { get, controller } from './decorators';

@controller('/auth')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label> 
        <input type="password" name="password" id="password" />
      </div>
      <button>Submit</button>
    </form>    
   `);
  }
}
