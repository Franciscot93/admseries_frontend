const Error = ({ mensaje }) => {
  return (
    <div>
      <div className="bg-red-800 p-1  rounded-md text-center font-bold">
        <p className="text-white">{mensaje}</p>
      </div>
    </div>
  );
};

export default Error;
