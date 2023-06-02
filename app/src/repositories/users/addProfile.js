import { randomUUID } from "node:crypto";
import db from "../../db/db.js";

const addProfile = async (userId, body) => {
  const id = randomUUID();

  const { name, bio, picture, links } = body

  let conn;

  try {
    conn = await db.getConnection();

    const row = await conn.query(
      `
	    INSERT INTO user_profiles
      (id, user_id, name, bio, picture, links)
      VALUES
      (?,?,?,?,?,?);
	    `,
      [id, userId, name, bio, picture, links]
    );
    if (row.affectedRows === 1) return { message: "Perfil adicionado com sucesso!" };
  } catch (error) {
    if (error) return { error: "Não foi possivel adicionar perfil!" };
  } finally {
    if (conn) conn.release();
  }

}

export default addProfile;
