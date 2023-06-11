/**
 * React
 */
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

/**
 * Library
 */
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useAuth = () => {
  /** library */
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  /******************************
   * @function doLogout
   * @description ログアウト処理
   ******************************/
  const doLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      console.log("ログアウトしました");
      router.replace("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return { doLogout };
};

export default useAuth;
