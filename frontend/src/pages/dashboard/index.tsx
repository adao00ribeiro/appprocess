import Head from 'next/head'
import { Inter } from '@next/font/google'
import React, { useContext, useEffect, useState } from 'react'
import { BiExit } from "react-icons/bi"
import styles from './styles.module.scss'
import { AuthContext } from '../../context/AuthContext'
import { Cadastro } from '../../components/Cadastro'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Inicio } from '../../components/Inicio'
import { api } from '../../services/apiClient'
import { Processo } from '../../components/Processo'
import { Configuracao } from '../../components/Configuracao'


const inter = Inter({ subsets: ['latin'] })

export default function DashBoard() {
  const { step, setStep, user, signOut } = useContext(AuthContext)
  const [botconnected, setBotConnected] = useState(false)
  const [dialogQRcode, setDialogQRcode] = useState<HTMLDialogElement>()
  const [qrcode, setqrcode] = useState("")
  const [TextStatusBot, setTextStatusBot] = useState("");
  const [ErrorBot, setErrorBot] = useState(false);


  useEffect(() => {
    setDialogQRcode(document.getElementById("dialogQRcode") as HTMLDialogElement);
    const response = api.post('/bot/status');
    response.then(data => {
      if (data.data.connected) {
        setBotConnected(data.data.connected);
      }
    }).catch(err => {
      console.log(err)
    })

  }, []);
  const Select = () => {
    if (step == 1) {
      return (<Inicio></Inicio>)
    }
    else if (step == 2) {
      return <Cadastro></Cadastro>
    }
    else if (step == 3) {
      return <Processo openModal={openModal}></Processo >
    }
    else if (step == 4) {
      return <Configuracao ></Configuracao >
    }
  }
  const iconConnected = () => {
    if (botconnected) {
      return <div className={styles.statusWhatappGreen} onClick={() => { openModal() }} ></div>
    }
    return <div className={styles.statusWhatappRed} onClick={() => { openModal() }}></div>
  }
  const handleExit = () => {
    signOut();
  }
  function openModal() {

    botconectar();
    dialogQRcode.showModal();
  }

  function closeModal() {
    dialogQRcode.close();
  }
  async function botconectar() {
    const response = await api.post(`/bot`, { email: user.email });
    const myinteval = setInterval(() => {
      if (response.data == "CRIADO" || response.data == "RODANDO") {

        setTextStatusBot("Bot Criado.");
        botstatus();
        clearInterval(myinteval);
      }
    }, 2000)

  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function botstatus() {
    setErrorBot(false);
    setTextStatusBot("verificando status do bot");
    const response = await api.post(`/bot/status`, { email: user.email });
    const qr_code = response.data.qr_code;
    const connected = response.data.connected;
    console.log(response.data);
    if (qr_code) {
      setTextStatusBot("");
      setqrcode(qr_code.base64Qr)
    } else {
      setqrcode("")
    }
    setBotConnected(connected);
    if (connected && dialogQRcode.open) {
      closeModal();
    } else if (response.data == "error") {
      setErrorBot(true);
      setTextStatusBot("");
      return null;
    } else {
      await delay(10000);
      botstatus();
    }

  }
  async function botexcluir() {
    const response = await api.delete(`/bot/delete`);
    console.log(response)
  }
  return (
    <>
      <Head>
        <title>Secretary Helper</title>
        <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.root}>
        <header>
          <div className={styles.containerHeader1}>
            <img src='/LOGOSECRETARY.png'></img>
            <div className={styles.containerEmailExit}>
              {iconConnected()}
              <span>{user.email}</span>
              <button onClick={handleExit}> <BiExit size={40}></BiExit></button>
            </div>
          </div>
          <nav>
            <a onClick={() => { setStep(1) }}>Inicio</a>
            <a onClick={() => { setStep(2) }}>Cadastro</a>
            <a onClick={() => { setStep(3) }}>Processos</a>
            <a onClick={() => { setStep(4) }}>Configuracao</a>
          </nav>
        </header>
        <dialog id="dialogQRcode" className={styles.modal}>
          <div className={styles.containerModal}>
            <div className={styles.childdivmodal}>
              <button onClick={() => { closeModal() }}>X</button>
            </div>
            <div className={styles.containerImagemQrCode}>
              {qrcode != "" && !botconnected &&
                <img src={qrcode}></img>
              }
              <h1>{TextStatusBot}</h1>
              {ErrorBot &&
                <button onClick={() => { botconectar() }}>Tentar Novamente</button>
              }
            </div>
            {botconnected &&
              <button onClick={() => { botexcluir() }}>Excluir Bot</button>
            }
          </div>
        </dialog>
        <main className={styles.main}>
          {Select()}
        </main>
      </main>
    </>
  )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})