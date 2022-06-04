import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import axios from "axios";
import axiosInstance from "../../utils/default_axios";

axios.defaults.baseURL = "http://localhost:8080";

// Authorization 헤더는 새로고침 브라우저 꺼지면 사라지므로
// 컴포넌트 새로 마운트 될 때 마다 토큰 박음
const useSlientLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const request = async () => {
      try {
        const { status, data: { userid, accessToken } } = await axiosInstance.post("/api/slientlogin");

        if (status === 201) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          dispatch(setLogin({
            isLogin: true,
            id: userid
          }));
        }
      } catch (e) {
      }
    }
    request();
  }, []);
}

export default useSlientLogin;