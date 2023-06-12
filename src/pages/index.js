/**
 * Library
 */

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full min-h-screen place-content-center pt-32">
      <p>トップページでーす</p>
      Link to <Link href="/login">Login</Link>
    </div>
  );
}
