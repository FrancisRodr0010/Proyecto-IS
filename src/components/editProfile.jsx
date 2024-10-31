/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleReturn = () => {navigate('/Dashboard')}

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost/API/login.php", {
              username,
              password,
          });
  
          console.log("Respuesta del servidor:", response.data); // Verifica la respuesta
  
          if (response.data.success) {
              const userId = response.data.userId; // Asegúrate de que tu API devuelva el userId
              
              // Redirigir a ModifyProfile pasando username y userId
              navigate('/modify', { state: { username, userId } });
              console.log("ID de usuario enviado:", userId); // Verifica el ID antes de navegar
          } else {
              alert("Credenciales incorrectas");
          }
      } catch (error) {
          console.error("Error al iniciar sesión:", error);
      }
  };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Correo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Verificar usuario</button>
                <button onClick={handleReturn} className="btn btn-secondary mt-3 w-100">Cancelar</button>
            </form>
        </div>
    );
};

export default EditProfile;*/
