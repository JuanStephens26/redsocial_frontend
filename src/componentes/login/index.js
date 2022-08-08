import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core"
import ButtonMaterial from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container, Header } from "./styles";
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from "../../context/UserContext"
import TwitterIcon from "@mui/icons-material/Twitter";


export const Login = () => {
 const URI = process.env.URI || "http://localhost:4000/";
 const userRef = useRef();
 const errRef = useRef();

 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [error, setError] = useState("")
 const [userContext, setUserContext] = useContext(UserContext);

 const formSubmitHandler = e => {
  e.preventDefault()
  setIsSubmitting(true)
  setError("")

  const genericErrorMessage = "¡Algo salió mal! Por favor, inténtelo de nuevo más tarde."
  fetch(URI + "auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  })
    .then(async response => {
      setIsSubmitting(false)
      if (!response.ok) {
        if (response.status === 400) {
          setError("¡Por favor, rellene todos los campos correctamente!")
        } else if (response.status === 401) {
          setError("Combinación de correo electrónico y contraseña no válida.")
        } else {
          setError(genericErrorMessage)
        }
      } else {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      }
    })
    .catch(error => {
      setIsSubmitting(false)
      setError(genericErrorMessage)
      console.log(error)
    })
}

 useEffect(() => {
  userRef.current.focus();
 }, [])
 
 useEffect(() => {
 }, [email, password])

  return (
    <Container>
      <TwitterIcon className="mediasocial-logo" />
        <>
        <section>
          <h1>Ingresar</h1>
           <form onSubmit = {formSubmitHandler} >

            <label htmlFor= "username">Usuario: </label>
            <input 
            type="text"  
            id="username"
            ref={userRef}
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            required                
            />


            <label htmlFor= "password">Contraseña: </label>
            <input 
            type="password"  
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            required                
            />
 {error && <Callout intent="danger">{error}</Callout>}
           
            <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Accediendo" : "Acceder"}`}
          fill
          type="submit"
          className="bp4-minimal"
        />
           </form>
           <p>
            ¿Nececitas una cuenta? <br/>
            <span className="line">
             <Link to ="/register">
              <ButtonMaterial variant="contained" size="small">Registro</ButtonMaterial>
              </Link>
            </span>
           </p>
        </section>
  </> 
      </Container>
  )
}


