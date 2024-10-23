import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css"; // Importando o CSS

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState(""); // Para nome completo
  const [cpf, setCpf] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [complement, setComplement] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Registro no Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Enviar as informações do usuário para o backend e salvar no PostgreSQL
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid, // ID do usuário no Firebase
          full_name,
          cpf,
          email,
          city,
          state,
          cep,
          complement,
          gender,
          phone,
          birthdate,
        }),
      });

      alert("Registro bem-sucedido!");
      // Limpar os campos após o registro
      setEmail("");
      setPassword("");
      setFullName("");
      setCpf("");
      setCity("");
      setState("");
      setCep("");
      setComplement("");
      setGender("");
      setPhone("");
      setBirthdate("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h1>Registrar</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="input-row">
          <input
            type="text"
            placeholder="Nome Completo"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Gênero"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar</button>
        <p>
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
