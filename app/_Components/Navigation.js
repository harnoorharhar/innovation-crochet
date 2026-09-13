import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import LogoutButton from "./LogoutButton";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiShoppingBag, GiShoppingCart } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";

export default async function Navigation() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const linkStyles =
    "font-poppins flex items-center gap-2 rounded-full px-4 py-2 text-brand-navy font-medium transition-all duration-200 hover:bg-brand-cream hover:text-brand-pink hover:-translate-y-0.5";

  const iconStyles =
    "text-xl transition-transform duration-200 group-hover:scale-110";

  return (
    <nav className="font-poppins">
      <ul className="flex items-center gap-3">
        <li>
          <Link href="/#about" className={`${linkStyles} group`}>
            <IoDocumentTextOutline className={iconStyles} />
            <span>About</span>
          </Link>
        </li>

        <li>
          <Link href="/shop" className={`${linkStyles} group`}>
            <GiShoppingBag className={iconStyles} />
            <span>Shop</span>
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link
                href="/signup"
                className="font-poppins rounded-full bg-brand-pink px-5 py-2 font-medium text-white transition-all duration-200 hover:bg-brand-red hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className="font-poppins rounded-full border-2 border-brand-navy px-5 py-2 font-medium text-brand-navy transition-all duration-200 hover:bg-brand-navy hover:text-white"
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/cart" className={`${linkStyles} group`}>
                <GiShoppingCart className={iconStyles} />
                <span>Cart</span>
              </Link>
            </li>

            <li>
              <Link href="/account" className={`${linkStyles} group`}>
                <MdOutlineManageAccounts className={iconStyles} />
                <span>Account</span>
              </Link>
            </li>

            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
