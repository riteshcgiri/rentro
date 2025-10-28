import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSearchFocused, setSelectedCar, toggleFilterVisibility } from '../redux/slices/searchFilterSlice';
import cars from './carsData';
import { Transmision, People } from '../assets/svgs/index';

const Search = ({ icon1, icon2, iconalt, className }) => {
  const dispatch = useDispatch();
  
  const { searchOptions, isSearchFocused, isFilterVisible, selectedCar } = useSelector((state) => state.searchFilterSlice);
  const searchVal = searchOptions.searchValue;
// console.log('Selected Car:', selectedCar);

  // Filtered car results
const filteredCars = searchVal ? cars?.filter((car) => {
      const query = searchVal.toLowerCase();
      return (
        car.name.toLowerCase().includes(query) ||
        car.type?.toLowerCase().includes(query) ||
        car.transmission?.toLowerCase().includes(query) ||
        car.passengers?.toString().includes(query) ||
        car.fuleCapacity?.toString().includes(query)
      );
    })
  : [];

  const handleSearchClick = () => {
    if (!searchVal) {
      document.getElementById('searchBar').focus();
    } else {
      // Do something on search click if needed
      console.log('Search clicked:', searchVal);
    }
  };

  return (
    <form
      className={`relative flex border-2 focus-within:border-netural-600 border-gray-300 w-full px-5 rounded-full items-center gap-2`}
      onSubmit={(e) => e.preventDefault()}
    >
      <img
        src={icon1}
        alt={iconalt}
        className={`cursor-pointer ${className}`}
        onClick={handleSearchClick}
      />

      <input
        type="text"
        placeholder="Search your car here!!"
        id="searchBar"
        autoComplete="off"
        value={searchVal}
        onFocus={() => dispatch(setSearchFocused(true))}
        onBlur={() => setTimeout(() => dispatch(setSearchFocused(false)), 500)}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        className="px-5 py-2 flex-1 border-none outline-none text-secondary-500"
      />

      <div className="relative overflow-hidden w-11 h-11">
        <img
          src={icon2}
          alt={iconalt}
          className={`w-full duration-200 scale-110 absolute top-2.5 hover:-top-8 cursor-pointer ${className}`}
          onClick={() => dispatch(toggleFilterVisibility(!isFilterVisible))}
        />
      </div>

      {isSearchFocused && (
        <div
          className={`absolute p-4 top-12 left-0 w-[160%] z-20 bg-white shadow-black/10 shadow-xl border border-secondary-100 rounded-md overflow-hidden overflow-y-auto ${
            searchVal ? 'grid grid-cols-2 gap-y-2 gap-x-2' : ''
          } perspective-100`}
        >
          {searchVal ? (
            filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center p-4 border rounded-md shadow-lg cursor-pointer hover:shadow-xl scale-95 hover:scale-100 transition-all duration-200 transform"
                  onClick={() => dispatch(setSelectedCar(car))}
                >
                  <img src={car.img} alt={car.name} className="h-10 object-cover rounded-md mb-2" />
                  <div className="w-3/4 ml-3">
                    <h3 className="text-lg font-semibold text-secondary-800">{car.name}</h3>
                    <div className="flex items-center gap-4 my-3">
                      <div className="flex items-center gap-2 font-medium text-secondary-400">
                        <img src={Transmision} alt="" className="w-5" />
                        <p className="text-sm text-secondary-600">{car.transmission}</p>
                      </div>
                      <div className="flex items-center gap-2 font-medium text-secondary-400">
                        <img src={People} alt="" className="w-5" />
                        <p className="text-xs text-secondary-500">{car.passengers} People</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 font-semibold">₹ {car.discountPrice * 90}/day</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-2 w-full text-center text-secondary-500 py-4">
                🚫 No matching cars found. Try something else!
              </p>
            )
          ) : (
            <p className="w-full text-center text-secondary-500 py-4">🚘 Cruising for answers? Start typing...</p>
          )}
        </div>
      )}
    </form>
  );
};

export default Search;
