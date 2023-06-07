import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './styles.module.scss'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuest'
import { toast } from 'react-toastify'


const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)
  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (inputs.email === "" || inputs.password === "") {
      toast.warning("Preencha os campos!")
      return
    }
    setLoading(true);
    await signIn({ email: inputs.email, password: inputs.password });
    setLoading(false);
  }
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  }
  return (
    <>
      <Head>
        <title>Acessar</title>
        <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerCenter}>
        <Image src="/LOGOSECRETARY.png" alt='Logo Secretary Helper' width={200} height={200} />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <input value={inputs.email} type="email" onChange={handleInput} name='email' placeholder='Seu email'></input>
            <input value={inputs.password} type="password" onChange={handleInput} name='password' placeholder='Sua senha'></input>
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