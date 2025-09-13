import { Card } from "primereact/card";
import { Button } from "primereact/button";

function Posts({ posts }) {
  const footer = (
    <>
      <Button
        label="Like"
        icon="pi pi-thumbs-up"
        style={{ backgroundColor: "#c97d68", borderColor: "#c97d68", color: "white" }}
      />
      <Button
        label="Comment"
        severity="secondary"
        icon="pi pi-comment"
        style={{ marginLeft: "0.5em", backgroundColor: "#c6cdbc", borderColor: "#c6cdbc", color: "white" }}
      />
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        gap: "1rem",
      }}
    >
      {posts.map((post, index) => (
        <Card
          key={index}
          title={post.title}
          subTitle={post.user}
          footer={footer}
          className="mb-4"
          style={{
            width: "100%",      
            maxWidth: "600px",  
            minWidth: "280px",  
            borderStyle: "double",
            boxSizing: "border-box",
            wordBreak: "break-word",
          }}
        >
          <p className="m-0">{post.content}</p>
        </Card>
      ))}
    </div>
  );
}

export default Posts;
