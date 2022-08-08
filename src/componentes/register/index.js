import React, { useState, useContext } from "react";
import { Button, FormGroup, Callout, InputGroup } from "@blueprintjs/core";
import ButtonMaterial from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Container, Header } from "./styles";
import { UserContext } from "../../context/UserContext"
import TwitterIcon from "@mui/icons-material/Twitter";

export const Register = () => {
  const URI = process.env.URI || "http://localhost:4000/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
  
    const genericErrorMessage = "¡Algo salió mal! Por favor, inténtelo de nuevo más tarde."
    console.log({ username: email, password, firstName, lastName });
    fetch(URI + "auth", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password,firstName, lastName }),
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

  return (
    <Container>
      <TwitterIcon className="mediasocial-logo" />
      <section>
        <>
        <h1>Registro</h1>
        <form className="auth-form" onSubmit = {formSubmitHandler}>
            <FormGroup label="Nombre" labelFor="firstName">
              <input
                id="firstName"
                placeholder=""
                className="campos"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </FormGroup>
            <FormGroup label="Apellido" labelFor="firstName">
              <input
                id="lastName"
                placeholder=""
                className="campos"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </FormGroup>
            <FormGroup label="Usuario" labelFor="email">
              <input
                id="email"
                type="email"
                placeholder=""
                className="campos"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormGroup>
            <FormGroup label="Contraseña" labelFor="password">
              <input
                id="password"
                placeholder=""
                type="password"
                className="campos"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormGroup>
            {error && <Callout intent="danger">{error}</Callout>}
          
            <Button intent="primary" text="Registrar" fill type="submit" />
          </form>
        </>
        <p>
            ¿Ya tienes cuenta?<br/>
            <span className="line">
             <Link to ="/login">
              <ButtonMaterial variant="contained" size="small">Acceder</ButtonMaterial>
              </Link>
            </span>
           </p>
      </section>
    </Container>
  );
};

export default Register;
