/**
 * React
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import SubmitButton from "@/components/home/SubmitButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  /**
   * @function handleSubmit
   * @description フォーム送信時の処理
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log(data, session, error);

      if (error) {
        alert(error.message);

        return;
      }

      alert("ログインが完了しました。");
      router.replace("/vote"); // ここでリダイレクト
    } catch (error) {
      alert(error);
    }
    return;
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center py-16 px-3 bg-[#f1c232]`}
    >
      <div className="w-full max-w-lg p-10 bg-white shadow-xl  rounded-2xl">
        <Heading text={"Login"} />

        <form>
          <div className="mb-10">
            <Label text="Email" />
            <Input data={email} handle={setEmail} />
          </div>
          <div className="mb-10">
            <Label text="Password" />
            <PasswordInput data={password} handle={setPassword} />
          </div>
          <div className="flex justify-center">
            <SubmitButton text="ログイン" handleSubmit={handleSubmit} />
          </div>

          <div className="text-center pt-8">
            <Link href="/register" className="no-underline text-[#0468bb]">
              新規登録へ
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
