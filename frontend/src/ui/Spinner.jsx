function Spinner() {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-22 w-22 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );
}

export default Spinner;
