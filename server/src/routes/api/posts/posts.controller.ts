import { NextFunction, Request, Response } from 'express';
import model from '../../../models';

export const getPostListperPage = async (request: Request, response: Response) => {
  try {
    const { page } = request.query;
    if (page === undefined) {
      throw `page don't exists`;
    }

    const itemCountPerPage = request.app.get('itemCountPerPage');
    const begin = (Number(page) - 1) * itemCountPerPage;

    const result = await model.post.getPostList(begin, itemCountPerPage);
    response.status(200).send(result);
  }
  catch (e) {
    response.status(201).send({ result: true, message: e });
  }
}

export const getPost = async (request: Request, response: Response) => {
  try {
    const postid = request.params.postid;
    const data = await model.post.getPost(postid);

    response.status(200).send(data);
  }
  catch (e) {
    response.status(201).send({});
  }
}

export const insertPost = async (request: Request, response: Response) => {
  try {
    const result = await model.post.insertPost(request.body);
    response.status(201).send(result);
  }
  catch (e) {
    response.status(202).send(e);
  }
}

export const updatePost = async (request: Request, response: Response) => {
  try {
    const result = await model.post.updatePost(request.body);
    response.status(201).send(result);
  }
  catch (e) {
    response.status(202).send(e);
  }
}

export const deletePost = async (request: Request, response: Response) => {
  try{
    const postid = request.params.postid;
    const result = await model.post.deletePost(postid);

    response.status(200).send(result);
  }
  catch(e){
    response.status(201).send({ result: false, message:e});
  }
}

export const dropTest = async (request: Request, response: Response) => {
  try{
    const { page } = request.query;
    const result = await model.post.xssTest(page as string);

    response.status(200).send({ result: result, message: 'drop success' });
  }
  catch(e){
    response.status(201).send({ result: false, message:e});
  }
};