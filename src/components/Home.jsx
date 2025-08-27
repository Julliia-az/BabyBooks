import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";

function Home() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      //label: "Home",
      icon: "pi pi-home",
    },
    {
      //label: "User",
      icon: "pi pi-user",
    },
    {
      //label: "Contact",
      icon: "pi pi-bell",
      badge: 1,
      template: itemRenderer,
    },
  ];

  const start = (
    <img
      alt="logo"
      src="src/imagens/BabyBook.png"
      height="45"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
        style={{
          backgroundColor: "#cb9383",
          borderRadius: "30",
          height: "40px",
          width: "200px",
        }}
      />
      {/* <Avatar icon="pi pi-user" /> */}
    </div>
  );

  return (
    <div className="card">
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{ backgroundColor: "#c97d68" }}
      />
    </div>
  );
}

export default Home;
