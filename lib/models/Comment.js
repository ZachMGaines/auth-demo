import jwt from 'jsonwebtoken';
import pool from '../utils/pool';

export default class Comment {
  id;
  commentBy;
  userPost;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.userPost = row.user_post;
    this.comment = row.comment;
  }

  static async insert({ commentBy, userPost, comment }) {
    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, user_post, comment) VALUES ($1, $2, $3) RETURNING *',
      [commentBy, userPost, comment]
    );
    return new Comment(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id = $1 RETURNING *', [id]
    );
    return new Comment(rows[0]);
  }

}
