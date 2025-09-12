import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function Menu({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </a>
  );

  const items = [
    { icon: "pi pi-home", command: () => navigate("/") },
    { icon: "pi pi-user", command: () => navigate("/perfil") },
    { icon: "pi pi-bell", badge: 1, template: itemRenderer },
    { icon: "pi pi-plus-circle", command: () => navigate("/newPost") },
  ];

  const start = (
    <img alt="logo" src="src/imagens/Logo.png" height="45" className="mr-2" />
  );

  const end = (
    <div className="flex align-items-center gap-3">
     
    </div>
  );

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
