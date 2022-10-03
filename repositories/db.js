import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString:
      "postgres://qqmqwzid:EKsa0cSKGLiPf5BPqpDmReb8yU73faL_@babar.db.elephantsql.com/qqmqwzid",
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
