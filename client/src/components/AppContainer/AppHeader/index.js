import { AUTH_TOKEN_KEY, PATHS } from "@/app-constants";
import Cart from "@/components/Cart";
import ProfileWidget from "@/components/ProfileWidget";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./index.module.css";

export default function AppHeader() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push(PATHS.LOGIN);
  }

  return (
    <div className={styles.appHeader}>
      <Link href={PATHS.PRODUCTS}>
        <HomeOutlined title="Home" className="qure-icon" />
      </Link>
      <div className={styles.appHeaderRightSection}>
        <div>
          <Cart />
        </div>
        <div>
          <ProfileWidget />
        </div>
        <div>
          <LogoutOutlined
            title="Logout"
            onClick={handleLogout}
            className="qure-icon"
          />
        </div>
      </div>
    </div>
  );
}
