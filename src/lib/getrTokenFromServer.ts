import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getTokenFromServer = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    return token ?? null;
  } catch (error) {
    console.log("No authenticated session found",error);

    return null;
  }
};