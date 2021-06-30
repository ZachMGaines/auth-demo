import pool from '../utils/pool';

export default class Gram {
  id;
  userName;
  photoUrl;
  caption;
  tags;


  constructor(row) {
    this.id = row.id;
    this.userName = row.user_id;
    this.photoUrl = row.photoUrl;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ userName, photoUrl, caption, tags }) {
    const { rows } = await pool.query(
      'INSERT into gram (userName, photoUrl, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [userName, photoUrl, caption, tags]
    );
    return new Gram(rows[0]);
  }
}
