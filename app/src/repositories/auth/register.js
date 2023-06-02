import db from "../../db/db.js";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import addProfile from "../users/addProfile.js";
import findUserByEmail from "../users/findUserByEmail.js";

async function register (body) {
  const id = randomUUID();
  const { nickname, email, password } = body;

  if (nickname === undefined || nickname === "") {
    return { error: "Node de usuário é obrigatório." };
  }

  if (email === undefined || email === "") {
    return { error: "E-mail é obrigatório." };
  }

  if (password === undefined || password === "") {
    return { error: "Senha é obrigatória." };
  }

  let conn;
  
  try {
    conn = await db.getConnection();

    const userExists = await conn.query(
      `SELECT nickname, email FROM users WHERE email=? or nickname=?;`,
      [email,nickname]
    );

    if (userExists[0]) return { error: "E-mail ou nome de usuário ja existe!" };

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const row = await conn.query(
      `
	    INSERT INTO users
      (id, nickname, email, password)
      VALUES
      (?,?,?,?);
	    `,
      [id, nickname, email, hashPassword]
    );
    if (row.affectedRows === 1) {
    
    const user = await findUserByEmail(email)

    console.log(user)
    console.log(user.nickname)

      if(user) {
        const profile = await addProfile(user.id, {
          name: "",
          bio: "",
          picture: `${process.env.BASE_URL}/uploads/150x150.svg`,
          links: '[]'
        })

        console.log(profile)
        if(profile.error) return { error: profile.error }
        return { message: "Registrado com sucesso!" }
      }

    }
  } catch (error) {
    console.log(error);
    if (error) return { error: "Erro ao registrar!" };
  } finally {
    if (conn) conn.release();
  }
};

export default register;
