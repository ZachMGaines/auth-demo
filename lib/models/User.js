import jwt from 'jsonwebtoken';
import pool from '../utils/pool.js';

export default class User {
  id;
  email;
  passwordHash;
  profilePhoto;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.profilePhoto = row.profile_photo;
  }

  static async insert({ email, passwordHash, profilePhoto }) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash, profile_photo)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [email, passwordHash, profilePhoto]
    );

    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT *
      FROM users
      WHERE email = $1`,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      profilePhoto: this.profilePhoto
    };
  }
}
