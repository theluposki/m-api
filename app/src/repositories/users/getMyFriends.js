import db from "../../db/db.js";

const getMyFriends = async (userId) => {
  let conn;

  try {
    conn = await db.getConnection();

    const friends = await conn.query(
      `
      SELECT f.id, u.nickname, up.picture
      FROM user_profiles AS up 
      INNER JOIN friends AS f 
      ON up.user_id = f.user2_id
      INNER JOIN users as u
      ON up.user_id = u.id
      WHERE
      f.user1_id = ?;
      `,
      [userId, userId]
    );
    return friends
  } catch (error) {
    if (error) return { error: "Não foi possivel buscar amigos." };
  } finally {
    if (conn) conn.release();
  }
}

export default getMyFriends
