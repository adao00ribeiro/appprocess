import { Inter } from '@next/font/google'
import styles from './../styles/Home.module.scss'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { canSSRGuest } from '../utils/canSSRGuest'
import { SignIn } from '../context/SignIn'
import { AuthContext } from '../context/AuthContext'
import { IMyContextProps } from '../interfaces/IMyContextProps'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const Context = useContext(AuthContext) as IMyContextProps;

  const [inputs, setInputs] = useState({
    email: "",
    senha: ""
  })
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (inputs.email === "" || inputs.senha === "") {
      toast.warning("Preencha os campos!")
      return
    }
    setLoading(true);
    await SignIn({ email: inputs.email, senha: inputs.senha, setUser: Context.setUser });
    setLoading(false);
  }
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input value={inputs.email} type="email" onChange={handleInput} name='email' placeholder='Seu email'></input>
            <input value={inputs.senha} type="password" onChange={handleInput} name='senha' placeholder='Sua senha'></input>
            <button type="submit" disabled={loading} > Acessar</button>
          </form>
          <Link href={'/registrar'}> Não possui uma conta? Cadastre-se</Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})