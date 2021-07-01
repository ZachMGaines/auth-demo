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

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM grams');
    return rows.map(row => new Gram(row));
  }

  static async update(id, gram) {

    const { rows } = await pool.query(
      `UPDATE grams
      SET photo_url = $1, caption = $2, tags = $3
      WHERE id = $4
      RETURNING *`, [gram.photoUrl, gram.caption, gram.tags, id]);
    return new Gram(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM grams
    WHERE id = $1
    RETURNING *`, [id]);

    return new Gram(rows[0]);
  }
}
