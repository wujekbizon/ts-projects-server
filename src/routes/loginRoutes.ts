import express, { NextFunction, Request, Response } from 'express';

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

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Welcome to protected route, logged in user!</h1>
    </div>
`);
});

export { router };
