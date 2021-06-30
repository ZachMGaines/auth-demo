import jwt from 'jsonwebtoken';
import pool from '../utils/pool';

export default class Comment {
  id;
  commentBy;
  userPost;
  userComment;

  constructor(row) {
    this.id;
    this.commentBy = row.commentBy;
    this.userPost = row.userPost;
    this.userComment = row.userComment;
  }

  static async insert({ commentBy, userPost, userComment }) {
    const { rows } = await pool.query(
      'INSERT INTO comment (commentBy, userPost, userComment) VALUES ($1, $2, $3) RETURNING *',
      [commentBy, userPost, userComment]
    );
    return new Comment(rows[0]);
  }
}
