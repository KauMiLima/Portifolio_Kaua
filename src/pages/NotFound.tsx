const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md">
        <p className="font-display text-8xl text-signal">404</p>
        <h1 className="mt-4 text-2xl">Essa página não existe.</h1>
        <p className="mt-2 text-mute">O endereço pode ter mudado ou estar digitado errado.</p>
        <a href="/" className="btn-solid mt-8">
          Voltar ao portfólio
        </a>
      </div>
    </main>
  );
};

export default NotFound;
