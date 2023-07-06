import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  console.error(error);

  const errorMessage = typeof error === "object" && error !== null ? (error as Error).message : "An unexpected error has occurred";

  return (
    <div id="error-page" className="md:container md: mx-auto p-20 text-center leading-10">
      <h1>Oops!</h1>
      <p>Sorry, that page doesn't exist! {errorMessage}</p>
    </div>
  );
}

export default ErrorPage;