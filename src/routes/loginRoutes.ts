import express, { NextFunction, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <h1>Your are logged in</h1>
      <a href="/logout">Logout</a>
    </div>
  `);
  } else {
    res.send(`
    <div>
      <h1>Your are not logged in</h1>
      <a href="/login">Login</a>
    </div>
    `);
  }
});

router.get('/login', (req: Request, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  // setup a type guard
  if (email && password && email === 'admin@test.com' && password === 'test') {
    // mark this person as logged in
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Welcome to protected route, logged in user!</h1>
    </div>
`);
});

export { router };
