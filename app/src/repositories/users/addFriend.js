import db from "../../db/db.js";
import { randomUUID } from "node:crypto";

const addFriend = async (userId, body) => {
  const { nickname, requestId } = body;

  const id = randomUUID();
  const id2 = randomUUID();

  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    const FriendUser = await conn.query(
      `select u.id, up.user_id, u.nickname, up.picture from user_profiles as up 
      INNER JOIN users as u ON u.id = up.user_id
      where u.nickname = ?;`,
      [nickname]
    );

    const checkIfYouAreAlreadyFriends = await conn.query(
      `SELECT * FROM friends 
      WHERE user1_id = ? AND user2_id = ? 
      OR user2_id = ? AND user1_id = ?
      `,
      [userId, FriendUser[0].user_id, FriendUser[0].user_id, userId]
    );

    if (checkIfYouAreAlreadyFriends[0]) return { error: "Já são amigos." };
    
    await conn.query(
      `
        UPDATE friend_requests
        SET status = 'approved'
        WHERE id = ?;
      `,
      [requestId]
    );

    await conn.query(
      `
        INSERT INTO friends (id, user1_id, user2_id)
        VALUES (?, ?, ?);
        `,
      [id, userId, FriendUser[0].user_id]
    );

    await conn.query(
      `
        INSERT INTO friends (id, user1_id, user2_id)
        VALUES (?, ?, ?);
        `,
      [id2, FriendUser[0].user_id, userId]
    );

    await conn.commit();
    return { message: "Amigo adicionado." };
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    console.log("Erro durante a transação:", error);
    return { error: "Ocorreu um erro durante a transação." };
  } finally {
    if (conn) conn.release();
  }
};

export default addFriend;
