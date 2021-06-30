import pool from '../utils/pool';

export default class Gram {
  id;
  userId;
  photoUrl;
  caption;
  tags;


  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ userId, photoUrl, caption, tags }) {
    const { rows } = await pool.query(
      'INSERT into grams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, photoUrl, caption, tags]
    );
    return new Gram(rows[0]);
  }
}
