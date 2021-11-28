import db, { UserRow } from '../models/db';

const getUser = async (columns: string, value: string) => {

  const result: UserRow[] = await db.getUserInfo({
    columns: [columns],
    id: value
  });

  return result.length > 0;
}

export default getUser;