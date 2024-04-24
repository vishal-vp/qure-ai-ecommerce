import { AUTH_TOKEN_KEY, PATHS } from "@/app-constants";
import Cart from "@/components/Cart";
import ProfileWidget from "@/components/ProfileWidget";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push(PATHS.LOGIN);
  }

  return (
    <>
      <Link href={PATHS.PRODUCTS}>
        <HomeOutlined title="Home" />
      </Link>
      <Cart />
      <ProfileWidget />
      <LogoutOutlined title="Logout" onClick={handleLogout} />
    </>
  );
}
