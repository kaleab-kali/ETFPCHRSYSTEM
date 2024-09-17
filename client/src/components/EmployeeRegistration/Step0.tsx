// Step0.tsx
interface Step0Props {
  onTypeSelect: (type: string) => void;
}

const Step0: React.FC<Step0Props> = ({ onTypeSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-8">
        Are you a Civilian or in the Military?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Civilian Card */}
        <div
          onClick={() => onTypeSelect("civil")}
          className="cursor-pointer p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Civilian</h3>
            <p className="text-gray-500 mt-2">For Civilian Employees</p>
          </div>
        </div>

        {/* Military Card */}
        <div
          onClick={() => onTypeSelect("military")}
          className="cursor-pointer p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Military</h3>
            <p className="text-gray-500 mt-2">For Military Personnel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step0;
