import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarPresupuesto } from "../slices/presupuestoSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

const PresupuestoToggle = () => {
  const presupuesto = useSelector((state) => state.presupuesto.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //aqui guardaremos los valores que nosotros vamos a pasar
  const [monto, setMonto] = useState(0);
  // permite que el input se pueda editar
  const [errors, setErrors] = useState({});
  //permiten mostrar el msj  de error en el input
  // const [successMessage, setSuccessMessage] = useState('');
  // const [cononModal, setConfirmModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isCheckboxSelect, setIsCheckboxSelect] = useState(false);

  const items = [
    {
      name: "entretenimiento",
      icon: "game-controller-outline",
      color: "bg-purple-500",
    },
    {
      name: "restauurante",
      icon: "restaurant-outline",
      color: "bg-yellow-500",
    },
    { name: "ropa", icon: "shirt-outline", color: "bg-green-400" },
    { name: "seguro", icon: "shield-checkmark-outline", color: "bg-blue-500" },
    { name: "mascota", icon: "paw-outline", color: "bg-[#8b4513]" },
  ];

  // const objeto2 = { nombre: objeto.nombre, icono: objeto.icono, presupuestoTotal: objeto.presupuestoTotal, total: objeto.total, color: objeto.color }
  console.log(presupuesto);

  const handleCheckboxChange = (item) => {
    console.log(item);
    if (selectedItem === item) {
      setSelectedItem(null); // Si ya está seleccionado, deseleccionarlo
      setIsCheckboxSelect(false);
    } else {
      setSelectedItem(item); // Si no está seleccionado, seleccionarlo
      setIsCheckboxSelect(true);
    }
  };

  const handleAgregar = () => {
    const nuevoPresupuesto = {
      id: uuidv4(),
      nombre: selectedItem ? selectedItem.name : null,
      icono: selectedItem ? selectedItem.icon : null,
      color: selectedItem ? selectedItem.color : null,
      monto: monto,
      total: presupuesto,
    };

    const validaErrores = {};

    if (!selectedItem) {
      validaErrores.selecteditem = "Debes seleccionar un item";
    }
    if (!presupuesto) {
      validaErrores.presupuesto = "El total es obligatorio";
    } else if (presupuesto <= 0) {
      validaErrores.presupuesto = "El total no puede ser menor a 0";
    }
    if (!monto) {
      validaErrores.monto = "El monto es obligatorio";
    } else if (monto > presupuesto) {
      validaErrores.monto = "El monto no puede ser mayor al total";
    } else if (monto < 0) {
      validaErrores.monto = "El monto no puede ser menor a 0";
    }

    if (Object.keys(validaErrores).length > 0) {
      setErrors(validaErrores);
      return;
    } else if (Object.keys(validaErrores).length === 0) {
      setErrors({});
      console.log(nuevoPresupuesto);
      dispatch(agregarPresupuesto(nuevoPresupuesto));
      navigate("/home/categorias");
      // .then((res)=>{
      //   console.log(res)
      //   setSuccessMessage("se cargo su presupuesto con exito")
      //   setConfirmModal(true)
      // })
      // .catch((erroe)=>{
      //   console.log(erroe)
      //   setSuccessMessage("no se cargo su presupuesto")
      //   setConfirmModal(true)
      // })
      // .finaly(()=>{
      //   setTimeout(() => {
      //     setConfirmModal(false)
      //     },4000)
      // })
    }
  };

  return (
    <div className="flex w-full xl:w-[80%] min-h-screen flex-col items-center justify-start bg-fondo h-auto p-4 sm:p-6 gap-4 sm:gap-6">
      {/* {cononModal ? (
      <div className="w-full h-[80px] flex items-center justify-center">
        <p className="text-center text-green-500 font-parrafo font-[500]">{successMessage}</p>
      </div>) : null
      } */}
      <section
        className="w-[300px] h-[100px] flex flex-col gap-3 justify-center p-4 rounded-md bg-white"
        style={{ boxShadow: "9px 9px 22px #ced1d9, -9px -9px 22px #ffffff" }}
      >
        <h2 className="w-full text-left font-titulo font-[500] text-hoverBotonSubmenu capitalize">
          presupuesto limite
        </h2>
        <p className="w-full text-center font-parrafo font-[500] text-bgSubmenu capitalize">
          ${presupuesto}
        </p>
      </section>

      <section
        className="card w-[300px] h-auto p-5 rounded-md bg-[#ffff] flex flex-col gap-2 "
        style={{ boxShadow: "9px 9px 22px #ced1d9, -9px -9px 22px #ffffff" }}
      >
        {items.map((element) => {
          return (
            <div key={element.name}>
              <label
                className={`checkPresupuesto w-full flex flex-row justify-start items-center flex-wrap rounded-[50px] p-1 gap-1 font-titulo font-[600] capitalize   transition-all duration-300 ease-in`}
              >
                <span
                  className={`w-[30px] h-[30px] flex justify-center items-center rounded-full ${element.color} text-colorFuente2Submenu text-[1.2rem] text-white transition-all duration-300 ease-in`}
                >
                  <ion-icon name={element.icon}></ion-icon>
                </span>
                {element.name}

                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(element)}
                  className="w-[20px] h-[20px] rounded-[50%] bg-purple-500 text-red-500 "
                  disabled={isCheckboxSelect}
                />
              </label>
              <div className="w-full h-[2px] bg-bgSubmenu rounded-sm opacity-40"></div>
            </div>
          );
        })}
        {errors.selecteditem && (
          <p className="text-red-500">{errors.selecteditem}</p>
        )}

        <div className="w-full h-auto flex flex-col justify-center items-center gap-2">
          <h2 className=" w-full font-titulo font-[500] text-center">
            Ingresa Monto
          </h2>

          <input
            type="number"
            value={monto}
            placeholder="Monto"
            onChange={(e) => setMonto(e.target.value)}
            className="w-[130px] h-[30px] p-2 rounded-md font-parrafo font-[500] bg-fondo text-bgSubmenu outline-none"
          />
          {errors.monto && <p className="text-red-500">{errors.monto}</p>}

          <button
            onClick={handleAgregar}
            className="mt-2 p-1 w-[130px] rounded-md font-parrafo font-[500] bg-hoverBotonSubmenu text-white outline-non hover:bg-colorFuente1Submenu transition-colors duration-300 ease-in-out "
          >
            Agregar
          </button>
        </div>
      </section>
    </div>
  );
};

export default PresupuestoToggle;

//ropa : <ion-icon name="shirt-outline"></ion-icon>
//<ion-icon name="shirt"></ion-icon>

//restaurante: <ion-icon name="restaurant-outline"></ion-icon>
//" " <ion-icon name="restaurant"></ion-icon>

//entretenimiento: <ion-icon name="game-controller-outline"></ion-icon>
//<ion-icon name="game-controller"></ion-icon>

//mascota: <ion-icon name="game-controller"></ion-icon>
//<ion-icon name="paw"></ion-icon>

//seguro <ion-icon name="shield-checkmark-outline"></ion-icon>
//<ion-icon name="shield-checkmark"></ion-icon>

/* Modelo de pruebas
const objeto2 = { nombre: objeto.nombre, icono: objeto.icono, presupuestoTotal: objeto.presupuestoTotal, total: objeto.total, color: objeto.color }
 */
