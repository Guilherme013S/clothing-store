import React, { useState } from 'react'
import {
  EntrarWithGooglePopup,
  createUserDocumentFromAuth,
  entrarAuthUserWithEmailAndPassword,
} from '../../Utilities/Firebase/firebase'

import FormInput from '../../components/Form/Form'
import Button from '../Button/Button'
import './entrar.styles.scss'

const defaultFormFields = {
  email: '',
  senha: '',
}

const Entrar = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, senha } = formFields

  const EntrarComGoogle = async () => {
    const response = await EntrarWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(response.user)
    console.log(userDocRef)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await entrarAuthUserWithEmailAndPassword(email, senha)
      console.log(response)
      setFormFields(defaultFormFields)
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Senha incorreta')
          break
        case 'auth/user-not-found':
          alert('Usuario não cadastrado')
          break
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='entrar'>
      <h2>Ja tem um conta</h2>
      <span>Entre com email e senha</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label='Senha'
          type='password'
          required
          name='senha'
          value={senha}
          onChange={handleChange}
        />
        <div className='buttons'>
          <Button type='submit'>Entrar</Button>
          <Button type='button' buttonType='google' onClick={EntrarComGoogle}>
            Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Entrar