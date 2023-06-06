import db from "../../db/db.js";
import { randomUUID } from "node:crypto"

const sendFriendRequest = async (userId, body) => {

  const { to } = body

  const id = randomUUID()

  let conn;

  try {
    conn = await db.getConnection();

    const FriendUser = await conn.query(
      `select u.id, up.user_id, u.nickname, up.picture from user_profiles as up 
      INNER JOIN users as u ON u.id = up.user_id
      where u.nickname = ?;`,
      [to]
    );

    const checkIfYouHaveAlreadyOrdered = await conn.query(
      `SELECT * FROM friend_requests WHERE sender_id = ? AND recipient_id = ?`,
      [userId, FriendUser[0].user_id]
    );

    if(checkIfYouHaveAlreadyOrdered[0]) return { error: "Já tem um pedido, aguardando aprovação." }
    if(checkIfYouHaveAlreadyOrdered[0] && checkIfYouHaveAlreadyOrdered[0].status === 'approved') return { error: "Seu pedido ja foi aceito." }

    const requestFriend = await conn.query(
      `
      INSERT INTO friend_requests (id, sender_id, recipient_id)
      VALUES (?,?,?);
      `, [id, userId, FriendUser[0].user_id])

    if (requestFriend.affectedRows === 1) return { message: "Pedido enviado com sucesso!", status: 200 }
  } catch (error) {
    if (error) return { error: "Não foi possivel solicitar." };
  } finally {
    if (conn) conn.release();
  }
}

export default sendFriendRequest
