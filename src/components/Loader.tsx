function Loader({ fullPage = false }: { fullPage: boolean }) {
  return (
    <div
      className={`${
        fullPage ? "h-screen" : "h-custom"
      } w-full flex items-center justify-center`}
    >
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}

export default Loader;
