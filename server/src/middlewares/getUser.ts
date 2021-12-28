import model from '../models';
import { UserRow } from '../models/user';

const getUser = async (columns: string, value: string) => {

  const result: UserRow[] = await model.user.getUserInfo({
    columns: [columns],
    id: value
  });

  return result.length > 0;
}

export default getUser;