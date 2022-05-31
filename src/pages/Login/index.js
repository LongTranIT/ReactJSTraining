import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css'
import logo from '../../img/logo.jpg'

const Header = () => {
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const navigate = useNavigate()
    const loginBtn= useRef()

    useEffect(()=>{
        window.addEventListener('keypress', (e)=>{
            if (e.key === "Enter") {
                e.preventDefault();
                loginBtn.current.click()
            }
        })
        return ()=>{
            window.removeEventListener('keypress',null)
        }
    },[])

    const handleSubmit=()=>{
        axios
            .post('https://qlsc.maysoft.io/server/api/auth/login', {
                username: username,
                password: password
            })
            .then(({ data }) => {
                if (data.status) {
                    sessionStorage.setItem('Authorization',data.data.token_type+' '+ data.data.access_token )
                    window.removeEventListener('keypress',null)
                    navigate('/home')
                }
                else {
                    alert(data.errors.message || data.errors[0]);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="loginRoot">
            <div className="loginContainer">
                <img src={logo} alt="logo" />
                <div className="loginInputGroup">
                    <label htmlFor="username" className="loginLabel">Tên tài khoản</label>
                    <input onChange={(e)=>setUsername(e.target.value)} id="username" className="loginInput" placeholder="Nhập tên tài khoản" />
                </div>
                <div className="loginInputGroup">
                    <label htmlFor="password" className="loginLabel">Mật khẩu</label>
                    <input onChange={(e)=>setPassword(e.target.value)} id="password" type="password" className="loginInput" placeholder="Nhập mật khẩu" />
                </div>
                <button ref={loginBtn} className="loginBtn" onClick={handleSubmit}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Header;