import { HiOutlineLogout } from "react-icons/hi";
import { logoutAction } from "../lib/actions";

function LogoutButton({ styles = "" }) {
  return (
    <form action={logoutAction}>
      <button type="submit" className={styles}>
        <div className="flex items-center">
          <span className="mr-2">Log out</span>
          <span className="text-lg">
            <HiOutlineLogout />
          </span>
        </div>
      </button>
    </form>
  );
}

export default LogoutButton;
