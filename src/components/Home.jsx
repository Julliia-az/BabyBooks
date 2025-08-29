import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

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
      command: () => navigate("/"),
    },
    {
      //label: "User",
      icon: "pi pi-user",
      command: () => navigate("/perfil"),
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
      src="src/imagens/Logo.png"
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

function Posts(){
  const header = (
         <img alt="Card" src="" />
    );
    const footer = (
        <>
            <Button label="Like" icon="pi pi-thumbs-up" />
            <Button label="Comment" severity="secondary" icon="pi pi-comment" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center" style={{width: '45rem'}}>
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}

function Home(){
  return(
    <div>
      <Menu />
      <Posts />
    </div>
    
  )
}

export default Home;
