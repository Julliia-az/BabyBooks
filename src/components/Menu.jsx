import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const items = [
    { icon: "pi pi-home", command: () => navigate("/") },
    { icon: "pi pi-user", command: () => navigate("/perfil") },
  ];

  const start = (
    <img alt="logo" src="src/imagens/Logo.png" height="45" className="mr-2" />
  );

  const end = <div className="flex align-items-center gap-3"></div>;

  return (
    <div className="card">
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{
          position: "fixed",
          width: "99%",
          justifyContent: "center",
          backgroundColor: "#c97d68",
          zIndex: "5",
        }}
      />
    </div>
  );
}

export default Menu;
