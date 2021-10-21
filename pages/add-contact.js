import Header from "../src/components/header"
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function AddContacts () {
    // Para ocultar el boton Agregar si no se carga la info
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const processData = (data) => {
        const URL_API = "https://3a7axh99m1.execute-api.us-east-2.amazonaws.com/production/contacts";
        console.debug(data);
        setLoading(true);

        axios.post(URL_API, data)
        .then((response) => {
            console.debug(response);
            setLoading(false);
        })
    }

    return (
        <div className="container">
            <Header title="Agregar contacto" type="warning" />

            <div className="columns">
                <div className="column is-half" >
                    <form onSubmit={handleSubmit(processData)}>
                        <div className="field">
                            <label className="label">Nombre:</label>
                            <div className="control">
                                <input type="text" {...register('nombre', {required: true})} />
                            </div>
                            {errors.nombre && <span>El nombre es requerido</span>}
                        </div>

                        <div className="field">
                            <label className="label">Apellido:</label>
                            <div className="control">
                                <input type="text" {...register('apellido', {required: true})} />
                            </div>
                            {errors.apellido && <span>El apellido es requerido</span>}
                        </div>

                        <div className="field">
                            <label className="label">Correo:</label>
                            <div className="control">
                                <input type="email" {...register('email', {required: true})} />
                            </div>
                            {errors.email && <span>El correo es requerido</span>}
                        </div>

                        {!loading && <button type="submit" className="button is-primary">Agregar</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}