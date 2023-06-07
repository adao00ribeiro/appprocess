import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './styles.module.scss'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'


const inter = Inter({ subsets: ['latin'] })

export default function Registrar() {
  const { signUp } = useContext(AuthContext)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password1: "",
    password2: ""
  });
  const [loading, setLoading] = useState(false)

  const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == 'password2') {
      if (value == inputs.password1) {
        console.log("igual")
      } else {
        console.log("diferente")
      }
    }
    setInputs({ ...inputs, [name]: value })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (inputs.name == "" || inputs.email == "" || inputs.password1 == "" || inputs.password2 == "") {
      alert("Preencha todos os campos")
      return;
    }
    setLoading(true);
    await signUp({ name: inputs.name, email: inputs.email, password: inputs.password1 });
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Cadastrar</title>
        <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerCenter}>
        <Image src="/LOGOSECRETARY.png" alt='Logo Secretary Helper' width={200} height={200} />
        <h1>Cadastre-se</h1>
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputs.name} onChange={handleInputs} name="name" placeholder='Seu nome'></input>
            <input type="email" value={inputs.email} onChange={handleInputs} name="email" placeholder='Seu email'></input>
            <input type="password" value={inputs.password1} onChange={handleInputs} name="password1" placeholder='Sua senha'></input>
            <input type="password" value={inputs.password2} onChange={handleInputs} name="password2" placeholder='Sua senha'></input>
            <button type='submit'> Cadastrar</button>
          </form>
          <Link href={'/'}> Já possuo uma conta</Link>
        </div>
      </div>
    </>
  )
}
