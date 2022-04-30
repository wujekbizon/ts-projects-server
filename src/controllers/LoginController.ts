import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/auth')
class LoginController {
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
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    // setup a type guard
    if (email === 'admin@test.com' && password === 'test') {
      // mark this person as logged in
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
