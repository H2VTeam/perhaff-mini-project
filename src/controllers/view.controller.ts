import { Request, Response } from 'express';

const viewController = {
  getHome: (_: Request, res: Response) => res.status(200).render('home'),
};

export default viewController;
