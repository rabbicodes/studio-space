"use client";
import Image from "next/image";
import { UserRound, Mail, Pencil, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await authClient.updateUser({
      name: data.name as string,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    router.refresh();
    toast.success("User name Updat successfully!");

    console.log(resData);
  };

  return (
    <section className="min-h-screen bg-[#faf9fc] px-4 py-10 text-[#18151d] transition-colors duration-300 dark:bg-[#09090b] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Dashboard Heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#9b2ae5]">
            <LayoutDashboard size={18} />
            User Panel
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Welcome to your personal dashboard. Manage your account information
            and keep your profile details up to date.
          </p>
        </div>

        {/* User Information */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#121116] sm:p-8">
          <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* User Image */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#9b2ae5]/15 dark:border-[#9b2ae5]/30">
              {user?.image ? (
                <Image
                  src={user?.image}
                  alt={user?.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserRound size={36} className="text-[#9b2ae5]" />
              )}
            </div>{" "}
            {/* User Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9b2ae5]/10 text-[#9b2ae5] dark:bg-[#9b2ae5]/20">
                  <UserRound size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9b2ae5]/10 text-[#9b2ae5] dark:bg-[#9b2ae5]/20">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Name Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#121116] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9b2ae5]/10 text-[#9b2ae5] dark:bg-[#9b2ae5]/20">
              <Pencil size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Update Profile</h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Change your personal information.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#9b2ae5] focus:ring-2 focus:ring-[#9b2ae5]/15 dark:border-white/10 dark:bg-[#09090b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#b45af0] dark:focus:ring-[#9b2ae5]/20"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#9b2ae5] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#8120c4] hover:shadow-lg hover:shadow-[#9b2ae5]/20"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
