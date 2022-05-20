import { Request, Response } from 'express';
import model from '../../../models';

const getPostListperPage = async (request: Request, response: Response) => {

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

const updatePostView = async (request: Request, response: Response) => {

  try {
    const { column } = request.query;
    const postid = request.params.postid;

    const ret = await model.post.updatePost(postid, column as string);

    response.status(201).send({ result: true });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const getPost = async (request: Request, response: Response) => {

  try {
    const postid = request.params.postid;
    const data = await model.post.getPost(postid);

    response.status(200).send({ result: true, data: data });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const insertPost = async (request: Request, response: Response) => {

  try {
    const result = await model.post.insertPost(request.body);
    response.status(200).send({ result: result });
  }
  catch (e) {
    response.status(201).send({ result: false, message: e });
  }
}

const deletePost = async (request: Request, response: Response) => {

  try{
    const { postid } = request.query;
    const result = await model.post.deletePost(postid as string);

    response.status(200).send({ result: result });
  }
  catch(e){
    response.status(201).send({ result: false, message:e});
  }
}

const dropTest = async (request: Request, response: Response) => {

  try{
    const { page } = request.query;
    const result = await model.post.xssTest(page as string);

    response.status(200).send({ result: result, message: 'drop success' });
  }
  catch(e){
    response.status(201).send({ result: false, message:e});
  }
};

export {
  insertPost,
  getPostListperPage,
  getPost,
  updatePostView,
  dropTest,
  deletePost
};