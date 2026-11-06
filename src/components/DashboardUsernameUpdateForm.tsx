import React from 'react';

const DashboardUsernameUpdateForm = () => {
    return (
        <div>
             <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
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
    );
};

export default DashboardUsernameUpdateForm;