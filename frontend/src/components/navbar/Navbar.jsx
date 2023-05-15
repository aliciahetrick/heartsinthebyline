import NavbarMobile from "./NavbarMobile";
import NavbarLaptop from "./NavbarLaptop";
import { useWindowDimensions } from "../../constants/useWindowDimensions";

const Navbar = () => {
  const { width } = useWindowDimensions();
  return <>{width < 800 ? <NavbarMobile /> : <NavbarLaptop />}</>;
};

export default Navbar;
