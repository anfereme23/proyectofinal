import { Button, Input, Card, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: signupErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);

    if (user) navigate("/tasks");
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {signupErrors &&
          signupErrors.map((err) => (
            <p className="text-red-500 text-center">{err}</p>
          ))}
        <div className="text-2xl font-bold">Registro</div>

        <form onSubmit={onSubmit}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            type="text"
            placeholder="Ingrese su primer nombre"
            {...register("name", { required: true })}
          />

          {errors.name && <p className="text-red-500"> Name is required </p>}

          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            placeholder="Ingrese su correo eléctronico"
            {...register("email", { required: true })}
          />

          {errors.email && <p className="text-red-500"> Email is required </p>}

          <Label htmlFor="contraseña">Contraseña</Label>
          <Input
            type="password"
            placeholder="Crea una contraseña"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <p className="text-red-500"> Password is required </p>
          )}
          <Button>Register</Button>

          <div className="flex justify-between my-4">
            <p className="mr-4">¿Ya tienes una cuenta?</p>
            <Link to="/login" className="font-bold">
              ¡Inscríbete!
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
};
