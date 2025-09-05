import { Card } from "primereact/card";
import { Button } from "primereact/button";

function Posts({ posts }) {
  const footer = (
    <>
      <Button label="Like" icon="pi pi-thumbs-up" />
      <Button
        label="Comment"
        severity="secondary"
        icon="pi pi-comment"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      {posts.map((post, index) => (
        <Card
          key={index}
          title={post.title}
          subTitle={post.user}
          footer={footer}
          className="mb-4"
          style={{ width: "600px", borderStyle: "double" }}
        >
          <p className="m-0">{post.content}</p>
        </Card>
      ))}
    </div>
  );
}

export default Posts;
