import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { RootState } from '../reducers';
import { setLogin } from '../reducers/Login';
import { useDispatch, useSelector } from 'react-redux';
import axiosApi, { Response } from '../modules/API';

interface HeaderProps {
  selected?: string;
};

interface MenuProps {
  isLogin: boolean;
  selected: string;
}

const styles = {
  color: 'white',
  textDecoration: 'underline'
};

const HeaderTitle = () => {
  return (
    <div className='title-container'>
      <Link to="/">
        <h2> Mine Sweeper</h2>
      </Link>
    </div>
  )
}

const HeaderMenu = ({isLogin, selected }: MenuProps) => {

  return (
    <div className='menu-container'>
      <div className='menu-left' />
      <MenuCenter selected={selected} />
      {isLogin ? <LogoutMenu /> : <LoginMenu />}
    </div>
  )
}

const MenuCenter = ({ selected }: { selected: string }) => {

  const menu =
    [
      { title: 'Game', url: '/' },
      { title: 'Ranking', url: '/ranking/easy?page=1' },
      { title: 'Community', url: '/community?page=1' },
      { title: 'MyPage', url: '/mypage' },
      { title: 'Option', url: '/option' }
    ];

  return (

    <div className='menu-center'>
      {menu.map((item, idx: number) => {
        return (
          <Link key={idx} to={item.url}>
            {selected === item.title ?
              <h4 style={styles}>{item.title}</h4> :
              <h4>{item.title}</h4>}
          </Link>
        )
      })}
    </div>
  )
}

const LoginMenu = () => {

  return (
    <>
      <div className='menu-right'>
        <Link to="/signin">
          <div className='sign-button'>
            <div>
              Sign In
            </div>
          </div>
        </Link>
        <Link to="/signup">
          <div className='sign-button'>
            <div>
              Sign Up
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}


const LogoutMenu = () => {

  const dispatch = useDispatch();
  const logout = () => {
    axiosApi.post(`http://localhost:8080/api/logout`)
      .then((response: Response) => {
        if (response.result === false) {
          throw new Error('logout error');
        }

        dispatch(setLogin({ isLogin: false, id: '' }));
        // history.push('/');
      })
      .catch(e => console.log(e))
  }

  return (
    <>
      <div className='menu-right'>
        <div className='sign-button' onClick={logout}>
          <div>
            Sign Out
          </div>
        </div>
      </div>
    </>
  )
}

const Header = ({ selected }: HeaderProps) => {

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <>
      <header>
        <HeaderTitle />
        <HeaderMenu
          isLogin={isLogin}
          selected={selected}
        />
      </header>
    </>
  );
}

export default Header;