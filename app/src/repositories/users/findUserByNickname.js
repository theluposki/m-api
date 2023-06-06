import db from "../../db/db.js";

const findUserByNickname = async (nickname) => {
  let conn;

  try {
    conn = await db.getConnection();
    const users = await conn.query(
      `select up.id, u.nickname, up.picture 
      from user_profiles as up INNER JOIN users as u ON u.id = up.user_id where nickname like ?`,
      [`${nickname}%`]
    );
    return users;
  } catch (error) {
    if (error) return { error: "Não foi possivel buscar esse usuário." };
  } finally {
    if (conn) conn.release();
  }
};

export default findUserByNickname;
