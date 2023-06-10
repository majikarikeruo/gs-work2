/**
 * Library
 */
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  return (
    <div className="h-full w-full min-h-screen place-content-center pt-32">
      <p>トップページでーす</p>
      Link to <a href="/login">Login</a>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session)
    return {
      redirect: {
        destination: "/vote",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};
