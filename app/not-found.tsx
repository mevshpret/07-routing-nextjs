export default function NotFoundPage() {
  return (
    <>
      <h1
        style={{
          fontSize: "36px",
          fontWeight: 700,
          margin: "0px auto",
          color: "#1a1a1a",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        404 - Page not found
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#444444",
          lineHeight: "28px",
          marginBottom: "16px",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
