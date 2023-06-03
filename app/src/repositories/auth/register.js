import db from "../../db/db.js";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

export default async function (body) {
  const id = randomUUID();
  const id2 = randomUUID();

  const { nickname, email, password } = body;

  if (!nickname) return { error: "Nome de usuário é obrigatório." };
  if (!email) return { error: "E-mail é obrigatório." };
  if (!password) return { error: "Senha é obrigatória." };

  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    const userExists = await conn.query(
      `SELECT nickname, email FROM users WHERE email=? OR nickname=?;`,
      [email, nickname]
    );

    if (userExists.length > 0) {
      return { error: "E-mail ou nome de usuário já existe!" };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const query1 = `INSERT INTO users (id, nickname, email, password) VALUES (?,?,?,?);`;
    const query2 = `INSERT INTO user_profiles (id, user_id, name, bio, picture, links) VALUES (?,?,?,?,?,?);`;

    await conn.query(query1, [
      id,
      nickname,
      email,
      hashPassword,
    ]);

    const profileDefault = {
      name: "",
      bio: "",
      picture: `${process.env.BASE_URL}/uploads/150x150.svg`,
      links: "[]",
    };

    await conn.query(query2, [
      id2,
      id,
      profileDefault.name,
      profileDefault.bio,
      profileDefault.picture,
      profileDefault.links,
    ]);

    await conn.commit();

    return { success: "Usuário registrado com sucesso!" };
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    console.log("Erro durante a transação:", error);
    return { error: "Ocorreu um erro durante a transação." };
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
