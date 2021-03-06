import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../Utilities/Firebase/firebase'

import FormInput from '../Form/Form'
import Button from '../Button/Button'
import './cadastrar.styles.scss'
import { signUpStart } from '../../store/user/user.action'

const cadastroForm = {
  displayName: '',
  email: '',
  senha: '',
  comfirmeSenha: '',
}

const Cadastrar = () => {
  const [form, setForm] = useState(cadastroForm)
  const { displayName, email, senha, comfirmeSenha } = form
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (senha !== comfirmeSenha) {
      alert('Usuario e senha não combina')
      return
    }

    try {
      dispatch(signUpStart(email, senha, displayName))

      setForm(cadastroForm)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email ja em uso')
      } else {
        console.log('Ouve um erro na criação de usuario', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  return (
    <div className='cadastre'>
      <h2>Não tem uma conta?</h2>
      <span>Cadastre-se com email e senha</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Nome'
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Senha'
          type='password'
          name='senha'
          value={senha}
          onChange={handleChange}
          required
        />
        <FormInput
          label='Comfirme Senha'
          type='password'
          name='comfirmeSenha'
          value={comfirmeSenha}
          onChange={handleChange}
          required
        />
        <Button>Cadastrar</Button>
      </form>
    </div>
  )
}
export default Cadastrar
